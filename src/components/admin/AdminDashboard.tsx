import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookMarked, Moon, Sparkles, Hand, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        { count: totalUsers },
        { count: totalSourates },
        { count: totalRamadanDays },
        { count: totalNouraniaLessons },
        { count: totalInvocations },
        { count: totalPrayerCategories },
        { data: sourateProgress },
        { data: ramadanProgress },
        { data: nouraniaProgress },
        { data: prayerProgress },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('sourates').select('*', { count: 'exact', head: true }),
        supabase.from('ramadan_days').select('*', { count: 'exact', head: true }),
        supabase.from('nourania_lessons').select('*', { count: 'exact', head: true }),
        supabase.from('invocations').select('*', { count: 'exact', head: true }),
        supabase.from('prayer_categories').select('*', { count: 'exact', head: true }),
        supabase.from('user_sourate_progress').select('is_validated'),
        supabase.from('user_ramadan_progress').select('video_watched, quiz_completed, pdf_read'),
        supabase.from('user_nourania_progress').select('is_validated'),
        supabase.from('user_prayer_progress').select('is_validated'),
      ]);

      const sourateValidated = sourateProgress?.filter(p => p.is_validated).length || 0;
      const ramadanCompleted = ramadanProgress?.filter(p => p.video_watched && p.quiz_completed && p.pdf_read).length || 0;
      const nouraniaValidated = nouraniaProgress?.filter(p => p.is_validated).length || 0;
      const prayerValidated = prayerProgress?.filter(p => p.is_validated).length || 0;

      return {
        totalUsers: totalUsers || 0,
        modules: {
          sourates: { total: totalSourates || 0, validated: sourateValidated },
          ramadan: { total: totalRamadanDays || 0, completed: ramadanCompleted },
          nourania: { total: totalNouraniaLessons || 0, validated: nouraniaValidated },
          invocations: { total: totalInvocations || 0 },
          prayer: { total: totalPrayerCategories || 0, validated: prayerValidated },
        },
      };
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-24 bg-muted/50" />
          </Card>
        ))}
      </div>
    );
  }

  const moduleCards = [
    {
      title: 'Utilisateurs',
      icon: Users,
      value: stats?.totalUsers || 0,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Sourates',
      icon: BookMarked,
      value: `${stats?.modules.sourates.validated || 0} validées`,
      subtitle: `sur ${stats?.modules.sourates.total || 0} sourates`,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      title: 'Ramadan',
      icon: Moon,
      value: `${stats?.modules.ramadan.completed || 0} jours complétés`,
      subtitle: `sur ${stats?.modules.ramadan.total || 0} jours`,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Nourania',
      icon: Sparkles,
      value: `${stats?.modules.nourania.validated || 0} validées`,
      subtitle: `sur ${stats?.modules.nourania.total || 0} leçons`,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      title: 'Invocations',
      icon: Hand,
      value: `${stats?.modules.invocations.total || 0} disponibles`,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Prière',
      icon: BookOpen,
      value: `${stats?.modules.prayer.validated || 0} validées`,
      subtitle: `sur ${stats?.modules.prayer.total || 0} catégories`,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground mb-4">Vue d'ensemble</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {moduleCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-lg font-bold text-foreground truncate">{card.value}</p>
                    {card.subtitle && (
                      <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progression globale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Sourates</span>
              <span className="text-muted-foreground">
                {Math.round(((stats?.modules.sourates.validated || 0) / Math.max(stats?.modules.sourates.total || 1, 1)) * 100)}%
              </span>
            </div>
            <Progress 
              value={((stats?.modules.sourates.validated || 0) / Math.max(stats?.modules.sourates.total || 1, 1)) * 100} 
              className="h-2"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Ramadan</span>
              <span className="text-muted-foreground">
                {Math.round(((stats?.modules.ramadan.completed || 0) / Math.max(stats?.modules.ramadan.total || 1, 1)) * 100)}%
              </span>
            </div>
            <Progress 
              value={((stats?.modules.ramadan.completed || 0) / Math.max(stats?.modules.ramadan.total || 1, 1)) * 100} 
              className="h-2"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Nourania</span>
              <span className="text-muted-foreground">
                {Math.round(((stats?.modules.nourania.validated || 0) / Math.max(stats?.modules.nourania.total || 1, 1)) * 100)}%
              </span>
            </div>
            <Progress 
              value={((stats?.modules.nourania.validated || 0) / Math.max(stats?.modules.nourania.total || 1, 1)) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
