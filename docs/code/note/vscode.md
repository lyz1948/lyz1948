---
title: Vscode snippets
sidebarDepth: 2
sidebar: auto
---

首选项 => 代码片段 => markdown.json 做一下简单配置

```js
{
  "Markdown-Title": {
    "prefix": "mt",
    "body": [
      "---"
      "title: $1"
      "sidebarDepth: 2"
      "sidebar: auto"
      "---"

      "$2"
    ],
    "description": "Markdown-Title"
  }
}
```

在settings里，添加下面的代码

```js
"[markdown]": {
  "editor.wordWrap": "on",
  "editor.quickSuggestions": true
}
```