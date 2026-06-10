import type { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { angularOutputTarget } from "@stencil/angular-output-target";

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
        customElementsExportBehavior: 'single-export-module',  

    },
    {
      type: "docs-readme",
    },
    reactOutputTarget({
      outDir: "../react/src",
      esModules: true,
    }),
    angularOutputTarget({
      componentCorePackage: "@componentry/stencil",
      directivesProxyFile: "../angular/src/generated/components.ts",
      directivesArrayFile: "../angular/src/generated/index.ts",
      outputType: "standalone",
      customElementsDir: "dist/components",
    }),
  ],
  testing: {
    browserHeadless: "shell",
  },
};