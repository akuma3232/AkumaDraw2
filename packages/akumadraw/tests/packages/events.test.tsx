import React from "react";
import { vi } from "vitest";

import { resolvablePromise } from "@akumadraw/common";

import { Akumadraw, CaptureUpdateAction } from "../../index";
import { API } from "../helpers/api";
import { Pointer } from "../helpers/ui";
import { render, unmountComponent } from "../test-utils";

import type { AkumadrawImperativeAPI } from "../../types";

describe("event callbacks", () => {
  const h = window.h;

  let akumadrawAPI: AkumadrawImperativeAPI;

  const mouse = new Pointer("mouse");

  beforeEach(async () => {
    const akumadrawAPIPromise = resolvablePromise<AkumadrawImperativeAPI>();
    await render(
      <Akumadraw
        onAkumadrawAPI={(api) => akumadrawAPIPromise.resolve(api as any)}
      />,
    );
    akumadrawAPI = await akumadrawAPIPromise;
  });

  it("should resolve editor:mount/editor:initialize when subscribed before mount", async () => {
    unmountComponent();

    const lifecyclePromise = resolvablePromise<{
      api: AkumadrawImperativeAPI;
      mount: Promise<{
        akumadrawAPI: AkumadrawImperativeAPI;
        container: HTMLDivElement | null;
      }>;
      initialize: Promise<AkumadrawImperativeAPI>;
    }>();

    await render(
      <Akumadraw
        onAkumadrawAPI={(api) => {
          if (api) {
            lifecyclePromise.resolve({
              api,
              mount: api.onEvent("editor:mount"),
              initialize: api.onEvent("editor:initialize"),
            });
          }
        }}
      />,
    );

    const { api, mount, initialize } = await lifecyclePromise;
    await expect(mount).resolves.toEqual({
      akumadrawAPI: api,
      container: expect.any(HTMLDivElement),
    });
    await expect(initialize).resolves.toBe(api);
  });

  it("should replay editor:mount/editor:initialize to late subscribers", async () => {
    const onMount = vi.fn();
    const onInitialize = vi.fn();

    akumadrawAPI.onEvent("editor:mount", onMount);
    akumadrawAPI.onEvent("editor:initialize", onInitialize);

    await Promise.resolve();

    expect(onMount).toHaveBeenCalledTimes(1);
    expect(onMount).toHaveBeenCalledWith({
      akumadrawAPI,
      container: expect.any(HTMLDivElement),
    });
    expect(onInitialize).toHaveBeenCalledTimes(1);
    expect(onInitialize).toHaveBeenCalledWith(akumadrawAPI);

    await expect(akumadrawAPI.onEvent("editor:mount")).resolves.toEqual({
      akumadrawAPI,
      container: expect.any(HTMLDivElement),
    });
    await expect(akumadrawAPI.onEvent("editor:initialize")).resolves.toBe(
      akumadrawAPI,
    );
  });

  it("should call onMount before onInitialize props", async () => {
    unmountComponent();

    const calls: string[] = [];

    await render(
      <Akumadraw
        onMount={({ akumadrawAPI, container }) => {
          expect(akumadrawAPI).toBeDefined();
          expect(container).toBeInstanceOf(HTMLDivElement);
          calls.push("mount");
        }}
        onInitialize={() => {
          calls.push("initialize");
        }}
      />,
    );

    expect(calls).toEqual(["mount", "initialize"]);
  });

  it("should trigger onChange on render", async () => {
    const onChange = vi.fn();

    const origBackgroundColor = h.state.viewBackgroundColor;
    akumadrawAPI.onChange(onChange);
    API.updateScene({
      appState: { viewBackgroundColor: "red" },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    });
    expect(onChange).toHaveBeenCalledWith(
      // elements
      [],
      // appState
      expect.objectContaining({
        viewBackgroundColor: "red",
      }),
      // files
      {},
    );
    expect(onChange.mock?.lastCall?.[1].viewBackgroundColor).not.toBe(
      origBackgroundColor,
    );
  });

  it("should trigger onPointerDown/onPointerUp on canvas pointerDown/pointerUp", async () => {
    const onPointerDown = vi.fn();
    const onPointerUp = vi.fn();

    akumadrawAPI.onPointerDown(onPointerDown);
    akumadrawAPI.onPointerUp(onPointerUp);

    mouse.downAt(100);
    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPointerUp).not.toHaveBeenCalled();
    mouse.up();
    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPointerUp).toHaveBeenCalledTimes(1);
  });
});
