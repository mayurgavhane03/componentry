import type { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "componentry",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
      externalRuntime: false,
    },
    {
      type: "docs-readme",
    },
    reactOutputTarget({
      outDir: "../react/src",
      esModules: true,
    }),
  ],
  testing: {
    browserHeadless: "shell",
  },
};