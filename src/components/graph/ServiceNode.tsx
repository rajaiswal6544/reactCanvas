import { Cpu, Database, HardDrive, MemoryStick, Server, Settings, TriangleAlert } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AppGraphNode } from "@/types/graph";

export function ServiceNode({ data, selected, type }: NodeProps<AppGraphNode>) {
  const isDatabase = type === "database" || data.kind === "database";
  const Icon = isDatabase ? Database : Server;
  const ok = data.status === "Healthy";
  const providerName = "aws";

  return (
    <div
      className={cn(
        "min-w-[380px] rounded-xl border border-white/5 bg-black p-6 text-white shadow-2xl transition",
        selected && "border-[#00d46a]/70 ring-2 ring-[#00d46a]/20",
      )}
    >
      <Handle className="h-2.5 w-2.5 border-black bg-[#00d46a]" position={Position.Left} type="target" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-slate-800">
            <Icon className={cn("h-5 w-5", isDatabase && "text-green-600")} />
          </div>
          <h3 className="truncate text-base font-bold">{data.label}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-[#00d46a] px-3 py-2 text-xs font-semibold text-[#00d46a]">$0.03/HR</div>
          <button className="grid h-9 w-9 place-items-center rounded-lg bg-[#13213a] text-white" type="button" aria-label="Node settings">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-4 gap-2 text-center text-xs text-white">
        <span>0.02</span>
        <span>0.05 GB</span>
        <span>10.00 GB</span>
        <span>1</span>
      </div>
      <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-lg bg-[#111827] text-xs">
        <div className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 text-black">
          <Cpu className="h-4 w-4" />
          CPU
        </div>
        <div className="flex items-center justify-center gap-1.5 py-2.5 text-white">
          <MemoryStick className="h-4 w-4 text-white/60" />
          Memory
        </div>
        <div className="flex items-center justify-center gap-1.5 py-2.5 text-white">
          <HardDrive className="h-4 w-4 text-white/60" />
          Disk
        </div>
        <div className="flex items-center justify-center gap-1.5 py-2.5 text-white">
          <Database className="h-4 w-4 text-white/60" />
          Region
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gradient-to-r from-[#2d7cff] via-[#2bdd72] to-[#ff5247]">
          <div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white" style={{ left: `calc(${data.runtimeScore}% - 8px)` }} />
        </div>
        <div className="flex h-10 w-24 items-center justify-end rounded-lg border border-white/10 bg-black px-3 text-sm text-white">0.02</div>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <Badge className={cn("rounded-md px-3 py-2 text-sm", ok ? "bg-[#063f20] text-[#1ee979]" : "bg-[#3f0808] text-[#ff4b4b]")} variant="outline">
          {ok ? "⊙ Success" : <><TriangleAlert className="mr-1 h-4 w-4" /> Error</>}
        </Badge>
        <div className="text-3xl font-bold leading-none text-[#ff9900]">
          {providerName}
          <div className="h-2 w-12 rounded-[50%] border-b-2 border-[#ff9900]" />
        </div>
      </div>
      <Handle className="h-2.5 w-2.5 border-black bg-[#00d46a]" position={Position.Right} type="source" />
    </div>
  );
}
