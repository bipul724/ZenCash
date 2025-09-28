import { serve } from "inngest/next";
import arcjet, { detectBot, shield } from "@arcjet/next";

import { inngest } from "@/lib/inngest/client";
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/function";

// Create Arcjet protection for this API route
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

const handler = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
  ],
});

// Wrap the handler with Arcjet protection
export async function GET(request) {
  const decision = await aj.protect(request);
  
  if (decision.isDenied()) {
    return new Response("Access denied", { status: 403 });
  }

  return handler.GET(request);
}

export async function POST(request) {
  const decision = await aj.protect(request);
  
  if (decision.isDenied()) {
    return new Response("Access denied", { status: 403 });
  }

  return handler.POST(request);
}

export async function PUT(request) {
  const decision = await aj.protect(request);
  
  if (decision.isDenied()) {
    return new Response("Access denied", { status: 403 });
  }

  return handler.PUT(request);
}