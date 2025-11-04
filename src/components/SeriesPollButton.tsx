import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SERIES_OPTIONS = [
  "Vincenzo",
  "Game of Witches",
  "Siren",
  "Blood River"
];

interface VoteResult {
  series_name: string;
  count: number;
}

export const SeriesPollButton = () => {
  const [open, setOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState<VoteResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const { toast } = useToast();

  const getSessionId = () => {
    let sessionId = localStorage.getItem("poll_session_id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("poll_session_id", sessionId);
    }
    return sessionId;
  };

  const checkIfVoted = async () => {
    const sessionId = getSessionId();
    const { data } = await supabase
      .from("poll_votes")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();
    
    setHasVoted(!!data);
  };

  const fetchResults = async () => {
    const { data, error } = await supabase
      .from("poll_votes")
      .select("series_name");

    if (error) {
      console.error("Error fetching results:", error);
      return;
    }

    // Count votes per series
    const voteCounts: Record<string, number> = {};
    SERIES_OPTIONS.forEach(series => {
      voteCounts[series] = 0;
    });

    data?.forEach(vote => {
      voteCounts[vote.series_name] = (voteCounts[vote.series_name] || 0) + 1;
    });

    const resultsArray = Object.entries(voteCounts).map(([series_name, count]) => ({
      series_name,
      count
    }));

    setResults(resultsArray);
    setTotalVotes(data?.length || 0);
  };

  useEffect(() => {
    checkIfVoted();
    fetchResults();
  }, []);

  const handleVote = async () => {
    if (!selectedSeries) {
      toast({
        title: "Please select a series",
        variant: "destructive"
      });
      return;
    }

    const sessionId = getSessionId();
    const { error } = await supabase
      .from("poll_votes")
      .insert({
        series_name: selectedSeries,
        session_id: sessionId,
        user_id: (await supabase.auth.getUser()).data.user?.id || null
      });

    if (error) {
      toast({
        title: "Error submitting vote",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Vote submitted!",
      description: "Thank you for voting."
    });

    setHasVoted(true);
    fetchResults();
  };

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0;
    return ((count / totalVotes) * 100).toFixed(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-red-600 to-black hover:from-red-700 hover:to-gray-900 z-50"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Which Series Should We Continue?</DialogTitle>
          <DialogDescription>
            Vote for your favorite series. You can only vote once!
          </DialogDescription>
        </DialogHeader>

        {!hasVoted ? (
          <div className="space-y-6 py-4">
            <RadioGroup value={selectedSeries} onValueChange={setSelectedSeries}>
              {SERIES_OPTIONS.map((series) => (
                <div key={series} className="flex items-center space-x-2">
                  <RadioGroupItem value={series} id={series} />
                  <Label htmlFor={series} className="cursor-pointer">
                    {series}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button onClick={handleVote} className="w-full">
              Submit Vote
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground text-center mb-4">
              You have already voted! Here are the current results:
            </p>
            {results.map((result) => (
              <div key={result.series_name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{result.series_name}</span>
                  <span className="text-sm text-muted-foreground">
                    {getPercentage(result.count)}% ({result.count} votes)
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getPercentage(result.count)}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-center text-muted-foreground mt-4">
              Total votes: {totalVotes}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};