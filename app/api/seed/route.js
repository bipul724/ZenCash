import arcjet, { detectBot, shield } from "@arcjet/next";
import { seedTransactions } from "@/actions/seed";

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

export async function GET(request) {
  // Apply Arcjet protection
  const decision = await aj.protect(request);
  
  if (decision.isDenied()) {
    return new Response("Access denied", { status: 403 });
  }

  const result = await seedTransactions();
  return Response.json(result);
}
