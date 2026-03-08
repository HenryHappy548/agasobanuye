import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, Phone, Copy, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Subscriber {
  id: string;
  phone: string;
  name: string | null;
  is_active: boolean;
  subscribed_at: string;
}

const WhatsAppSubscribersManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("whatsapp_subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (error) {
      toast.error("Failed to load subscribers");
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("whatsapp_subscribers").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete subscriber");
    } else {
      toast.success("Subscriber removed");
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("whatsapp_subscribers")
      .update({ is_active: !currentStatus })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      setSubscribers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_active: !currentStatus } : s))
      );
    }
  };

  const copyAllNumbers = () => {
    const activeNumbers = subscribers
      .filter((s) => s.is_active)
      .map((s) => s.phone)
      .join("\n");
    navigator.clipboard.writeText(activeNumbers);
    toast.success(`${subscribers.filter((s) => s.is_active).length} numbers copied`);
  };

  const exportCSV = () => {
    const csv = ["Phone,Name,Status,Subscribed At"]
      .concat(
        subscribers.map(
          (s) =>
            `${s.phone},${s.name || ""},${s.is_active ? "Active" : "Inactive"},${new Date(s.subscribed_at).toLocaleDateString()}`
        )
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "whatsapp_subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = subscribers.filter(
    (s) =>
      s.phone.includes(search) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by phone or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyAllNumbers} className="gap-2">
            <Copy className="h-4 w-4" />
            Copy All Active
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-3 text-sm text-muted-foreground">
        <span>Total: <strong className="text-foreground">{subscribers.length}</strong></span>
        <span>Active: <strong className="text-primary">{subscribers.filter((s) => s.is_active).length}</strong></span>
      </div>

      {loading ? (
        <p className="text-muted-foreground py-8 text-center">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">No subscribers found</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-mono flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <a
                      href={`https://wa.me/${sub.phone.replace(/^0/, "250")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary underline"
                    >
                      {sub.phone}
                    </a>
                  </TableCell>
                  <TableCell>{sub.name || "—"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={sub.is_active ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => toggleActive(sub.id, sub.is_active)}
                    >
                      {sub.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(sub.subscribed_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(sub.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default WhatsAppSubscribersManager;
