import React, { useEffect, useState } from "react";
import { getComponents } from "./network/get-components";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

// const AppComponent = (component: CarbonioModule) => {
// const RemoteComponent = React.lazy(() =>
// import(component.js_entrypoint) as Promise<{ default: React.ComponentType<Record<never, never>> }>
// );
// const path = `${component.name}/*`;
// return (
//   <Route key={component.name} path={path} element={<RemoteComponent />} />
// );
// };

export const App = (): React.JSX.Element => {
  // const [components, setComponents] = useState<CarbonioModule[]>([]);
  const [modules, setModules] = useState<Record<string, React.ComponentType>>(
    {},
  );

  useEffect(() => {
    void getComponents().then((res) => {
      console.log("components", res);
      // setComponents(res);
      const remotes = res.map((entry) => ({
        name: entry.name,
        entry: entry.js_entrypoint,
        alias: entry.name,
      }));
      init({
        name: "shell",
        remotes,
      });
      console.log("processing remotes", remotes);
      remotes.forEach((remote) => {
        void loadRemote<{ default: React.ComponentType }>(remote.name).then(
          (remoteModule) => {
            console.log("load remote", remote);
            if (remoteModule) {
              setModules((prevState) => ({
                ...prevState,
                [remote.name]: remoteModule.default,
              }));
            }
          },
        );
      });
    });
  }, []);

  return (
    <div>
      <nav>Header</nav>
      {/* {components.map((component) => AppComponent(component))} */}
      {Object.values(modules).map((Component) => (
        <Component />
      ))}
    </div>
  );
};
