import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type NodeChange,
  type NodeMouseHandler,
  type OnNodesDelete,
  type ReactFlowInstance,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
} from "@xyflow/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ServiceNode } from "@/components/graph/ServiceNode";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGraph } from "@/hooks/useGraph";
import { useUiStore } from "@/store/ui-store";
import type { AppGraphEdge, AppGraphNode, ServiceNodeData } from "@/types/graph";

export interface GraphActions {
  fitView: () => void;
  addNode: () => void;
}

interface GraphCanvasProps {
  onActionsReady: (actions: GraphActions) => void;
  onSelectedNodeChange: (node: AppGraphNode | null) => void;
  onUpdateNodeDataReady: (updateNodeData: (nodeId: string, data: Partial<ServiceNodeData>) => void) => void;
}

const nodeTypes = {
  service: ServiceNode,
  database: ServiceNode,
};

export function GraphCanvas({ onActionsReady, onSelectedNodeChange, onUpdateNodeDataReady }: GraphCanvasProps) {
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useUiStore((state) => state.setSelectedNodeId);
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);
  const colorTheme = useUiStore((state) => state.colorTheme);
  const { data, error, isFetching, isLoading, refetch } = useGraph(selectedAppId);
  const [nodes, setNodes] = useState<AppGraphNode[]>([]);
  const [edges, setEdges] = useState<AppGraphEdge[]>([]);
  const flowInstanceRef = useRef<ReactFlowInstance<AppGraphNode, AppGraphEdge> | null>(null);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  useEffect(() => {
    onSelectedNodeChange(selectedNode);
  }, [onSelectedNodeChange, selectedNode]);

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
      setSelectedNodeId(null);
      window.setTimeout(() => {
        void flowInstanceRef.current?.fitView({ padding: 0.2, duration: 450 });
      }, 0);
    }
  }, [data, setSelectedNodeId]);

  const updateNodeData = useCallback((nodeId: string, partialData: Partial<ServiceNodeData>) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...partialData,
              },
            }
          : node,
      ),
    );
  }, []);

  useEffect(() => {
    onUpdateNodeDataReady(updateNodeData);
  }, [onUpdateNodeDataReady, updateNodeData]);

  const fitView = useCallback(() => {
    void flowInstanceRef.current?.fitView({ padding: 0.18, duration: 450 });
  }, []);

  const addNodeToCanvas = useCallback(() => {
    const id = `service-${Date.now()}`;
    const viewport = flowInstanceRef.current?.getViewport();
    const position = flowInstanceRef.current?.screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }) ?? {
      x: 160 + nodes.length * 36 - (viewport?.x ?? 0),
      y: 160 + nodes.length * 24 - (viewport?.y ?? 0),
    };

    const newNode: AppGraphNode = {
      id,
      type: "service",
      position,
      data: {
        label: "New Service",
        description: "Describe the service contract and owner.",
        status: "Healthy",
        kind: "service",
        runtimeScore: 50,
      },
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
    setSelectedNodeId(id);
    setMobilePanelOpen(true);
  }, [nodes.length, setMobilePanelOpen, setSelectedNodeId]);

  useEffect(() => {
    onActionsReady({
      fitView,
      addNode: addNodeToCanvas,
    });
  }, [addNodeToCanvas, fitView, onActionsReady]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "f" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement | null;
        if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") {
          return;
        }
        event.preventDefault();
        fitView();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fitView]);

  const handleNodesChange = useCallback((changes: NodeChange<AppGraphNode>[]) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  }, []);

  const handleEdgesChange = useCallback((changes: EdgeChange<AppGraphEdge>[]) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
  }, []);

  const handleConnect = useCallback((connection: Connection) => {
    setEdges((currentEdges) => addEdge(connection, currentEdges));
  }, []);

  const handleNodeClick: NodeMouseHandler<AppGraphNode> = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
      setMobilePanelOpen(true);
    },
    [setMobilePanelOpen, setSelectedNodeId],
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const handleNodesDelete: OnNodesDelete<AppGraphNode> = useCallback(
    (deletedNodes) => {
      if (deletedNodes.some((node) => node.id === selectedNodeId)) {
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setSelectedNodeId],
  );

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center bg-[#111315]">
        <div className="w-full max-w-2xl space-y-4 p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-[#00d46a]" />
            Loading app graph
          </div>
          <Skeleton className="h-72 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid h-full place-items-center bg-[#111315] p-6">
        <div className="max-w-sm rounded-lg border border-white/10 bg-black p-5 text-center shadow-2xl">
          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />
          <h2 className="text-base font-semibold text-white">Graph unavailable</h2>
          <p className="mt-2 text-sm text-white/50">The mock API returned an error for this app graph.</p>
          <Button className="mt-4" onClick={() => void refetch()} size="sm">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-[#111315]">
      {isFetching ? (
        <div className="absolute left-[520px] top-24 z-10 rounded-md border border-white/10 bg-black px-3 py-2 text-xs text-white/60 shadow-sm">
          Refreshing graph...
        </div>
      ) : null}
      <ReactFlow<AppGraphNode, AppGraphEdge>
        defaultEdgeOptions={{
          style: { stroke: "#2dd46f", strokeWidth: 1.5, opacity: 0.55 },
          animated: true,
        }}
        deleteKeyCode={["Backspace", "Delete"]}
        edges={edges}
        fitView
        maxZoom={1.3}
        minZoom={0.2}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={handleConnect}
        onEdgesChange={handleEdgesChange}
        onInit={(instance) => {
          flowInstanceRef.current = instance;
        }}
        onNodeClick={handleNodeClick}
        onNodesChange={handleNodesChange}
        onNodesDelete={handleNodesDelete}
        onPaneClick={handlePaneClick}
        panOnDrag
        proOptions={{ hideAttribution: true }}
      >
        <Background color={colorTheme === "light" ? "#c5ced8" : "#31363b"} gap={24} size={1.4} variant={BackgroundVariant.Dots} />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
