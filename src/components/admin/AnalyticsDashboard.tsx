import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, Film, TrendingUp, Users, BarChart3, RefreshCw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ViewData {
  movie_id: string;
  view_count: number;
}

interface DailyView {
  date: string;
  count: number;
}

const AnalyticsDashboard = () => {
  const [viewCounts, setViewCounts] = useState<ViewData[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [recentViews, setRecentViews] = useState<any[]>([]);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [dailyVisitors, setDailyVisitors] = useState<{visit_date: string; visit_count: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("7");

  const fetchData = async () => {
    try {
      // Fetch view counts, movies, and recent views in parallel
      const [viewsRes, moviesRes, recentRes, totalVisitsRes, dailyVisitsRes] = await Promise.all([
        supabase.rpc("get_movie_view_counts"),
        supabase.from("movies").select("id, title, genre, category, created_at").order("created_at", { ascending: false }),
        supabase.from("movie_views").select("movie_id, viewed_at, referrer, user_agent").order("viewed_at", { ascending: false }).limit(500),
        supabase.rpc("get_total_visit_count"),
        supabase.rpc("get_daily_visit_counts", { days_back: 30 }),
      ]);

      if (viewsRes.data) setViewCounts(viewsRes.data);
      if (moviesRes.data) setMovies(moviesRes.data);
      if (recentRes.data) setRecentViews(recentRes.data);
      if (totalVisitsRes.data !== null) setTotalVisitors(totalVisitsRes.data as number);
      if (dailyVisitsRes.data) setDailyVisitors(dailyVisitsRes.data as any[]);
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Compute analytics
  const analytics = useMemo(() => {
    const movieMap = new Map(movies.map(m => [m.id, m]));
    const totalViews = viewCounts.reduce((sum, v) => sum + v.view_count, 0);
    const totalMovies = movies.length;

    // Top movies by views
    const topMovies = viewCounts
      .map(v => ({ ...v, movie: movieMap.get(v.movie_id) }))
      .filter(v => v.movie)
      .sort((a, b) => b.view_count - a.view_count)
      .slice(0, 10);

    // Genre breakdown
    const genreViews = new Map<string, number>();
    viewCounts.forEach(v => {
      const movie = movieMap.get(v.movie_id);
      if (movie?.genre) {
        genreViews.set(movie.genre, (genreViews.get(movie.genre) || 0) + v.view_count);
      }
    });
    const genreBreakdown = Array.from(genreViews.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    // Daily views (last N days)
    const days = parseInt(timeRange);
    const now = new Date();
    const dailyMap = new Map<string, number>();
    for (let i = 0; i < days; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dailyMap.set(d.toISOString().split("T")[0], 0);
    }
    recentViews.forEach(v => {
      const day = v.viewed_at?.split("T")[0];
      if (day && dailyMap.has(day)) {
        dailyMap.set(day, (dailyMap.get(day) || 0) + 1);
      }
    });
    const dailyViews: DailyView[] = Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Today's views
    const today = now.toISOString().split("T")[0];
    const todayViews = recentViews.filter(v => v.viewed_at?.startsWith(today)).length;

    // Category breakdown
    const categoryCount = new Map<string, number>();
    movies.forEach(m => {
      categoryCount.set(m.category, (categoryCount.get(m.category) || 0) + 1);
    });

    return { totalViews, totalMovies, topMovies, genreBreakdown, dailyViews, todayViews, categoryCount: Array.from(categoryCount.entries()) };
  }, [viewCounts, movies, recentViews, timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const maxDaily = Math.max(...analytics.dailyViews.map(d => d.count), 1);
  const maxGenre = Math.max(...analytics.genreBreakdown.map(g => g[1]), 1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-[60]">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="gap-1">
          <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{analytics.totalViews.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Views</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{analytics.todayViews}</p>
              <p className="text-xs text-muted-foreground">Today's Views</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Film className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{analytics.totalMovies}</p>
              <p className="text-xs text-muted-foreground">Total Movies</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {analytics.dailyViews.length > 0
                  ? Math.round(analytics.dailyViews.reduce((s, d) => s + d.count, 0) / analytics.dailyViews.length)
                  : 0}
              </p>
              <p className="text-xs text-muted-foreground">Avg Daily Views</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Views Chart */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Daily Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-40">
            {analytics.dailyViews.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.count}
                </span>
                <div
                  className="w-full bg-primary/80 rounded-t transition-all duration-300 hover:bg-primary min-h-[2px]"
                  style={{ height: `${(day.count / maxDaily) * 100}%` }}
                />
                <span className="text-[8px] text-muted-foreground -rotate-45 origin-top-left whitespace-nowrap">
                  {day.date.slice(5)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Movies */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">🏆 Top 10 Movies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analytics.topMovies.map((item, i) => (
              <div key={item.movie_id} className="flex items-center gap-2 p-2 rounded-lg bg-background/50 hover:bg-primary/5 transition-colors">
                <span className="text-sm font-bold text-primary w-6 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.movie?.title}</p>
                  <p className="text-xs text-muted-foreground">{item.movie?.genre}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{item.view_count.toLocaleString()}</span>
              </div>
            ))}
            {analytics.topMovies.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No view data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Genre Breakdown */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">🎭 Genre Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.genreBreakdown.map(([genre, count]) => (
              <div key={genre} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">{genre}</span>
                  <span className="text-muted-foreground">{count.toLocaleString()} views</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(count / maxGenre) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {analytics.genreBreakdown.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No genre data yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">📊 Content by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {analytics.categoryCount.map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-sm font-medium text-foreground capitalize">{cat}</span>
                <span className="text-lg font-bold text-primary">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
