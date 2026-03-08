import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload, Play, Pause, Download, RotateCcw, Save, Eye } from "lucide-react";

const STORAGE_KEY = "rwaflix.videoeditor.progress";

interface BlurRegion {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
}

interface SavedProgress {
  blurIntensity: number;
  fullBlur: boolean;
  region: BlurRegion;
  currentTime: number;
  fileName: string;
}

const VideoEditor = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [blurIntensity, setBlurIntensity] = useState(20);
  const [fullBlur, setFullBlur] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const animRef = useRef<number>(0);

  const [region, setRegion] = useState<BlurRegion>({
    x: 35, y: 35, width: 30, height: 30,
  });

  // Drag state
  const [dragging, setDragging] = useState<"move" | "resize" | null>(null);
  const dragStart = useRef({ mx: 0, my: 0, rx: 0, ry: 0, rw: 0, rh: 0 });

  // Load saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: SavedProgress = JSON.parse(saved);
        setBlurIntensity(data.blurIntensity);
        setFullBlur(data.fullBlur);
        setRegion(data.region);
        setCurrentTime(data.currentTime);
        toast.info(`Previous session restored (${data.fileName}). Upload the same file to continue.`);
      }
    } catch { /* ignore */ }
  }, []);

  // Save progress
  const saveProgress = useCallback(() => {
    if (!fileName) return;
    const data: SavedProgress = {
      blurIntensity,
      fullBlur,
      region,
      currentTime: videoRef.current?.currentTime || 0,
      fileName,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    toast.success("Progress saved");
  }, [blurIntensity, fullBlur, region, fileName]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setVideoFile(file);
    setFileName(file.name);
    setPlaying(false);

    // Check if saved progress matches
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: SavedProgress = JSON.parse(saved);
        if (data.fileName === file.name) {
          setBlurIntensity(data.blurIntensity);
          setFullBlur(data.fullBlur);
          setRegion(data.region);
          // Restore time after video loads
          const vid = videoRef.current;
          if (vid) {
            const onLoaded = () => {
              vid.currentTime = data.currentTime;
              vid.removeEventListener("loadedmetadata", onLoaded);
            };
            vid.addEventListener("loadedmetadata", onLoaded);
          }
          toast.success("Restored your previous blur settings for this file");
        }
      }
    } catch { /* ignore */ }
  };

  const onVideoLoaded = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setDuration(vid.duration);
    // Set canvas sizes
    if (canvasRef.current) {
      canvasRef.current.width = vid.videoWidth;
      canvasRef.current.height = vid.videoHeight;
    }
    drawPreview();
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setPlaying(true);
      renderLoop();
    } else {
      vid.pause();
      setPlaying(false);
      cancelAnimationFrame(animRef.current);
    }
  };

  const drawBlurredFrame = (
    ctx: CanvasRenderingContext2D,
    vid: HTMLVideoElement,
    w: number,
    h: number,
    blur: number,
    applyFullBlur: boolean,
    reg: BlurRegion
  ) => {
    // Draw clean frame
    ctx.filter = "none";
    ctx.drawImage(vid, 0, 0, w, h);

    if (applyFullBlur) {
      // Full video blur
      ctx.filter = `blur(${blur}px)`;
      ctx.drawImage(vid, 0, 0, w, h);
      ctx.filter = "none";
    } else {
      // Region blur only
      const rx = (reg.x / 100) * w;
      const ry = (reg.y / 100) * h;
      const rw = (reg.width / 100) * w;
      const rh = (reg.height / 100) * h;

      // Save the clean frame
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.filter = `blur(${blur}px)`;
      ctx.drawImage(vid, 0, 0, w, h);
      ctx.filter = "none";
      ctx.restore();

      // Draw region border
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(rx, ry, rw, rh);
      ctx.setLineDash([]);
    }
  };

  const drawPreview = useCallback(() => {
    const vid = videoRef.current;
    const canvas = previewCanvasRef.current;
    if (!vid || !canvas || vid.readyState < 2) return;

    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    canvas.width = displayW * 2;
    canvas.height = displayH * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(2, 2);
    drawBlurredFrame(ctx, vid, displayW, displayH, blurIntensity, fullBlur, region);
  }, [blurIntensity, fullBlur, region]);

  const renderLoop = useCallback(() => {
    drawPreview();
    const vid = videoRef.current;
    if (vid && !vid.paused && !vid.ended) {
      setCurrentTime(vid.currentTime);
      animRef.current = requestAnimationFrame(renderLoop);
    } else {
      setPlaying(false);
    }
  }, [drawPreview]);

  // Redraw preview when settings change
  useEffect(() => {
    drawPreview();
  }, [blurIntensity, fullBlur, region, drawPreview]);

  const seekTo = (val: number[]) => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = val[0];
    setCurrentTime(val[0]);
    setTimeout(drawPreview, 50);
  };

  // Mouse handlers for dragging blur region on preview canvas
  const getRelativePos = (e: React.MouseEvent) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return { px: 0, py: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      px: ((e.clientX - rect.left) / rect.width) * 100,
      py: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (fullBlur) return;
    const { px, py } = getRelativePos(e);
    // Check if near bottom-right corner for resize
    const cornerX = region.x + region.width;
    const cornerY = region.y + region.height;
    if (Math.abs(px - cornerX) < 4 && Math.abs(py - cornerY) < 4) {
      setDragging("resize");
      dragStart.current = { mx: px, my: py, rx: region.x, ry: region.y, rw: region.width, rh: region.height };
    } else if (px >= region.x && px <= region.x + region.width && py >= region.y && py <= region.y + region.height) {
      setDragging("move");
      dragStart.current = { mx: px, my: py, rx: region.x, ry: region.y, rw: region.width, rh: region.height };
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const { px, py } = getRelativePos(e);
    const dx = px - dragStart.current.mx;
    const dy = py - dragStart.current.my;

    if (dragging === "move") {
      setRegion({
        ...region,
        x: Math.max(0, Math.min(100 - region.width, dragStart.current.rx + dx)),
        y: Math.max(0, Math.min(100 - region.height, dragStart.current.ry + dy)),
      });
    } else if (dragging === "resize") {
      setRegion({
        ...region,
        width: Math.max(5, Math.min(100 - region.x, dragStart.current.rw + dx)),
        height: Math.max(5, Math.min(100 - region.y, dragStart.current.rh + dy)),
      });
    }
  };

  const onMouseUp = () => setDragging(null);

  const resetSettings = () => {
    setBlurIntensity(15);
    setFullBlur(false);
    setRegion({ x: 35, y: 35, width: 30, height: 30 });
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Settings reset");
  };

  // Export using Canvas + MediaRecorder
  const handleExport = async () => {
    const vid = videoRef.current;
    if (!vid || !videoSrc) {
      toast.error("Please upload a video first.");
      return;
    }

    setExporting(true);
    setExportProgress(0);

    try {
      // Stop any current playback
      vid.pause();
      setPlaying(false);
      cancelAnimationFrame(animRef.current);

      const w = vid.videoWidth;
      const h = vid.videoHeight;
      if (!w || !h) throw new Error("Video not loaded properly. Try re-uploading.");

      // Offscreen canvas for export
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = w;
      exportCanvas.height = h;
      const ctx = exportCanvas.getContext("2d")!;

      const stream = exportCanvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

      // Wrap the full export in one promise
      const blob = await new Promise<Blob>((resolve, reject) => {
        recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
        recorder.onerror = () => reject(new Error("MediaRecorder error"));

        let exportAnimId = 0;
        const drawExportFrame = () => {
          if (vid.ended) {
            cancelAnimationFrame(exportAnimId);
            setTimeout(() => {
              if (recorder.state === "recording") recorder.stop();
            }, 300);
            return;
          }

          if (vid.readyState >= 2) {
            setExportProgress(Math.round((vid.currentTime / (vid.duration || 1)) * 100));

            // Draw clean frame
            ctx.filter = "none";
            ctx.drawImage(vid, 0, 0, w, h);

            if (fullBlur) {
              ctx.filter = `blur(${blurIntensity}px)`;
              ctx.drawImage(vid, 0, 0, w, h);
              ctx.filter = "none";
            } else {
              const rx = (region.x / 100) * w;
              const ry = (region.y / 100) * h;
              const rw = (region.width / 100) * w;
              const rh = (region.height / 100) * h;
              ctx.save();
              ctx.beginPath();
              ctx.rect(rx, ry, rw, rh);
              ctx.clip();
              ctx.filter = `blur(${blurIntensity}px)`;
              ctx.drawImage(vid, 0, 0, w, h);
              ctx.filter = "none";
              ctx.restore();
            }
          }
          exportAnimId = requestAnimationFrame(drawExportFrame);
        };

        // Start everything
        recorder.start(500);

        // Seek to beginning, then play
        const startPlayback = () => {
          vid.muted = true;
          vid.playbackRate = 2;
          vid.play().then(() => {
            drawExportFrame();
          }).catch((playErr) => {
            recorder.stop();
            reject(new Error("Cannot play video for export: " + playErr.message));
          });
        };

        if (vid.currentTime > 0.1) {
          vid.currentTime = 0;
          vid.addEventListener("seeked", startPlayback, { once: true });
        } else {
          startPlayback();
        }

        // Safety timeout for very long videos (4 hours max)
        setTimeout(() => {
          if (recorder.state === "recording") {
            cancelAnimationFrame(exportAnimId);
            recorder.stop();
          }
        }, 4 * 60 * 60 * 1000);
      });

      downloadBlob(blob, fileName.replace(/\.\w+$/, "") + "-blurred.webm");
      toast.success("Video exported successfully! 🎬");

      // Restore state
      vid.playbackRate = 1;
      vid.muted = false;
      vid.currentTime = currentTime;
      drawPreview();
    } catch (err) {
      console.error("Export failed:", err);
      toast.error(err instanceof Error ? err.message : "Export failed unexpectedly");
    } finally {
      const vid2 = videoRef.current;
      if (vid2) { vid2.playbackRate = 1; vid2.muted = false; }
      setExporting(false);
      setExportProgress(0);
    }
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      {!videoSrc && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-12 cursor-pointer hover:border-primary/50 transition-colors">
          <Upload className="h-10 w-10 text-muted-foreground mb-3" />
          <span className="text-lg font-medium text-foreground">Upload a video to edit</span>
          <span className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV supported</span>
          <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
        </label>
      )}

      {videoSrc && (
        <>
          {/* Hidden video element */}
          <video
            ref={videoRef}
            src={videoSrc}
            onLoadedMetadata={onVideoLoaded}
            onTimeUpdate={() => { setCurrentTime(videoRef.current?.currentTime || 0); drawPreview(); }}
            onEnded={() => setPlaying(false)}
            className="hidden"
            playsInline
            crossOrigin="anonymous"
          />

          {/* Hidden export canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Preview</h3>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Drag the blur region to reposition • Corner to resize</span>
              </div>
            </div>
            <div
              ref={containerRef}
              className="relative w-full bg-black rounded-lg overflow-hidden"
              style={{ aspectRatio: "16/9" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <canvas
                ref={previewCanvasRef}
                className="w-full h-full cursor-crosshair"
              />
              {/* Region overlay indicator (when not full blur) */}
              {!fullBlur && (
                <div
                  className="absolute border-2 border-dashed border-primary/60 pointer-events-none"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    width: `${region.width}%`,
                    height: `${region.height}%`,
                  }}
                >
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-sm" />
                </div>
              )}
            </div>
          </div>

          {/* Playback controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={togglePlay}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <span className="text-sm font-mono text-muted-foreground w-24">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  onValueChange={seekTo}
                />
              </div>
            </div>
          </div>

          {/* Blur controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-lg border border-border bg-card">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Blur Intensity: {blurIntensity}px</Label>
              <Slider
                value={[blurIntensity]}
                min={1}
                max={100}
                step={1}
                onValueChange={(v) => setBlurIntensity(v[0])}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Switch checked={fullBlur} onCheckedChange={setFullBlur} />
                <Label className="text-sm">Blur entire video</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                {fullBlur
                  ? "Entire video will be blurred uniformly"
                  : "Only the selected region will be blurred. Drag on preview to move."}
              </p>
            </div>

            {!fullBlur && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Region X: {Math.round(region.x)}%</Label>
                  <Slider value={[region.x]} min={0} max={100 - region.width} step={1} onValueChange={(v) => setRegion({ ...region, x: v[0] })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Region Y: {Math.round(region.y)}%</Label>
                  <Slider value={[region.y]} min={0} max={100 - region.height} step={1} onValueChange={(v) => setRegion({ ...region, y: v[0] })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Width: {Math.round(region.width)}%</Label>
                  <Slider value={[region.width]} min={5} max={100 - region.x} step={1} onValueChange={(v) => setRegion({ ...region, width: v[0] })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Height: {Math.round(region.height)}%</Label>
                  <Slider value={[region.height]} min={5} max={100 - region.y} step={1} onValueChange={(v) => setRegion({ ...region, height: v[0] })} />
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={saveProgress} variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save Progress
            </Button>
            <Button onClick={resetSettings} variant="ghost" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <label>
              <Button variant="outline" className="gap-2" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  Change Video
                </span>
              </Button>
              <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
            </label>
            <Button
              onClick={handleExport}
              disabled={exporting}
              className="gap-2 ml-auto"
            >
              <Download className="h-4 w-4" />
              {exporting ? `Exporting… ${exportProgress}%` : "Export Video"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoEditor;
