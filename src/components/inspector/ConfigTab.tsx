import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AppGraphNode, ServiceNodeData } from "@/types/graph";

interface ConfigTabProps {
  node: AppGraphNode;
  updateNodeData: ((nodeId: string, data: Partial<ServiceNodeData>) => void) | null;
}

export function ConfigTab({ node, updateNodeData }: ConfigTabProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80" htmlFor="node-name">
          Node name
        </label>
        <Input
          className="border-white/10 bg-white/5 text-white"
          id="node-name"
          onChange={(event) => updateNodeData?.(node.id, { label: event.target.value })}
          onKeyDown={(event) => event.stopPropagation()}
          value={node.data.label}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80" htmlFor="node-description">
          Description
        </label>
        <Textarea
          className="border-white/10 bg-white/5 text-white"
          id="node-description"
          onChange={(event) => updateNodeData?.(node.id, { description: event.target.value })}
          onKeyDown={(event) => event.stopPropagation()}
          placeholder="Add service ownership, dependencies, or deployment notes."
          value={node.data.description ?? ""}
        />
      </div>
    </div>
  );
}
