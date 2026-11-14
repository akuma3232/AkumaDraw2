import React from "react";

import type * as TAkumadraw from "@akumadraw/akumadraw";
import type { AkumadrawImperativeAPI } from "@akumadraw/akumadraw/types";

import CustomFooter from "./CustomFooter";

const MobileFooter = ({
  akumadrawAPI,
  akumadrawLib,
}: {
  akumadrawAPI: AkumadrawImperativeAPI;
  akumadrawLib: typeof TAkumadraw;
}) => {
  const { useEditorInterface, Footer } = akumadrawLib;

  const editorInterface = useEditorInterface();
  if (editorInterface.formFactor === "phone") {
    return (
      <Footer>
        <CustomFooter akumadrawAPI={akumadrawAPI} akumadrawLib={akumadrawLib} />
      </Footer>
    );
  }
  return null;
};
export default MobileFooter;
