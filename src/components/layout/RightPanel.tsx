import { AppSelector } from "@/components/apps/AppSelector";
import { NodeInspector } from "@/components/inspector/NodeInspector";
import type { AppGraphNode, ServiceNodeData } from "@/types/graph";

interface RightPanelProps {
  selectedNode: AppGraphNode | null;
  updateNodeData: ((nodeId: string, data: Partial<ServiceNodeData>) => void) | null;
}

export function RightPanel({ selectedNode, updateNodeData }: RightPanelProps) {
  return (
    <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-xl border border-white/10 bg-black p-5 shadow-2xl">
      <div className="space-y-5">
        <AppSelector />
        <div className="border-t border-white/10 pt-5">
          <NodeInspector node={selectedNode} updateNodeData={updateNodeData} />
        </div>
      </div>
    </div>
  );
}
