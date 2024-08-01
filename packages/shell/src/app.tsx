import React, { useEffect, useState } from "react";
import { loadRemoteModules } from "./hooks/useRemoteModules";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimaryBar } from "./components/primary-bar";
import { useAppStore } from "./stores/app-store";

const MainView = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <nav>Header</nav>
      <div>
        <PrimaryBar />
        <div>{children}</div>
      </div>
    </div>
  );
};

interface RemoteItem {
  name: string;
  component: React.ComponentType | undefined;
}

export const App = (): React.JSX.Element => {
  const [remotes, setRemotes] = useState<RemoteItem[]>([]);
  const modules = useAppStore((s) => s.modules);

  useEffect(() => {
    void loadRemoteModules().then((result) => {
      setRemotes(
        result.reduce<RemoteItem[]>((accumulator, item) => {
          if (item.status === "fulfilled") {
            accumulator.push(item.value);
          } else {
            console.error(item.reason);
          }
          return accumulator;
        }, []),
      );
    });
  }, []);

  return (
    <>
      {remotes.map(
        (remote) => remote.component && <remote.component key={remote.name} />,
      )}
      <BrowserRouter>
        <Routes>
          {modules.map((module) => {
            return (
              module.appView && (
                <Route
                  path={module.route}
                  key={module.id}
                  element={
                    <MainView>
                      <module.appView />
                    </MainView>
                  }
                />
              )
            );
          })}
          <Route
            path="/"
            element={
              <MainView>
                <div>Empty view</div>
              </MainView>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
