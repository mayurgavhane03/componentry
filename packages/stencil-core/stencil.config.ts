import type { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { angularOutputTarget } from "@stencil/angular-output-target";
import { vueOutputTarget } from "@stencil/vue-output-target";

export const config: Config = {
  namespace: "componentry",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
    },
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
      externalRuntime: false,
      customElementsExportBehavior: "single-export-module",
    },
    {
      type: "docs-readme",
    },
    reactOutputTarget({
      outDir: "../react/src",
      esModules: true,
    }),
    angularOutputTarget({
      componentCorePackage: "@componentry-ui/stencil",
      directivesProxyFile: "../angular/src/generated/components.ts",
      directivesArrayFile: "../angular/src/generated/index.ts",
      outputType: "standalone",
      customElementsDir: "dist/components",
    }),
    vueOutputTarget({
      componentCorePackage: "@componentry-ui/stencil",
      proxiesFile: "../vue/src/generated/components.ts",
      includeImportCustomElements: true, // ← this one
      customElementsDir: "dist/components",
    }),
  ],
  testing: {
    browserHeadless: "shell",
  },
};
