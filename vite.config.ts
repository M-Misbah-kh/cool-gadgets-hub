import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    router: {
      entry: "./src/router.tsx",
    },
    server: {
      entry: "server",
    },
  },
});
