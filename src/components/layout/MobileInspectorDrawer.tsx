import { RightPanel } from "@/components/layout/RightPanel";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUiStore } from "@/store/ui-store";
import type { AppGraphNode, ServiceNodeData } from "@/types/graph";

interface MobileInspectorDrawerProps {
  selectedNode: AppGraphNode | null;
  updateNodeData: ((nodeId: string, data: Partial<ServiceNodeData>) => void) | null;
}

export function MobileInspectorDrawer({ selectedNode, updateNodeData }: MobileInspectorDrawerProps) {
  const isOpen = useUiStore((state) => state.isMobilePanelOpen);
  const setOpen = useUiStore((state) => state.setMobilePanelOpen);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent className="border-white/10 bg-[#111315] text-white">
          <SheetHeader className="border-b border-white/10">
            <SheetTitle>Graph Details</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <RightPanel selectedNode={selectedNode} updateNodeData={updateNodeData} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
