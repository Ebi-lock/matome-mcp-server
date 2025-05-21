#!/usr/bin/env node
import "dotenv/config";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const MATOME_API_BASE = "https://matome.ebi-generator.com/api/mcp";

const server = new Server(
  {
    name: "matome",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

type UrlListResponse = {
  list: [
    {
      type: string;
      url: string;
    }
  ];
};

type BASE_CONTENT = {
  content: {
    type: string;
    text: string;
  }[];
};

async function makeMatomeRequest() {
  try {
    const Url = `${MATOME_API_BASE}`;
    const UID = process.env.USER_ID;
    const response = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: UID }),
    });

    if (response.status !== 200) {
      return { content: [{ type: "text", text: "matome fetch Error!!" }] };
    } else {
      const result: UrlListResponse = await response.json();
      const resultlist: BASE_CONTENT = { content: [] };
      result.list.forEach((item) => {
        resultlist.content.push({ type: "text", text: item.url });
      });
      return resultlist;
    }
  } catch {
    return {
      content: [
        {
          type: "text",
          text: "matome url list is none",
        },
      ],
    };
  }
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_matome",
        description: "Get bookmark url for matome",
        inputSchema: {
          type: "object",
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === "get_matome") {
      const ar_Data = await makeMatomeRequest();
      return ar_Data;
    } else {
      return {
        content: [
          {
            type: "text",
            text: "Tool not found",
          },
        ],
      };
    }
  } catch {
    throw new Error("Tool not found");
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
