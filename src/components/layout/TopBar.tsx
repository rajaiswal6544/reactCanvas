import { Activity, ChevronUp, Maximize2, MoonStar, MoreHorizontal, Plus, RefreshCcw, Share2, SunDim } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

interface TopBarProps {
  onFitView: () => void;
  onAddNode: () => void;
  onFailNextRequest: () => Promise<void>;
  onRandomFailuresChange: (enabled: boolean) => Promise<void>;
}

export function TopBar({ onAddNode, onFailNextRequest, onFitView, onRandomFailuresChange }: TopBarProps) {
  const [randomFailures, setRandomFailures] = useState(false);
  const colorTheme = useUiStore((state) => state.colorTheme);
  const setColorTheme = useUiStore((state) => state.setColorTheme);

  const toggleRandomFailures = async () => {
    const nextValue = !randomFailures;
    setRandomFailures(nextValue);
    await onRandomFailuresChange(nextValue);
  };

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-20 items-start justify-between px-8 py-4">
      <div className="pointer-events-auto flex h-12 min-w-0 items-center overflow-hidden rounded-md border border-white/15 bg-[#171719] shadow-2xl">
        <div className="flex h-12 w-16 shrink-0 items-center justify-center border-r border-white/10 bg-black">
          <div className="relative h-8 w-8 overflow-hidden rounded-sm border-2 border-white">
            <div className="absolute -bottom-3 -left-3 h-10 w-10 rounded-full border-[10px] border-white" />
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center bg-[#6558f5] text-white">
          <Activity className="h-5 w-5" />
        </div>
        <div className="min-w-0 px-4">
          <h1 className="truncate text-sm font-semibold text-white sm:text-base">supertokens-golang</h1>
        </div>
        <Button className="h-12 rounded-none px-3 text-white hover:bg-white/5" size="icon" variant="ghost" aria-label="Collapse">
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button className="h-12 rounded-none px-3 text-white hover:bg-white/5" size="icon" variant="ghost" aria-label="More">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="pointer-events-auto flex items-center gap-3">
        <div className="hidden overflow-hidden rounded-md border border-white/15 bg-[#171719] shadow-2xl sm:flex">
          <Button className="h-12 rounded-none border-r border-white/10 px-4 text-white hover:bg-white/5" onClick={() => void onFailNextRequest()} size="sm" variant="ghost">
            <RefreshCcw className="h-4 w-4" />
            Fail next
          </Button>
          <Button
            className="h-12 rounded-none border-r border-white/10 px-4 text-white hover:bg-white/5"
            onClick={() => void toggleRandomFailures()}
            size="sm"
            variant="ghost"
          >
            <Activity className="h-4 w-4" />
            Random
          </Button>
          <Button className="h-12 rounded-none border-r border-white/10 px-4 text-white hover:bg-white/5" onClick={onAddNode} size="sm" variant="ghost">
            <Plus className="h-4 w-4" />
            Add
          </Button>
          <Button className="h-12 rounded-none px-4 text-white hover:bg-white/5" onClick={onFitView} size="sm" variant="ghost">
            <Maximize2 className="h-4 w-4" />
            Fit
          </Button>
        </div>
        <div className="flex overflow-hidden rounded-md border border-white/15 bg-[#171719] shadow-2xl">
          <Button className="h-12 w-12 rounded-none border-r border-white/10 text-white hover:bg-white/5" size="icon" variant="ghost" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            className={cn(
              "h-12 w-12 rounded-none text-white hover:bg-white/20",
              colorTheme === "dark" ? "bg-white/15" : "text-white/40 hover:bg-white/5",
            )}
            onClick={() => setColorTheme("dark")}
            size="icon"
            variant="ghost"
            aria-label="Dark mode"
          >
            <MoonStar className="h-4 w-4" />
          </Button>
          <Button
            className={cn(
              "h-12 w-12 rounded-none text-white/40 hover:bg-white/5",
              colorTheme === "light" && "bg-white/15 text-white hover:bg-white/20",
            )}
            onClick={() => setColorTheme("light")}
            size="icon"
            variant="ghost"
            aria-label="Light mode"
          >
            <SunDim className="h-4 w-4" />
          </Button>
          <div className="flex h-12 w-14 items-center justify-center border-l border-white/10">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-sky-500 to-amber-300 text-xs font-bold text-white ring-2 ring-white/30">
              AG
            </div>
          </div>
        </div>
        <div className="flex sm:hidden">
          <Button className="h-12 w-12 border border-white/15 bg-[#171719] text-white" onClick={onAddNode} size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="hidden">
          <Button className="hidden sm:inline-flex" onClick={() => void onFailNextRequest()} size="sm" variant="outline">
          <RefreshCcw className="h-4 w-4" />
          Fail next
          </Button>
        </div>
      </div>
    </header>
  );
}
