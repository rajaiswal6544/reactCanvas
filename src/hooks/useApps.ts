import { useQuery } from "@tanstack/react-query";
import type { App } from "@/types/graph";

async function fetchApps(): Promise<App[]> {
  const response = await fetch("/apps");

  if (!response.ok) {
    throw new Error("Unable to load apps.");
  }

  return response.json() as Promise<App[]>;
}

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });
}
