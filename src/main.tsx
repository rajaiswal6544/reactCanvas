import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProviders } from "./app/providers";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <AppProviders>
          <App />
        </AppProviders>
      </React.StrictMode>,
    );
  })
  .catch((error: unknown) => {
    console.error("Failed to start mock service worker", error);
  });
