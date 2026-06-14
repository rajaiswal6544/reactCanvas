import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { GraphCanvas, type GraphActions } from "@/components/graph/GraphCanvas";
import { LeftRail } from "@/components/layout/LeftRail";
import { MobileInspectorDrawer } from "@/components/layout/MobileInspectorDrawer";
import { RightPanel } from "@/components/layout/RightPanel";
import { TopBar } from "@/components/layout/TopBar";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";
import type { AppGraphNode, ServiceNodeData } from "@/types/graph";

export function AppShell() {
  const queryClient = useQueryClient();
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const colorTheme = useUiStore((state) => state.colorTheme);
  const [graphActions, setGraphActions] = useState<GraphActions | null>(null);
  const [selectedNode, setSelectedNode] = useState<AppGraphNode | null>(null);
  const [updateNodeData, setUpdateNodeData] = useState<((nodeId: string, data: Partial<ServiceNodeData>) => void) | null>(
    null,
  );

  const failNextRequest = useCallback(async () => {
    await fetch("/mock-api/fail-next", { method: "POST" });
    await queryClient.invalidateQueries({ queryKey: ["graph", selectedAppId] });
  }, [queryClient, selectedAppId]);

  const setRandomFailures = useCallback(async (enabled: boolean) => {
    await fetch("/mock-api/random-failures", {
      method: "POST",
      body: JSON.stringify({ enabled }),
    });
  }, []);

  return (
    <div
      className={cn(
        "relative h-dvh min-h-[620px] overflow-hidden bg-[#111315] text-white",
        colorTheme === "light" && "theme-light",
      )}
    >
      <TopBar
        onAddNode={() => graphActions?.addNode()}
        onFailNextRequest={failNextRequest}
        onFitView={() => graphActions?.fitView()}
        onRandomFailuresChange={setRandomFailures}
      />
      <LeftRail />
      <main className="h-full w-full">
        <GraphCanvas
          onActionsReady={setGraphActions}
          onSelectedNodeChange={setSelectedNode}
          onUpdateNodeDataReady={(callback) => setUpdateNodeData(() => callback)}
        />
      </main>
      <aside className="pointer-events-none absolute right-6 top-24 z-20 hidden w-[380px] md:block">
        <div className="pointer-events-auto">
          <RightPanel
            selectedNode={selectedNodeId ? selectedNode : null}
            updateNodeData={updateNodeData}
          />
        </div>
      </aside>
      <MobileInspectorDrawer
        selectedNode={selectedNodeId ? selectedNode : null}
        updateNodeData={updateNodeData}
      />
    </div>
  );
}
