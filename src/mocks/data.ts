import type { App, GraphResponse } from "@/types/graph";

export const mockApps: App[] = [
  {
    id: "commerce-suite",
    name: "supertokens-golang",
    owner: "Revenue Platform",
    environment: "Production",
    status: "Healthy",
  },
  {
    id: "claims-hub",
    name: "supertokens-java",
    owner: "Operations",
    environment: "Staging",
    status: "Degraded",
  },
  {
    id: "insights-lab",
    name: "supertokens-python",
    owner: "Data Products",
    environment: "Development",
    status: "Healthy",
  },
];

export const mockGraphs: Record<string, GraphResponse> = {
  "commerce-suite": {
    appId: "commerce-suite",
    nodes: [
      {
        id: "api-gateway",
        type: "service",
        position: { x: 110, y: 145 },
        data: {
          label: "supertokens-golang",
          description: "Routes storefront and checkout traffic.",
          status: "Healthy",
          kind: "service",
          runtimeScore: 82,
        },
      },
      {
        id: "checkout",
        type: "service",
        position: { x: 760, y: 120 },
        data: {
          label: "Postgres",
          description: "Owns carts, payments, and confirmation events.",
          status: "Healthy",
          kind: "service",
          runtimeScore: 61,
        },
      },
      {
        id: "catalog-db",
        type: "database",
        position: { x: 275, y: 430 },
        data: {
          label: "Redis",
          description: "In-memory cache and rate-limit state.",
          status: "Down",
          kind: "database",
          runtimeScore: 84,
        },
      },
      {
        id: "fulfillment",
        type: "database",
        position: { x: 820, y: 495 },
        data: {
          label: "Mongodb",
          description: "Document storage for app metadata.",
          status: "Down",
          kind: "database",
          runtimeScore: 86,
        },
      },
    ],
    edges: [
      { id: "api-checkout", source: "api-gateway", target: "checkout", animated: true },
      { id: "api-catalog", source: "api-gateway", target: "catalog-db" },
      { id: "checkout-fulfillment", source: "checkout", target: "fulfillment" },
    ],
  },
  "claims-hub": {
    appId: "claims-hub",
    nodes: [
      {
        id: "ingestion",
        type: "service",
        position: { x: 80, y: 100 },
        data: {
          label: "Claim Intake",
          description: "Normalizes claim submissions from partners.",
          status: "Healthy",
          kind: "service",
          runtimeScore: 76,
        },
      },
      {
        id: "rules-engine",
        type: "service",
        position: { x: 380, y: 80 },
        data: {
          label: "Rules Engine",
          description: "Applies eligibility and escalation rules.",
          status: "Degraded",
          kind: "service",
          runtimeScore: 48,
        },
      },
      {
        id: "claims-db",
        type: "database",
        position: { x: 380, y: 250 },
        data: {
          label: "Claims Store",
          description: "Authoritative claims records.",
          status: "Healthy",
          kind: "database",
          runtimeScore: 88,
        },
      },
    ],
    edges: [
      { id: "intake-rules", source: "ingestion", target: "rules-engine", animated: true },
      { id: "rules-db", source: "rules-engine", target: "claims-db" },
    ],
  },
  "insights-lab": {
    appId: "insights-lab",
    nodes: [
      {
        id: "collector",
        type: "service",
        position: { x: 80, y: 120 },
        data: {
          label: "Event Collector",
          description: "Receives behavioral telemetry from product clients.",
          status: "Healthy",
          kind: "service",
          runtimeScore: 91,
        },
      },
      {
        id: "warehouse",
        type: "database",
        position: { x: 360, y: 120 },
        data: {
          label: "Warehouse",
          description: "Analytics storage for transformed events.",
          status: "Down",
          kind: "database",
          runtimeScore: 23,
        },
      },
      {
        id: "notebook-api",
        type: "service",
        position: { x: 650, y: 120 },
        data: {
          label: "Notebook API",
          description: "Serves curated datasets to analysts.",
          status: "Degraded",
          kind: "service",
          runtimeScore: 57,
        },
      },
    ],
    edges: [
      { id: "collector-warehouse", source: "collector", target: "warehouse", animated: true },
      { id: "warehouse-notebook", source: "warehouse", target: "notebook-api" },
    ],
  },
};
