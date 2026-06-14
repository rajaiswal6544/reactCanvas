import type { Edge, Node } from "@xyflow/react";

export type AppStatus = "Healthy" | "Degraded" | "Down";
export type ServiceKind = "service" | "database";

export interface App {
  id: string;
  name: string;
  owner: string;
  environment: "Production" | "Staging" | "Development";
  status: AppStatus;
}

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status: AppStatus;
  kind: ServiceKind;
  runtimeScore: number;
}

export type AppGraphNode = Node<ServiceNodeData, "service" | "database">;
export type AppGraphEdge = Edge;

export interface GraphResponse {
  appId: string;
  nodes: AppGraphNode[];
  edges: AppGraphEdge[];
}
