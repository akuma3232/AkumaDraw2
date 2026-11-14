import { describe, expect, it, vi } from "vitest";

import { convertMermaidToAkumadraw } from "./common";

type ConvertMermaidArgs = Parameters<typeof convertMermaidToAkumadraw>[0];
type ParseMermaidToAkumadraw = Awaited<
  ConvertMermaidArgs["mermaidToAkumadrawLib"]["api"]
>["parseMermaidToAkumadraw"];

const createConvertArgs = (
  mermaidDefinition: string,
  parseMermaidToAkumadraw: ParseMermaidToAkumadraw,
): ConvertMermaidArgs => {
  const parent = document.createElement("div");
  const canvas = document.createElement("div");
  parent.appendChild(canvas);

  return {
    canvasRef: { current: canvas },
    mermaidToAkumadrawLib: {
      status: "loaded" as const,
      api: Promise.resolve({ parseMermaidToAkumadraw }),
    },
    mermaidDefinition,
    setError: vi.fn(),
    data: {
      current: {
        elements: [],
        files: null,
      },
    },
    theme: "light",
  };
};

describe("convertMermaidToAkumadraw", () => {
  it("returns the original parse error when quote-normalized fallback also fails", async () => {
    const originalError = new Error("Parse error on line 9: ...");
    const fallbackError = new Error("Parse error on line 6: ...");

    const parseMermaidToAkumadraw = vi
      .fn<ParseMermaidToAkumadraw>()
      .mockRejectedValueOnce(originalError)
      .mockRejectedValueOnce(fallbackError);

    const mermaidDefinition =
      'graph TD\nA["One"]\nB["Two"]x\nC["Three"]\nD["Four"]';

    const result = await convertMermaidToAkumadraw(
      createConvertArgs(mermaidDefinition, parseMermaidToAkumadraw),
    );

    expect(parseMermaidToAkumadraw).toHaveBeenCalledTimes(2);
    expect(parseMermaidToAkumadraw).toHaveBeenNthCalledWith(
      1,
      mermaidDefinition,
    );
    expect(parseMermaidToAkumadraw).toHaveBeenNthCalledWith(
      2,
      mermaidDefinition.replace(/"/g, "'"),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(originalError);
    }
  });

  it("does not retry quote normalization when the input has no double quotes", async () => {
    const originalError = new Error("Parse error on line 9: ...");
    const parseMermaidToAkumadraw = vi
      .fn<ParseMermaidToAkumadraw>()
      .mockRejectedValueOnce(originalError);

    const mermaidDefinition = "graph TD\nA[One]\nB[Two]x";

    const result = await convertMermaidToAkumadraw(
      createConvertArgs(mermaidDefinition, parseMermaidToAkumadraw),
    );

    expect(parseMermaidToAkumadraw).toHaveBeenCalledTimes(1);
    expect(parseMermaidToAkumadraw).toHaveBeenCalledWith(mermaidDefinition);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(originalError);
    }
  });
});
