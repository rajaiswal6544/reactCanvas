import { delay, http, HttpResponse } from "msw";
import { mockApps, mockGraphs } from "./data";

let shouldFailNextRequest = false;
let randomFailuresEnabled = false;

function shouldFail() {
  if (shouldFailNextRequest) {
    shouldFailNextRequest = false;
    return true;
  }

  return randomFailuresEnabled && Math.random() < 0.25;
}

export const handlers = [
  http.get("/apps", async () => {
    await delay(650);

    if (shouldFail()) {
      return HttpResponse.json({ message: "Mock API could not load apps." }, { status: 500 });
    }

    return HttpResponse.json(mockApps);
  }),

  http.get("/apps/:appId/graph", async ({ params }) => {
    await delay(850);

    if (shouldFail()) {
      return HttpResponse.json({ message: "Mock API could not load graph." }, { status: 500 });
    }

    const appId = String(params.appId);
    const graph = mockGraphs[appId];

    if (!graph) {
      return HttpResponse.json({ message: "Graph not found." }, { status: 404 });
    }

    return HttpResponse.json(graph);
  }),

  http.post("/mock-api/fail-next", () => {
    shouldFailNextRequest = true;
    return HttpResponse.json({ shouldFailNextRequest });
  }),

  http.post("/mock-api/random-failures", async ({ request }) => {
    const body = (await request.json()) as { enabled?: boolean };
    randomFailuresEnabled = Boolean(body.enabled);
    return HttpResponse.json({ randomFailuresEnabled });
  }),
];
