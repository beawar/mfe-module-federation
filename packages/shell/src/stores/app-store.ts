import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Module {
  id: string;
  name: string;
  route?: string;
  description?: string;
  primaryBar?: React.ComponentType;
  appView?: React.ComponentType;
}

interface AppStoreState {
  modules: Module[];
}

interface AppStoreActions {
  registerModule: (
    module: Required<Pick<Module, "id">> & Partial<Module>,
  ) => void;
  unRegisterModule: (moduleId: string) => void;
}

const initialState: AppStoreState = {
  modules: [],
};

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  devtools((set) => ({
    ...initialState,
    registerModule: (module) => {
      set((state) => {
        const prevModuleIndex = state.modules.findIndex(
          (m) => m.id === module.id,
        );
        const newModule =
          prevModuleIndex >= 0
            ? { ...state.modules[prevModuleIndex], ...module }
            : module;
        const newModules = [...state.modules];
        newModules.splice(prevModuleIndex, prevModuleIndex >= 0 ? 1 : 0, {
          name: "",
          ...newModule,
        });
        return { modules: newModules };
      });
    },
    unRegisterModule: (moduleId) => {
      set((state) => {
        return {
          modules: state.modules.filter((module) => module.id !== moduleId),
        };
      });
    },
  })),
);
