# MCP Server for Matome Subscribers

This repository hosts the **MCP server for subscribers of the Matome service**.  
It enables context sharing and integration with external models via the Model Context Protocol (MCP).

---

## Overview

This server is exclusively provided for Matome subscribers.  
Subscribers can use the **UID issued by Matome** to share bookmarked URLs with MCP-compatible clients.

---

## Key Features

- Provides bookmarked URLs linked to a Matome UID
- Can be combined with browser search MCPs to create summaries of your bookmarks

---

## How to Use

1. Log in to Matome and obtain your UID for MCP integration.
2. Use the URL with your MCP-compatible client and set the UID as an environment variable.
3. Example configuration for Claude MCP client:

```claude_desktop_config.json
"matome": {
  "command": "npx",
  "args": ["matome-mcp-server"],
  "env": {
    "USER_ID": "{YOUR UID}"
  }
}
```

4. Integration with BraveAPI:

```claude_desktop_config.json
"brave-search": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-brave-search"],
  "env": {
    "BRAVE_API_KEY": "{YOUR API KEY}"
  }
}
```

5. Prompt for summarization:
   [matome で取得した url の内容をまとめて]

---

Notes

This service is available to anyone who knows a valid Matome UID.
The UID must be set to public: true in Matome to be used.
Even non-Matome users can retrieve data if they know someone’s public UID.

---

License

The contents of this repository are subject to the Matome service's terms of use.
