import { Boxes, Database, Github, Grid2X2, Package, Rows3, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Github, label: "GitHub", active: true },
  { icon: Database, label: "Postgres" },
  { icon: Rows3, label: "Redis" },
  { icon: Package, label: "MongoDB" },
  { icon: Boxes, label: "Services" },
  { icon: Grid2X2, label: "Apps" },
  { icon: Waypoints, label: "Topology" },
];

export function LeftRail() {
  return (
    <nav className="pointer-events-auto absolute left-3 top-[370px] z-20 hidden w-14 flex-col items-center gap-3 rounded-xl border border-white/10 bg-black py-3 shadow-2xl sm:flex">
      {navItems.map((item) => (
        <Button
          key={item.label}
          aria-label={item.label}
          className={cn(
            "h-8 w-8 rounded-md text-white/70 hover:bg-white/10 hover:text-white",
            item.active && "bg-[#17213a] text-white hover:bg-[#17213a]",
            item.label === "Redis" && "text-red-500",
            item.label === "MongoDB" && "text-green-500",
            item.label === "Apps" && "text-amber-400",
            item.label === "Topology" && "text-emerald-400",
          )}
          size="icon"
          variant="ghost"
        >
          <item.icon className="h-4 w-4" />
        </Button>
      ))}
    </nav>
  );
}
