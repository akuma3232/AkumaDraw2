import React from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initialData from "@site/src/initialData";
import { useColorMode } from "@docusaurus/theme-common";

import "@akumadraw/akumadraw/index.css";

let AkumadrawComp = {};
if (ExecutionEnvironment.canUseDOM) {
  AkumadrawComp = require("@akumadraw/akumadraw");
}
const Akumadraw = React.forwardRef((props, ref) => {
  if (!window.AKUMADRAW_ASSET_PATH) {
    window.AKUMADRAW_ASSET_PATH =
      "https://esm.sh/@akumadraw/akumadraw@0.18.0/dist/prod/";
  }

  const { colorMode } = useColorMode();
  return <AkumadrawComp.Akumadraw theme={colorMode} {...props} ref={ref} />;
});
// Add react-live imports you need here
const AkumadrawScope = {
  React,
  ...React,
  Akumadraw,
  Footer: AkumadrawComp.Footer,
  useDevice: AkumadrawComp.useDevice,
  MainMenu: AkumadrawComp.MainMenu,
  WelcomeScreen: AkumadrawComp.WelcomeScreen,
  LiveCollaborationTrigger: AkumadrawComp.LiveCollaborationTrigger,
  Sidebar: AkumadrawComp.Sidebar,
  exportToCanvas: AkumadrawComp.exportToCanvas,
  initialData,
  useI18n: AkumadrawComp.useI18n,
  convertToAkumadrawElements: AkumadrawComp.convertToAkumadrawElements,
  CaptureUpdateAction: AkumadrawComp.CaptureUpdateAction,
};

export default AkumadrawScope;
