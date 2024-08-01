import { getComponents } from "../network/get-components";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

export async function loadRemoteModules() {
  return getComponents().then((res) => {
    const remotes = res.map((entry) => ({
      name: entry.name,
      entry: entry.js_entrypoint,
    }));
    init({
      name: "shell",
      remotes,
    });
    return Promise.allSettled(
      remotes.map((remote) =>
        loadRemote<{ default: React.ComponentType }>(remote.name).then(
          (loadedRemote) => ({
            name: remote.name,
            component: loadedRemote?.default,
          }),
        ),
      ),
    );
  });
}
