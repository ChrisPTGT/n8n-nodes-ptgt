# PostThat -> GetThis (PTGT) Nodes

Official n8n community node package for the PostThat -> GetThis API.

## Included Node

- **PTGT**: Single node with resources grouped by service area.

Resources:
- Base64
- CSV Tools
- Hex Tools
- HTML Tools
- JSON Tools
- KV
- OCR Tools
- PDF Tools
- Percent Tools
- Text Tools
- URL Tools
- Utilities

## Credentials

Create **PTGT API** credentials with your API key and (optionally) a custom base URL.

## Issues

Report bugs and feature requests at:
https://github.com/ChrisPTGT/n8n-nodes-ptgt/issues

## Development

```bash
npm install
npm run dev
```

## Install in n8n Cloud

1. Open your n8n Cloud workspace.
2. Open the node picker (press `A` or click `+`).
3. Scroll to the bottom and click **Install community node**.
4. Enter `@postthatgetthis/n8n-nodes-ptgt` and confirm.
5. Reload the editor.

## Install in self-hosted n8n

1. Set `N8N_COMMUNITY_PACKAGES_ENABLED=true` in your environment.
2. In n8n, go to **Settings → Community Nodes** and click **Install**.
3. Enter `@postthatgetthis/n8n-nodes-ptgt` and confirm.
4. Restart n8n if prompted.

## Build

```bash
npm run build
```
