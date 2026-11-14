# Akumadraw

**Akumadraw** is exported as a React component that you can embed directly in your app.

## Installation

Install the package together with its React peer dependencies.

```bash
npm install react react-dom @akumadraw/akumadraw
# or
yarn add react react-dom @akumadraw/akumadraw
```

## Quick start

The minimum working setup has two easy-to-miss requirements:

1. Import the package CSS:

```ts
import "@akumadraw/akumadraw/index.css";
```

2. Render Akumadraw inside a container with a non-zero height.

```tsx
import { Akumadraw } from "@akumadraw/akumadraw";

export default function App {
  return (
    <div style={{ height: "500px" }}>
      <Akumadraw />
    </div>
  );
}
```
