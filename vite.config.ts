import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite configuration function.
 *
 * @param {object} param - The parameter object.
 * @param {string} param.mode - The current mode (e.g., development, production).
 * @returns {object} - The Vite configuration object.
 *
 * This function loads environment variables based on the current mode and sets up the Vite configuration.
 * It includes setting the base URL and defining path aliases for various directories in the project.
 */
export default ({ mode }: any) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");

  // Now access your environment variables via `env`
  const baseURL = env.VITE_BASE_URL;

  return defineConfig({
    // Use the base URL in the Vite configuration
    base: baseURL || "/",
    plugins: [react()],
    resolve: {
      alias: {
        "@config": path.resolve(__dirname, "config"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@styles": path.resolve(__dirname, "src/assets/styles"),
        "@lottie-asset": path.resolve(__dirname, "src/assets/lottie-asset"),
        "@domain": path.resolve(__dirname, "src/domain"),
        "@entities": path.resolve(__dirname, "src/domain/entities"),
        "@useCases": path.resolve(__dirname, "src/domain/useCases"),
        "@infrastructure": path.resolve(__dirname, "src/infrastructure"),
        "@lib": path.resolve(__dirname, "src/infrastructure/lib"),
        "@redux": path.resolve(__dirname, "src/infrastructure/redux"),
        "@api": path.resolve(__dirname, "src/infrastructure/api"),
        "@services": path.resolve(__dirname, "src/infrastructure/services"),
        "@components": path.resolve(__dirname, "src/presentation/components"),
        "@viewModels": path.resolve(__dirname, "src/presentation/viewModels"),
        "@containers": path.resolve(__dirname, "src/presentation/containers"),
        "@pages": path.resolve(__dirname, "src/presentation/pages"),
        "@routes": path.resolve(__dirname, "src/presentation/routes"),
      },
    },
    server: {
      port: 5101,
      open: false,
    },
  });
};
