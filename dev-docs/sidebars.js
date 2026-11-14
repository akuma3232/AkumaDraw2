/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "Introduction",
      link: {
        type: "doc",
        id: "introduction/get-started",
      },
      items: ["introduction/development", "introduction/contributing"],
    },
    {
      type: "category",
      label: "Codebase",
      items: ["codebase/json-schema", "codebase/frames"],
    },
    {
      type: "category",
      label: "@akumadraw/akumadraw",
      collapsed: false,
      items: [
        "@akumadraw/akumadraw/installation",
        "@akumadraw/akumadraw/integration",
        "@akumadraw/akumadraw/customizing-styles",
        {
          type: "category",
          label: "API",
          link: {
            type: "doc",
            id: "@akumadraw/akumadraw/api/api-intro",
          },
          items: [
            {
              type: "category",
              label: "Props",
              link: {
                type: "doc",
                id: "@akumadraw/akumadraw/api/props/props",
              },
              items: [
                "@akumadraw/akumadraw/api/props/initialdata",
                "@akumadraw/akumadraw/api/props/akumadraw-api",
                "@akumadraw/akumadraw/api/props/render-props",
                "@akumadraw/akumadraw/api/props/ui-options",
              ],
            },
            {
              type: "category",
              label: "Children Components",
              link: {
                type: "doc",
                id: "@akumadraw/akumadraw/api/children-components/children-components-intro",
              },
              items: [
                "@akumadraw/akumadraw/api/children-components/main-menu",
                "@akumadraw/akumadraw/api/children-components/welcome-screen",
                "@akumadraw/akumadraw/api/children-components/sidebar",
                "@akumadraw/akumadraw/api/children-components/footer",
                "@akumadraw/akumadraw/api/children-components/live-collaboration-trigger",
              ],
            },
            {
              type: "category",
              label: "Utils",
              link: {
                type: "doc",
                id: "@akumadraw/akumadraw/api/utils/utils-intro",
              },
              items: [
                "@akumadraw/akumadraw/api/utils/export",
                "@akumadraw/akumadraw/api/utils/restore",
              ],
            },
            "@akumadraw/akumadraw/api/constants",
            "@akumadraw/akumadraw/api/akumadraw-element-skeleton",
          ],
        },
        "@akumadraw/akumadraw/faq",
        "@akumadraw/akumadraw/development",
      ],
    },
    {
      type: "category",
      label: "@excalidraw/mermaid-to-excalidraw",
      link: {
        type: "doc",
        id: "@excalidraw/mermaid-to-excalidraw/installation",
      },
      items: [
        "@excalidraw/mermaid-to-excalidraw/api",
        "@excalidraw/mermaid-to-excalidraw/development",
        {
          type: "category",
          label: "Codebase",
          link: {
            type: "doc",
            id: "@excalidraw/mermaid-to-excalidraw/codebase/codebase",
          },
          items: [
            {
              type: "category",
              label: "How Parser works under the hood?",
              link: {
                type: "doc",
                id: "@excalidraw/mermaid-to-excalidraw/codebase/parser/parser",
              },
              items: [
                "@excalidraw/mermaid-to-excalidraw/codebase/parser/flowchart",
              ],
            },
            "@excalidraw/mermaid-to-excalidraw/codebase/new-diagram-type",
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
