export const getComponents = (): Promise<CarbonioModule[]> =>
  fetch("/components.json")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .then(({ components }: { components: CarbonioModule[] }) => {
      return components;
    });

export interface CarbonioModule {
  name: string;
  version: string;
  js_entrypoint: string;
  type: string;
}
