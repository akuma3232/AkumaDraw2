import { ROUNDNESS, assertNever } from "@akumadraw/common";

import { pointsEqual } from "@akumadraw/math";

import type { ElementOrToolType } from "@akumadraw/akumadraw/types";

import type { MarkNonNullable } from "@akumadraw/common/utility-types";

import type {
  AkumadrawElement,
  AkumadrawTextElement,
  AkumadrawEmbeddableElement,
  AkumadrawLinearElement,
  AkumadrawBindableElement,
  AkumadrawFreeDrawElement,
  InitializedAkumadrawImageElement,
  AkumadrawImageElement,
  AkumadrawTextElementWithContainer,
  AkumadrawTextContainer,
  AkumadrawFrameElement,
  RoundnessType,
  AkumadrawFrameLikeElement,
  AkumadrawElementType,
  AkumadrawIframeElement,
  AkumadrawIframeLikeElement,
  AkumadrawMagicFrameElement,
  AkumadrawArrowElement,
  AkumadrawElbowArrowElement,
  AkumadrawLineElement,
  AkumadrawFlowchartNodeElement,
  AkumadrawLinearElementSubType,
  AkumadrawStickyNoteElement,
} from "./types";

export const isInitializedImageElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & InitializedAkumadrawImageElement => {
  return !!element && element.type === "image" && !!element.fileId;
};

export const isImageElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawImageElement => {
  return !!element && element.type === "image";
};

export const isEmbeddableElement = <T extends AkumadrawElement>(
  element: T | null | undefined,
): element is T & AkumadrawEmbeddableElement => {
  return !!element && element.type === "embeddable";
};

export const isIframeElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawIframeElement => {
  return !!element && element.type === "iframe";
};

export const isIframeLikeElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawIframeLikeElement => {
  return (
    !!element && (element.type === "iframe" || element.type === "embeddable")
  );
};

export const isTextElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawTextElement => {
  return element != null && element.type === "text";
};

export const isStickyNoteElement = <T extends AkumadrawElement>(
  element: T | null | undefined,
): element is T & AkumadrawStickyNoteElement => {
  return element != null && element.type === "stickynote";
};

export const isFrameElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawFrameElement => {
  return element != null && element.type === "frame";
};

export const isMagicFrameElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawMagicFrameElement => {
  return element != null && element.type === "magicframe";
};

export const isFrameLikeElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawFrameLikeElement => {
  return (
    element != null &&
    (element.type === "frame" || element.type === "magicframe")
  );
};

export const isFreeDrawElement = <T extends AkumadrawElement>(
  element?: T | null,
): element is T & AkumadrawFreeDrawElement => {
  return element != null && isFreeDrawElementType(element.type);
};

export const isFreeDrawElementType = (
  elementType: AkumadrawElementType,
): boolean => {
  return elementType === "freedraw";
};

export const isLinearElement = <T extends AkumadrawElement>(
  element?: T | null,
): element is T & AkumadrawLinearElement => {
  return element != null && isLinearElementType(element.type);
};

export const isLineElement = <T extends AkumadrawElement>(
  element?: T | null,
): element is T & AkumadrawLineElement => {
  return element != null && element.type === "line";
};

export const isArrowElement = <T extends AkumadrawElement>(
  element?: T | null,
): element is T & AkumadrawArrowElement => {
  return element != null && element.type === "arrow";
};

export const isElbowArrow = <T extends AkumadrawElement>(
  element?: T,
): element is T & AkumadrawElbowArrowElement => {
  return isArrowElement(element) && element.elbowed;
};

/**
 * sharp or curved arrow, but not elbow
 */
export const isSimpleArrow = <T extends AkumadrawElement>(
  element?: T,
): element is T & AkumadrawArrowElement => {
  return isArrowElement(element) && !element.elbowed;
};

export const isSharpArrow = <T extends AkumadrawElement>(
  element?: T,
): element is T & AkumadrawArrowElement => {
  return isArrowElement(element) && !element.elbowed && !element.roundness;
};

export const isCurvedArrow = <T extends AkumadrawElement>(
  element?: T,
): element is T & AkumadrawArrowElement => {
  return (
    isArrowElement(element) && !element.elbowed && element.roundness !== null
  );
};

export const isLinearElementType = (
  elementType: ElementOrToolType,
): boolean => {
  return (
    elementType === "arrow" || elementType === "line" // || elementType === "freedraw"
  );
};

export const isBindingElement = <T extends AkumadrawElement>(
  element?: T | null,
  includeLocked = true,
): element is T & AkumadrawArrowElement => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    isBindingElementType(element.type)
  );
};

export const isBindingElementType = (
  elementType: ElementOrToolType,
): boolean => {
  return elementType === "arrow";
};

export const isBindableElement = <T extends AkumadrawElement>(
  element: T | null | undefined,
  includeLocked = true,
): element is T & AkumadrawBindableElement => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "diamond" ||
      element.type === "ellipse" ||
      element.type === "image" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      (element.type === "text" && !element.containerId))
  );
};

