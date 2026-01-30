import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PushSubscription {
  endpoint: string;
  p256dh: string;
  auth: string;
  user_id: string;
}

interface NotificationPayload {
  title: string;
  body: string;
  type: 'all' | 'prayer' | 'ramadan';
  subscriptions: PushSubscription[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: NotificationPayload = await req.json();
    const { title, body, type, subscriptions } = payload;

    if (!title || !body) {
      return new Response(
        JSON.stringify({ error: 'Title and body are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Filter subscriptions based on notification type
    let targetSubscriptions = subscriptions;
    
    if (type === 'prayer' || type === 'ramadan') {
      const { data: preferences } = await supabase
        .from('notification_preferences')
        .select('user_id, prayer_reminders, ramadan_activities');

      const enabledUserIds = preferences
        ?.filter(p => type === 'prayer' ? p.prayer_reminders : p.ramadan_activities)
        .map(p => p.user_id) || [];

      targetSubscriptions = subscriptions.filter(s => enabledUserIds.includes(s.user_id));
    }

    // For now, we'll log the notification details
    // In a production environment, you would use Web Push protocol here
    console.log(`Sending notification to ${targetSubscriptions.length} subscribers`);
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);

    // Store notification log (optional)
    // You could create a notifications_log table to track sent notifications

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: targetSubscriptions.length,
        message: `Notification queued for ${targetSubscriptions.length} subscribers`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
