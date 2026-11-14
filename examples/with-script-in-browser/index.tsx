import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@akumadraw/akumadraw/index.css";

import type * as TAkumadraw from "@akumadraw/akumadraw";

import App from "./components/ExampleApp";

declare global {
  interface Window {
    AkumadrawLib: typeof TAkumadraw;
  }
}

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
const { Akumadraw } = window.AkumadrawLib;
root.render(
  <StrictMode>
    <App
      appTitle={"Akumadraw Example"}
      useCustom={(api: any, args?: any[]) => {}}
      akumadrawLib={window.AkumadrawLib}
    >
      <Akumadraw />
    </App>
  </StrictMode>,
);