export const isRectanguloidElement = <T extends AkumadrawElement>(
  element?: T | null,
): element is T & AkumadrawBindableElement => {
  return (
    element != null &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "diamond" ||
      element.type === "image" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      (element.type === "text" && !element.containerId))
  );
};

// TODO: Remove this when proper distance calculation is introduced
// @see binding.ts:distanceToBindableElement()
export const isRectangularElement = <T extends AkumadrawElement>(
  element?: T | null,
): element is T & AkumadrawBindableElement => {
  return (
    element != null &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "image" ||
      element.type === "text" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      element.type === "freedraw")
  );
};

export const isTextBindableContainer = <T extends AkumadrawElement>(
  element: T | null,
  includeLocked = true,
): element is T & AkumadrawTextContainer => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "diamond" ||
      element.type === "ellipse" ||
      isArrowElement(element))
  );
};

export const isAkumadrawElement = (
  element: any,
): element is AkumadrawElement => {
  const type: AkumadrawElementType | undefined = element?.type;
  if (!type) {
    return false;
  }
  switch (type) {
    case "text":
    case "diamond":
    case "rectangle":
    case "stickynote":
    case "iframe":
    case "embeddable":
    case "ellipse":
    case "arrow":
    case "freedraw":
    case "line":
    case "frame":
    case "magicframe":
    case "image":
    case "selection": {
      return true;
    }
    default: {
      assertNever(type, null);
      return false;
    }
  }
};

export const isFlowchartNodeElement = <T extends AkumadrawElement>(
  element: T,
): element is T & AkumadrawFlowchartNodeElement => {
  return (
    element.type === "rectangle" ||
    element.type === "stickynote" ||
    element.type === "ellipse" ||
    element.type === "diamond"
  );
};

export const hasBoundTextElement = <T extends AkumadrawElement>(
  element: T | null,
): element is T &
  MarkNonNullable<AkumadrawBindableElement, "boundElements"> => {
  return (
    isTextBindableContainer(element) &&
    !!element.boundElements?.some(({ type }) => type === "text")
  );
};

export const isBoundToContainer = <T extends AkumadrawElement>(
  element: T | null,
): element is T & AkumadrawTextElementWithContainer => {
  return (
    element !== null &&
    "containerId" in element &&
    element.containerId !== null &&
    isTextElement(element)
  );
};

export const isArrowBoundToElement = (element: AkumadrawArrowElement) => {
  return !!element.startBinding || !!element.endBinding;
};

export const isUsingAdaptiveRadius = (type: string) =>
  type === "rectangle" ||
  type === "embeddable" ||
  type === "iframe" ||
  type === "image";

export const isUsingProportionalRadius = (type: string) =>
  type === "line" ||
  type === "arrow" ||
  type === "diamond" ||
  type === "stickynote";

export const canApplyRoundnessTypeToElement = (
  roundnessType: RoundnessType,
  element: AkumadrawElement,
) => {
  if (
    (roundnessType === ROUNDNESS.ADAPTIVE_RADIUS ||
      // if legacy roundness, it can be applied to elements that currently
      // use adaptive radius
      roundnessType === ROUNDNESS.LEGACY) &&
    isUsingAdaptiveRadius(element.type)
  ) {
    return true;
  }
  if (
    roundnessType === ROUNDNESS.PROPORTIONAL_RADIUS &&
    isUsingProportionalRadius(element.type)
  ) {
    return true;
  }

  return false;
};

export const getDefaultRoundnessTypeForElement = (
  element: AkumadrawElement,
) => {
  if (isUsingProportionalRadius(element.type)) {
    return {
      type: ROUNDNESS.PROPORTIONAL_RADIUS,
    };
  }

  if (isUsingAdaptiveRadius(element.type)) {
    return {
      type: ROUNDNESS.ADAPTIVE_RADIUS,
    };
  }

  return null;
};

export const getLinearElementSubType = (
  element: AkumadrawLinearElement,
): AkumadrawLinearElementSubType => {
  if (isSharpArrow(element)) {
    return "sharpArrow";
  }
  if (isCurvedArrow(element)) {
    return "curvedArrow";
  }
  if (isElbowArrow(element)) {
    return "elbowArrow";
  }
  return "line";
};

/**
 * Checks if current element points meet all the conditions for polygon=true
 * (this isn't a element type check, for that use isLineElement).
 *
 * If you want to check if points *can* be turned into a polygon, use
 *  canBecomePolygon(points).
 */
export const isValidPolygon = (
  points: AkumadrawLineElement["points"],
): boolean => {
  return points.length > 3 && pointsEqual(points[0], points[points.length - 1]);
};

export const canBecomePolygon = (
  points: AkumadrawLineElement["points"],
): boolean => {
  return (
    points.length > 3 ||
    // 3-point polygons can't have all points in a single line
    (points.length === 3 && !pointsEqual(points[0], points[points.length - 1]))
  );
};

export const isEligibleFrameChildType = (type: ElementOrToolType) => {
  switch (type) {
    case "rectangle":
    case "stickynote":
    case "diamond":
    case "ellipse":
    case "arrow":
    case "line":
    case "freedraw":
    case "text":
    case "image":
    case "frame":
    case "embeddable": {
      return true;
    }
    default: {
      return false;
    }
  }
};
