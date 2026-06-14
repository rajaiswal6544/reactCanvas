import { create } from "zustand";

export type InspectorTab = "config" | "runtime";
export type ColorTheme = "dark" | "light";

interface UiState {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  colorTheme: ColorTheme;
  setSelectedAppId: (appId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  setColorTheme: (theme: ColorTheme) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedAppId: "commerce-suite",
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",
  colorTheme: "dark",
  setSelectedAppId: (appId) =>
    set({
      selectedAppId: appId,
      selectedNodeId: null,
      isMobilePanelOpen: false,
      activeInspectorTab: "config",
    }),
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  setMobilePanelOpen: (isOpen) => set({ isMobilePanelOpen: isOpen }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  setColorTheme: (theme) => set({ colorTheme: theme }),
}));
