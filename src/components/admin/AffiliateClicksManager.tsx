import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MousePointerClick, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";

interface AffiliateClick {
  id: string;
  product_name: string;
  category: string | null;
  clicked_at: string;
  user_agent: string | null;
  referrer: string | null;
}

interface ClickStats {
  totalClicks: number;
  todayClicks: number;
  topProducts: { name: string; count: number }[];
}

const AffiliateClicksManager = () => {
  const [clicks, setClicks] = useState<AffiliateClick[]>([]);
  const [stats, setStats] = useState<ClickStats>({
    totalClicks: 0,
    todayClicks: 0,
    topProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClicks();
  }, []);

  const fetchClicks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("affiliate_clicks")
        .select("*")
        .order("clicked_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      setClicks(data || []);

      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayClicks = (data || []).filter(
        (click) => new Date(click.clicked_at) >= today
      ).length;

      // Count products
      const productCounts: Record<string, number> = {};
      (data || []).forEach((click) => {
        productCounts[click.product_name] = (productCounts[click.product_name] || 0) + 1;
      });

      const topProducts = Object.entries(productCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setStats({
        totalClicks: data?.length || 0,
        todayClicks,
        topProducts,
      });
    } catch (error) {
      console.error("Error fetching clicks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceType = (userAgent: string | null) => {
    if (!userAgent) return "Unknown";
    if (/mobile/i.test(userAgent)) return "Mobile";
    if (/tablet/i.test(userAgent)) return "Tablet";
    return "Desktop";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MousePointerClick className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Affiliate Clicks</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalClicks}</div>
            <p className="text-xs text-muted-foreground">All time affiliate clicks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Clicks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.todayClicks}</div>
            <p className="text-xs text-muted-foreground">Clicks today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Product</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground truncate">
              {stats.topProducts[0]?.name || "No data"}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.topProducts[0]?.count || 0} clicks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top 5 Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-primary">{index + 1}</span>
                  <span className="text-foreground">{product.name}</span>
                </div>
                <Badge variant="secondary">{product.count} clicks</Badge>
              </div>
            ))}
            {stats.topProducts.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No clicks yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Clicks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clicks.slice(0, 20).map((click) => (
                  <TableRow key={click.id}>
                    <TableCell className="font-medium">{click.product_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{click.category || "N/A"}</Badge>
                    </TableCell>
                    <TableCell>{getDeviceType(click.user_agent)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(click.clicked_at), "MMM d, HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
                {clicks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No affiliate clicks recorded yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateClicksManager;
