import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Mail, Phone, Trash2, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

const MessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel("contact-messages-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "read" })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Marked as read");
      fetchMessages();
    }
  };

  const deleteMessage = async (id: string) => {
    // Note: Delete might not be allowed by RLS - admin can update status instead
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "archived" })
      .eq("id", id);

    if (error) {
      toast.error("Failed to archive message");
    } else {
      toast.success("Message archived");
      fetchMessages();
    }
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, "").replace(/^\+/, "");
    window.open(`https://wa.me/${cleanPhone}`, "_blank");
  };

  const openEmail = (email: string) => {
    window.open(`mailto:${email}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const unreadMessages = messages.filter(m => m.status === "unread");
  const readMessages = messages.filter(m => m.status === "read");
  const archivedMessages = messages.filter(m => m.status === "archived");

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">{unreadMessages.length}</p>
          <p className="text-sm text-muted-foreground">Unread</p>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-500">{readMessages.length}</p>
          <p className="text-sm text-muted-foreground">Read</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-muted-foreground">{archivedMessages.length}</p>
          <p className="text-sm text-muted-foreground">Archived</p>
        </div>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.filter(m => m.status !== "archived").map((msg) => (
            <div
              key={msg.id}
              className={`border rounded-lg p-4 transition-colors ${
                msg.status === "unread"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{msg.name}</h3>
                    {msg.status === "unread" && (
                      <Badge variant="default" className="text-xs">New</Badge>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    {msg.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openWhatsApp(msg.phone!)}
                        className="gap-2 text-green-600 border-green-600/30 hover:bg-green-500/10"
                      >
                        <Phone className="h-3 w-3" />
                        {msg.phone}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                    {msg.email && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEmail(msg.email!)}
                        className="gap-2"
                      >
                        <Mail className="h-3 w-3" />
                        {msg.email}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  {/* Message */}
                  <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>

                  {/* Timestamp */}
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(new Date(msg.created_at), "PPp")}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {msg.status === "unread" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(msg.id)}
                      className="gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMessage(msg.id)}
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Archive
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesManager;