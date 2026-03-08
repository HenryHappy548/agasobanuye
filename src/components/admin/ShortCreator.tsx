import { useState, useRef, useCallback, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Link, Play, Scissors, Download, Eye, RotateCcw, Clock } from "lucide-react";
import logoRwaflix from "@/assets/logo-rwaflix.png";

const KINYARWANDA_MESSAGES = [
  "Reba byose kuri Rwaflix.store 🎬",
  "Sura Rwaflix.store urebe movie nziza 🔥",
  "Kora subscribe - Rwaflix.store ⭐",
  "Movie nshya buri cyumweru! Rwaflix.store",
  "Ibikurimo byose ni ubuntu! Rwaflix.store 🎥",
];

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const parseTime = (str: string): number => {
  const parts = str.split(":").map(Number);
  if (parts.length === 2) return (parts[0] || 0) * 60 + (parts[1] || 0);
  if (parts.length === 3) return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  return parseFloat(str) || 0;
};

const ShortCreator = () => {
  const [source, setSource] = useState<"file" | "url">("file");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [startInput, setStartInput] = useState("0:00");
  const [endInput, setEndInput] = useState("0:00");
  const [message, setMessage] = useState(KINYARWANDA_MESSAGES[0]);
  const [customMessage, setCustomMessage] = useState("");
  const [showWatermark, setShowWatermark] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Load video from file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a video file");
      return;
    }
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setStartTime(0);
    setEndTime(0);
    setStartInput("0:00");
    setEndInput("0:00");
  };

  // Load video from URL
  const handleUrlLoad = () => {
    if (!videoUrl.trim()) return;
    setVideoSrc(videoUrl.trim());
    setStartTime(0);
    setEndTime(0);
    setStartInput("0:00");
    setEndInput("0:00");
  };

  // Video metadata loaded
  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setDuration(vid.duration);
    const end = Math.min(vid.duration, 60);
    setEndTime(end);
    setEndInput(formatTime(end));
  };

  // Set start from current playback position
  const markStart = () => {
    const t = videoRef.current?.currentTime || 0;
    setStartTime(t);
    setStartInput(formatTime(t));
  };

  const markEnd = () => {
    const t = videoRef.current?.currentTime || 0;
    setEndTime(t);
    setEndInput(formatTime(t));
  };

  const applyStartInput = () => {
    const t = Math.max(0, Math.min(parseTime(startInput), duration));
    setStartTime(t);
    setStartInput(formatTime(t));
  };

  const applyEndInput = () => {
    const t = Math.max(0, Math.min(parseTime(endInput), duration));
    setEndTime(t);
    setEndInput(formatTime(t));
  };

  const activeMessage = customMessage.trim() || message;

  // Draw overlay on canvas
  const drawFrame = useCallback(() => {
    const vid = videoRef.current;
    const canvas = canvasRef.current;
    if (!vid || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Draw video frame
    ctx.drawImage(vid, 0, 0, W, H);

    // Bottom gradient (site primary red)
    const gradH = H * 0.3;
    const grad = ctx.createLinearGradient(0, H - gradH, 0, H);
    grad.addColorStop(0, "rgba(180, 40, 40, 0)");
    grad.addColorStop(0.5, "rgba(180, 40, 40, 0.6)");
    grad.addColorStop(1, "rgba(140, 20, 20, 0.9)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, H - gradH, W, gradH);

    // Message text
    const fontSize = Math.max(16, W * 0.035);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 6;
    ctx.fillText(activeMessage, W / 2, H - fontSize * 1.2);
    ctx.shadowBlur = 0;

    // Subtle site URL below message
    const smallSize = Math.max(11, W * 0.02);
    ctx.font = `${smallSize}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText("rwaflix.store", W / 2, H - smallSize * 0.6);

    // Watermark logo top-right (small, semi-transparent)
    if (showWatermark) {
      const logoSize = Math.max(28, W * 0.06);
      ctx.globalAlpha = 0.7;
      const logoImg = document.getElementById("short-logo") as HTMLImageElement;
      if (logoImg?.complete) {
        ctx.drawImage(logoImg, W - logoSize - 12, 12, logoSize, logoSize);
      }
      ctx.globalAlpha = 1;
    }
  }, [activeMessage, showWatermark]);

  // Preview loop
  const previewLoop = useCallback(() => {
    const vid = videoRef.current;
    if (!vid || !previewing) return;

    if (vid.currentTime >= endTime) {
      vid.pause();
      vid.currentTime = startTime;
      setPreviewing(false);
      return;
    }

    setCurrentTime(vid.currentTime);
    drawFrame();
    animFrameRef.current = requestAnimationFrame(previewLoop);
  }, [previewing, startTime, endTime, drawFrame]);

  useEffect(() => {
    if (previewing) {
      animFrameRef.current = requestAnimationFrame(previewLoop);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [previewing, previewLoop]);

  const startPreview = () => {
    const vid = videoRef.current;
    if (!vid || !videoSrc) return;

    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    vid.currentTime = startTime;
    vid.play();
    setPreviewing(true);
  };

  const stopPreview = () => {
    videoRef.current?.pause();
    setPreviewing(false);
    cancelAnimationFrame(animFrameRef.current);
  };

  // Audio context ref to avoid creating multiple
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Export using Canvas + MediaRecorder with robust buffering handling
  const handleExport = async () => {
    const vid = videoRef.current;
    const canvas = canvasRef.current;
    if (!vid || !canvas || !videoSrc) return;

    if (startTime >= endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    const clipDuration = endTime - startTime;
    if (clipDuration > 180) {
      toast.error("Clip too long. Keep it under 3 minutes.");
      return;
    }

    setExporting(true);
    setExportProgress(0);
    chunksRef.current = [];

    try {
      // Ensure video is fully buffered for the clip range
      toast.info("Preparing video...");
      
      vid.currentTime = startTime;
      vid.muted = false;

      // Wait for seek to complete
      await new Promise<void>((resolve) => {
        const onSeeked = () => {
          vid.removeEventListener("seeked", onSeeked);
          resolve();
        };
        vid.addEventListener("seeked", onSeeked);
      });

      // Capture canvas stream + audio
      const canvasStream = canvas.captureStream(30);
      
      let combinedStream: MediaStream;
      try {
        // Only create AudioContext once per video element
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (!audioSourceRef.current) {
          audioSourceRef.current = audioCtxRef.current.createMediaElementSource(vid);
          audioSourceRef.current.connect(audioCtxRef.current.destination);
        }
        const dest = audioCtxRef.current.createMediaStreamDestination();
        audioSourceRef.current.connect(dest);
        
        combinedStream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          ...dest.stream.getAudioTracks(),
        ]);
      } catch {
        combinedStream = canvasStream;
      }

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
        ? "video/webm;codecs=vp9,opus"
        : "video/webm";

      const recorder = new MediaRecorder(combinedStream, {
        mimeType,
        videoBitsPerSecond: 5_000_000,
      });

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      const finishExport = async () => {
        const webmBlob = new Blob(chunksRef.current, { type: mimeType });
        
        setExportProgress(85);
        toast.info("Converting to MP4...");
        
        try {
          const ffmpeg = new FFmpeg();
          
          // Use single-threaded core to avoid SharedArrayBuffer requirement
          const coreURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js";
          const wasmURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm";
          
          await ffmpeg.load({
            coreURL,
            wasmURL,
          });
          
          const webmData = new Uint8Array(await webmBlob.arrayBuffer());
          await ffmpeg.writeFile("input.webm", webmData);
          
          ffmpeg.on("progress", ({ progress }) => {
            setExportProgress(85 + progress * 14);
          });
          
          await ffmpeg.exec([
            "-i", "input.webm",
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-crf", "23",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            "-pix_fmt", "yuv420p",
            "output.mp4"
          ]);
          
          const mp4Data = await ffmpeg.readFile("output.mp4");
          const mp4Bytes = mp4Data instanceof Uint8Array ? new Uint8Array(mp4Data.buffer, mp4Data.byteOffset, mp4Data.byteLength) : new TextEncoder().encode(mp4Data as string);
          const mp4Blob = new Blob([mp4Bytes], { type: "video/mp4" });
          
          const url = URL.createObjectURL(mp4Blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `rwaflix-short-${Date.now()}.mp4`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          ffmpeg.terminate();
          toast.success("MP4 short downloaded! 🎬");
        } catch (convErr) {
          console.warn("MP4 conversion failed:", convErr);
          // Fallback: download as webm but rename to .mp4 (most players handle it)
          const url = URL.createObjectURL(webmBlob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `rwaflix-short-${Date.now()}.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          toast.warning("Downloaded as .webm — MP4 conversion requires opening this page directly (not in iframe). You can convert it using any free online converter.");
        }
        
        setExporting(false);
        setExportProgress(100);
      };

      recorder.onstop = finishExport;

      recorder.start(200);
      await vid.play();

      toast.info(`Recording ${formatTime(clipDuration)} of video... Please wait.`);

      // Robust export loop that handles buffering pauses
      const runExportLoop = () => {
        if (vid.currentTime >= endTime || vid.ended) {
          vid.pause();
          recorder.stop();
          return;
        }

        // If video is paused due to buffering, wait and retry
        if (vid.paused || vid.readyState < 3) {
          // Video is buffering — don't stop, just wait
          setTimeout(runExportLoop, 100);
          return;
        }

        drawFrame();
        const progress = ((vid.currentTime - startTime) / clipDuration) * 80;
        setExportProgress(Math.min(progress, 82));
        requestAnimationFrame(runExportLoop);
      };

      // Also handle video waiting/stalling events
      const onWaiting = () => {
        // Video is buffering, just let the loop handle it
        console.log("Video buffering at", vid.currentTime);
      };
      const onPlaying = () => {
        // Resume drawing when playback resumes
        console.log("Video resumed at", vid.currentTime);
      };
      const onEnded = () => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      };

      vid.addEventListener("waiting", onWaiting);
      vid.addEventListener("playing", onPlaying);
      vid.addEventListener("ended", onEnded);

      // Set up a timeupdate listener as backup to detect when we pass endTime
      const onTimeUpdate = () => {
        if (vid.currentTime >= endTime) {
          vid.pause();
          vid.removeEventListener("timeupdate", onTimeUpdate);
          if (recorder.state === "recording") {
            recorder.stop();
          }
        }
      };
      vid.addEventListener("timeupdate", onTimeUpdate);

      requestAnimationFrame(runExportLoop);

    } catch (error: any) {
      console.error("Export error:", error);
      toast.error("Export failed: " + (error.message || "Unknown error"));
      setExporting(false);
    }
  };

  const clipDuration = Math.max(0, endTime - startTime);

  return (
    <div className="space-y-6">
      {/* Hidden logo for canvas drawing */}
      <img id="short-logo" src={logoRwaflix} alt="" className="hidden" crossOrigin="anonymous" />

      {/* Source Selection */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">1. Select Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={source === "file" ? "default" : "outline"}
              size="sm"
              onClick={() => setSource("file")}
              className="gap-2"
            >
              <Upload className="w-4 h-4" /> Upload File
            </Button>
            <Button
              variant={source === "url" ? "default" : "outline"}
              size="sm"
              onClick={() => setSource("url")}
              className="gap-2"
            >
              <Link className="w-4 h-4" /> Paste URL
            </Button>
          </div>

          {source === "file" ? (
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="bg-background/50"
            />
          ) : (
            <div className="flex gap-2">
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="bg-background/50 flex-1"
              />
              <Button onClick={handleUrlLoad} size="sm">Load</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Preview & Trimming */}
      {videoSrc && (
        <>
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">2. Trim & Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hidden video element */}
              <video
                ref={videoRef}
                src={videoSrc}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                className="w-full rounded-lg max-h-48 bg-black"
                crossOrigin="anonymous"
                preload="auto"
                controls
              />

              {/* Timeline scrubber */}
              {duration > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Duration: {formatTime(duration)} | Current: {formatTime(currentTime)}
                  </div>

                  {/* Trim range visual */}
                  <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-primary/30 rounded"
                      style={{
                        left: `${(startTime / duration) * 100}%`,
                        width: `${((endTime - startTime) / duration) * 100}%`,
                      }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-foreground"
                      style={{ left: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>

                  {/* Start/End inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Start Time</Label>
                      <div className="flex gap-1">
                        <Input
                          value={startInput}
                          onChange={(e) => setStartInput(e.target.value)}
                          onBlur={applyStartInput}
                          placeholder="0:00"
                          className="bg-background/50 text-sm h-8"
                        />
                        <Button size="sm" variant="outline" onClick={markStart} className="h-8 px-2 text-xs">
                          <Scissors className="w-3 h-3 mr-1" /> Mark
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">End Time</Label>
                      <div className="flex gap-1">
                        <Input
                          value={endInput}
                          onChange={(e) => setEndInput(e.target.value)}
                          onBlur={applyEndInput}
                          placeholder="1:00"
                          className="bg-background/50 text-sm h-8"
                        />
                        <Button size="sm" variant="outline" onClick={markEnd} className="h-8 px-2 text-xs">
                          <Scissors className="w-3 h-3 mr-1" /> Mark
                        </Button>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Clip: {formatTime(clipDuration)} ({clipDuration > 60 ? "⚠️ long" : "✓ good length"})
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Overlay Settings */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">3. Customize Overlay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Message (Kinyarwanda)</Label>
                <Select value={message} onValueChange={setMessage}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KINYARWANDA_MESSAGES.map((msg) => (
                      <SelectItem key={msg} value={msg}>{msg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Or custom message</Label>
                <Input
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your own message..."
                  className="bg-background/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="watermark"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="accent-primary"
                />
                <Label htmlFor="watermark" className="text-sm cursor-pointer">
                  Show Rwaflix logo watermark
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Canvas Preview */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">4. Preview & Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="w-full rounded-lg bg-black border border-border"
                style={{ aspectRatio: "16/9" }}
              />

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={previewing ? stopPreview : startPreview}
                  variant="outline"
                  className="gap-2"
                  disabled={exporting}
                >
                  {previewing ? (
                    <><RotateCcw className="w-4 h-4" /> Stop</>
                  ) : (
                    <><Eye className="w-4 h-4" /> Preview with Overlay</>
                  )}
                </Button>

                <Button
                  onClick={handleExport}
                  disabled={exporting || !videoSrc || clipDuration <= 0}
                  className="gap-2"
                >
                  {exporting ? (
                    <>
                      <Download className="w-4 h-4 animate-pulse" />
                      Exporting... {Math.round(exportProgress)}%
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Export Short (.mp4)
                    </>
                  )}
                </Button>
              </div>

              {exporting && (
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                💡 Exports as .mp4 — works everywhere: TikTok, YouTube Shorts, Instagram Reels, WhatsApp Status
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ShortCreator;
