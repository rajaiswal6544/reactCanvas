import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { AppGraphNode, ServiceNodeData } from "@/types/graph";

interface RuntimeTabProps {
  node: AppGraphNode;
  updateNodeData: ((nodeId: string, data: Partial<ServiceNodeData>) => void) | null;
}

function clampScore(value: number) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}

export function RuntimeTab({ node, updateNodeData }: RuntimeTabProps) {
  const score = node.data.runtimeScore;

  const updateScore = (value: number) => {
    updateNodeData?.(node.id, { runtimeScore: clampScore(value) });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/80" htmlFor="runtime-score">
            Runtime score
          </label>
          <span className="text-xs text-white/45">0-100</span>
        </div>
        <Slider max={100} min={0} onValueChange={([value]) => updateScore(value ?? 0)} step={1} value={[score]} />
      </div>
      <Input
        className="border-white/10 bg-white/5 text-white"
        id="runtime-score"
        inputMode="numeric"
        max={100}
        min={0}
        onChange={(event) => updateScore(Number(event.target.value))}
        onKeyDown={(event) => event.stopPropagation()}
        type="number"
        value={score}
      />
      <div className="rounded-md border border-white/10 bg-white/5 p-3 text-white">
        <p className="text-xs font-medium uppercase tracking-wide text-white/45">Runtime posture</p>
        <p className="mt-1 text-sm font-semibold">
          {score >= 80 ? "Stable" : score >= 50 ? "Watch closely" : "Needs attention"}
        </p>
      </div>
    </div>
  );
}
