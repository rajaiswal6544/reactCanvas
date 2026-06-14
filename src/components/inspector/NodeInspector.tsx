import { Database, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigTab } from "@/components/inspector/ConfigTab";
import { RuntimeTab } from "@/components/inspector/RuntimeTab";
import { useUiStore } from "@/store/ui-store";
import type { AppGraphNode, ServiceNodeData } from "@/types/graph";

interface NodeInspectorProps {
  node: AppGraphNode | null;
  updateNodeData: ((nodeId: string, data: Partial<ServiceNodeData>) => void) | null;
}

export function NodeInspector({ node, updateNodeData }: NodeInspectorProps) {
  const activeTab = useUiStore((state) => state.activeInspectorTab);
  const setActiveTab = useUiStore((state) => state.setActiveInspectorTab);

  if (!node) {
    return (
      <Card className="border-dashed border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>No node selected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-white/50">
            Select a service or database node on the canvas to inspect configuration and runtime values.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isDatabase = node.data.kind === "database";
  const Icon = isDatabase ? Database : Server;
  const badgeVariant = node.data.status === "Healthy" ? "healthy" : node.data.status === "Degraded" ? "degraded" : "down";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-900 text-white">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-white/45">Service Node</p>
            <h2 className="truncate text-base font-semibold">{node.data.label}</h2>
          </div>
        </div>
        <Badge variant={badgeVariant}>{node.data.status}</Badge>
      </div>

      {isDatabase ? (
        <Card className="border-cyan-400/20 bg-cyan-950/30 text-cyan-100">
          <CardContent className="p-4">
            <p className="text-sm text-cyan-100">
              Database nodes share the topology style, while this inspector remains focused on service metadata.
            </p>
          </CardContent>
        </Card>
      ) : null}

      <Tabs onValueChange={(value) => setActiveTab(value as "config" | "runtime")} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2 bg-white/10 text-white/60">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>
        <TabsContent value="config">
          <ConfigTab node={node} updateNodeData={updateNodeData} />
        </TabsContent>
        <TabsContent value="runtime">
          <RuntimeTab node={node} updateNodeData={updateNodeData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
