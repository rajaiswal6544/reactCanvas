import { AlertTriangle, Briefcase, CheckCircle2, CircleDotDashed, Puzzle, Rocket, Search, ServerCrash, Settings2 } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApps } from "@/hooks/useApps";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";
import type { AppStatus } from "@/types/graph";

const statusIcon: Record<AppStatus, typeof CheckCircle2> = {
  Healthy: CheckCircle2,
  Degraded: CircleDotDashed,
  Down: ServerCrash,
};

const appIconStyles = [
  "bg-[#6558f5]",
  "bg-[#8b5cf6]",
  "bg-[#f43f5e]",
  "bg-[#d946ef]",
  "bg-[#8b5cf6]",
];

const appIcons = [CircleDotDashed, Settings2, Rocket, Briefcase, Puzzle];

export function AppSelector() {
  const { data: apps, error, isLoading, refetch } = useApps();
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId);

  useEffect(() => {
    if (apps?.length && !apps.some((app) => app.id === selectedAppId)) {
      setSelectedAppId(apps[0].id);
    }
  }, [apps, selectedAppId, setSelectedAppId]);

  return (
    <section className="rounded-xl border border-white/10 bg-black p-6 text-white shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Application</h2>
          <p className="mt-1 text-xs text-white/35">Choose a topology workspace</p>
        </div>
        <Button className="border-white/10 bg-white/5 text-white hover:bg-white/10" onClick={() => void refetch()} size="sm" variant="outline">
          Refresh
        </Button>
      </div>
      <div className="mb-6 flex gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
          <input
            className="h-10 w-full rounded-md border border-white/5 bg-[#242424] px-3 pr-10 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#3464ff]"
            placeholder="Search..."
            readOnly
          />
        </div>
        <Button className="h-10 w-10 bg-[#3464ff] p-0 text-white hover:bg-[#2857ef]" onClick={() => void refetch()} size="icon">
          +
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-12 bg-white/10" />
          <Skeleton className="h-12 bg-white/10" />
          <Skeleton className="h-12 bg-white/10" />
        </div>
      ) : error ? (
        <Card className="border-red-500/30 bg-red-950/40 text-red-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-100">
              <AlertTriangle className="h-4 w-4" />
              Apps unavailable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="border-white/10 text-white" onClick={() => void refetch()} size="sm" variant="outline">
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="max-h-[250px] space-y-3 overflow-y-auto pr-2 md:max-h-[245px]">
          {apps?.map((app, index) => {
            const Icon = statusIcon[app.status];
            const AppIcon = appIcons[index % appIcons.length];
            const selected = app.id === selectedAppId;

            return (
              <button
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg border border-transparent p-0 text-left text-white transition hover:bg-white/5",
                  selected && "bg-white/5",
                )}
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                type="button"
              >
                <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-md text-white", appIconStyles[index % appIconStyles.length])}>
                  <AppIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold">{app.name}</p>
                </div>
                <Badge className="hidden border-white/10 bg-white/5 text-white/60 group-hover:flex" variant="outline">
                  <Icon className="mr-1 h-3 w-3" />
                  {app.status}
                </Badge>
                <span className="text-xl text-white/80">›</span>
              </button>
            );
          })}
          <button className="flex w-full items-center gap-3 rounded-lg text-left text-white transition hover:bg-white/5" type="button">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#8b5cf6] text-white">
              <Puzzle className="h-5 w-5" />
            </div>
            <span className="min-w-0 flex-1 truncate text-base font-semibold">supertokens-go</span>
            <span className="text-xl text-white/80">›</span>
          </button>
        </div>
      )}
    </section>
  );
}
