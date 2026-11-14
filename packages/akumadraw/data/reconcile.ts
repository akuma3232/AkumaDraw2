import throttle from "lodash.throttle";

import { arrayToMap, isDevEnv, isTestEnv } from "@akumadraw/common";

import {
  orderByFractionalIndex,
  syncInvalidIndices,
  validateFractionalIndices,
} from "@akumadraw/element";

import type { OrderedAkumadrawElement } from "@akumadraw/element/types";

import type { MakeBrand } from "@akumadraw/common/utility-types";

import type { AppState } from "../types";

export type ReconciledAkumadrawElement = OrderedAkumadrawElement &
  MakeBrand<"ReconciledElement">;

export type RemoteAkumadrawElement = OrderedAkumadrawElement &
  MakeBrand<"RemoteAkumadrawElement">;

export const shouldDiscardRemoteElement = (
  localAppState: AppState,
  local: OrderedAkumadrawElement | undefined,
  remote: RemoteAkumadrawElement,
): boolean => {
  if (
    local &&
    // local element is being edited
    (local.id === localAppState.editingTextElement?.id ||
      local.id === localAppState.resizingElement?.id ||
      local.id === localAppState.newElement?.id ||
      // local element is newer
      local.version > remote.version ||
      // resolve conflicting edits deterministically by taking the one with
      // the lowest versionNonce
      (local.version === remote.version &&
        local.versionNonce <= remote.versionNonce))
  ) {
    return true;
  }
  return false;
};

const validateIndicesThrottled = throttle(
  (
    orderedElements: readonly OrderedAkumadrawElement[],
    localElements: readonly OrderedAkumadrawElement[],
    remoteElements: readonly RemoteAkumadrawElement[],
  ) => {
    if (isDevEnv() || isTestEnv() || window?.DEBUG_FRACTIONAL_INDICES) {
      // create new instances due to the mutation
      const elements = syncInvalidIndices(
        orderedElements.map((x) => ({ ...x })),
      );

      validateFractionalIndices(elements, {
        // throw in dev & test only, to remain functional on `DEBUG_FRACTIONAL_INDICES`
        shouldThrow: isTestEnv() || isDevEnv(),
        includeBoundTextValidation: true,
        reconciliationContext: {
          localElements,
          remoteElements,
        },
      });
    }
  },
  1000 * 60,
  { leading: true, trailing: false },
);

export const reconcileElements = (
  localElements: readonly OrderedAkumadrawElement[],
  remoteElements: readonly RemoteAkumadrawElement[],
  localAppState: AppState,
): ReconciledAkumadrawElement[] => {
  const localElementsMap = arrayToMap(localElements);
  const reconciledElements: OrderedAkumadrawElement[] = [];
  const added = new Set<string>();

  // process remote elements
  for (const remoteElement of remoteElements) {
    if (!added.has(remoteElement.id)) {
      const localElement = localElementsMap.get(remoteElement.id);
      const discardRemoteElement = shouldDiscardRemoteElement(
        localAppState,
        localElement,
        remoteElement,
      );

      if (localElement && discardRemoteElement) {
        reconciledElements.push(localElement);
        added.add(localElement.id);
      } else {
        reconciledElements.push(remoteElement);
        added.add(remoteElement.id);
      }
    }
  }

  // process remaining local elements
  for (const localElement of localElements) {
    if (!added.has(localElement.id)) {
      reconciledElements.push(localElement);
      added.add(localElement.id);
    }
  }

  const orderedElements = orderByFractionalIndex(reconciledElements);

  validateIndicesThrottled(orderedElements, localElements, remoteElements);

  // de-duplicate indices
  syncInvalidIndices(orderedElements);

  return orderedElements as ReconciledAkumadrawElement[];
};
