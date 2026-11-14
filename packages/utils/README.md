# @akumadraw/utils

## Install

```bash
npm install @akumadraw/utils
```

If you prefer Yarn over npm, use this command to install the Akumadraw utils package:

```bash
yarn add @akumadraw/utils
```

## API

### `serializeAsJSON`

See [`serializeAsJSON`] for API and description.

### `exportToBlob` (async)

Export an Akumadraw diagram to a Blob.

### `exportToSvg`

Export an Akumadraw diagram to a SVGElement.

## Usage

Akumadraw utils is published as a UMD (Universal Module Definition). If you are using a module bundler (for instance, Webpack), you can import it as an ES6 module:

```js
import { exportToSvg, exportToBlob } from "@akumadraw/utils";
```

To use it in a browser directly:

```html
<script src=""></script>
<script>
  // AkumadrawUtils is a global variable defined by akumadraw.min.js
  const { exportToSvg, exportToBlob } = AkumadrawUtils;
</script>
```

Here's the `exportToBlob` and `exportToSvg` functions in action:

```js
const akumadrawDiagram = {
  type: "akumadraw",
  version: 2,
  source: "",
  elements: [
    {
      id: "vWrqOAfkind2qcm7LDAGZ",
      type: "ellipse",
      x: 414,
      y: 237,
      width: 214,
      height: 214,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "#15aabf",
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      roundness: null,
      seed: 1041657908,
      version: 120,
      versionNonce: 1188004276,
      isDeleted: false,
      boundElementIds: null,
    },
  ],
  appState: {
    viewBackgroundColor: "#ffffff",
    gridSize: null,
  },
};

// Export the Akumadraw diagram as SVG string
const svg = exportToSvg(akumadrawDiagram);
console.log(svg.outerHTML);

// Export the Akumadraw diagram as PNG Blob URL
(async  => {
  const blob = await exportToBlob({
    ...akumadrawDiagram,
    mimeType: "image/png",
  });

  const urlCreator = window.URL || window.webkitURL;
  console.log(urlCreator.createObjectURL(blob));
});
```
