import { useQuery } from "@tanstack/react-query";
import type { GraphResponse } from "@/types/graph";

async function fetchGraph(appId: string): Promise<GraphResponse> {
  const response = await fetch(`/apps/${appId}/graph`);

  if (!response.ok) {
    throw new Error("Unable to load graph.");
  }

  return response.json() as Promise<GraphResponse>;
}

export function useGraph(appId: string) {
  return useQuery({
    queryKey: ["graph", appId],
    queryFn: () => fetchGraph(appId),
    enabled: appId.length > 0,
  });
}
