import type { AkumadrawTextContainer } from "./types";

export const originalContainerCache: {
  [id: AkumadrawTextContainer["id"]]:
    | {
        height: AkumadrawTextContainer["height"];
      }
    | undefined;
} = {};

export const updateOriginalContainerCache = (
  id: AkumadrawTextContainer["id"],
  height: AkumadrawTextContainer["height"],
) => {
  const data =
    originalContainerCache[id] || (originalContainerCache[id] = { height });
  data.height = height;
  return data;
};

export const resetOriginalContainerCache = (
  id: AkumadrawTextContainer["id"],
) => {
  if (originalContainerCache[id]) {
    delete originalContainerCache[id];
  }
};

export const getOriginalContainerHeightFromCache = (
  id: AkumadrawTextContainer["id"],
) => {
  return originalContainerCache[id]?.height ?? null;
};
