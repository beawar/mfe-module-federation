import { getComponents } from "../network/get-components";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import type { Module } from "../stores/app-store";
import React from "react";

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
      remotes.map((remote) => loadRemoteModule(remote)),
    );
  });
}

interface RemoteExports {
  apps: Module[];
}

async function loadRemoteModule(remote: { name: string; entry: string }) {
  const loadedRemote = await loadRemote<RemoteExports>(remote.name);
  return {
    name: remote.name,
    component: React.Fragment,
    apps: loadedRemote?.apps,
  };
}
