import React, { useEffect, useState } from "react";
import { loadRemoteModules } from "./hooks/useRemoteModules";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimaryBar } from "./components/primary-bar";
import { type Module } from "./stores/app-store";

const MainView = ({
  modules,
  children,
}: React.PropsWithChildren<{ modules: Module[] }>) => {
  return (
    <div>
      <nav>Header</nav>
      <div>
        <PrimaryBar modules={modules} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export const App = (): React.JSX.Element => {
  const [remotes, setRemotes] = useState<Module[]>([]);

  useEffect(() => {
    async function loadRemotes() {
      const remoteModules = await loadRemoteModules();
      setRemotes(
        remoteModules.reduce<typeof remotes>((accumulator, item) => {
          if (item.status === "rejected") {
            console.error(item.reason);
            return accumulator;
          }
          if (item.value.apps) {
            accumulator.push(...item.value.apps);
          }
          return accumulator;
        }, []),
      );
    }

    void loadRemotes();
  }, []);

  return (
    <>
      <BrowserRouter>
        <MainView modules={remotes}>
          <Routes>
            {remotes.map((module) => {
              return (
                module.appView && (
                  <Route
                    path={module.route}
                    key={module.id}
                    element={<module.appView />}
                  />
                )
              );
            })}
            <Route path="/" element={<div>Empty view</div>} />
          </Routes>
        </MainView>
      </BrowserRouter>
    </>
  );
};
