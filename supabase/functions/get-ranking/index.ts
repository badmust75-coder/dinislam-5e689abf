import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  'https://dinislam-two.vercel.app',
  'https://dinislam.lovable.app',
  'http://localhost:8080',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders(req) });
  }

  try {
    // Utilise la clé service_role pour bypasser le RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Récupérer le classement complet (bypasse RLS)
    const { data: rankingData, error: rankingError } = await supabaseAdmin
      .from('student_ranking')
      .select('user_id, total_points')
      .order('total_points', { ascending: false })
      .limit(200);

    if (rankingError) throw rankingError;

    const userIds = (rankingData || []).map((r: any) => r.user_id);

    // Récupérer les prénoms
    let profiles: { user_id: string; full_name: string | null }[] = [];
    if (userIds.length > 0) {
      const { data } = await supabaseAdmin
        .from('profiles')
        .select('user_id, full_name')
        .in('user_id', userIds);
      profiles = data || [];
    }

    const classement = (rankingData || []).map((r: any) => ({
      user_id: r.user_id,
      full_name: profiles.find((p) => p.user_id === r.user_id)?.full_name || null,
      total: r.total_points ?? 0,
    }));

    return new Response(
      JSON.stringify({ classement }),
      { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
    );
  }
});
