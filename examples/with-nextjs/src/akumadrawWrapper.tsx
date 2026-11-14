"use client";
import * as akumadrawLib from "@akumadraw/akumadraw";
import { Akumadraw } from "@akumadraw/akumadraw";

import "@akumadraw/akumadraw/index.css";

import App from "../../with-script-in-browser/components/ExampleApp";

const AkumadrawWrapper: React.FC = () => {
  return (
    <>
      <App
        appTitle={"Akumadraw with Nextjs Example"}
        useCustom={(api: any, args?: any[]) => {}}
        akumadrawLib={akumadrawLib}
      >
        <Akumadraw />
      </App>
    </>
  );
};

export default AkumadrawWrapper;
