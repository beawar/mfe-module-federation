import { useAppStore } from "./stores/app-store";

export function registerModule(module: {
  id: string;
  name: string;
  description: string;
  route?: string;
  primaryBar?: React.ComponentType;
  appView?: React.ComponentType;
}) {
  useAppStore.getState().registerModule(module);
}
