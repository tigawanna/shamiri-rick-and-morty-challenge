import {
  CacheConfig,
  RequestParameters,
  UploadableMap,
  Variables,
} from "relay-runtime";

const HTTP_ENDPOINT = "https://rickandmortyapi.com/graphql";

interface RelayFecherVars {
  request: RequestParameters;
  variables: Variables;
  cacheConfig: CacheConfig;
  uploadables?: UploadableMap | null | undefined;
}
interface RelayeFetcherFunctionArgs {
  fetchVars: RelayFecherVars;
  token?: string | null;
}
export async function fetchFn({
  fetchVars: { request, variables },
  token,
}: RelayeFetcherFunctionArgs) {
  try {
    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: request.text, // <-- The GraphQL document composed by Relay
        variables,
      }),
    });

    if (!resp.ok) {
      // If the response is not okay, then throw an error
      console.log(
        " ====== RELAY FETCHER STATUS TEXT ============== ",
        resp.statusText,
      );
      throw new Error(resp.statusText);
    }
    const json = await resp.json();
    // console.log(" ====== RELAY FETCHER JSON ============== ", json);
    // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
    // property of the response. If any exceptions occurred when processing the request,
    // throw an error to indicate to the developer what went wrong.
    if (Array.isArray(json.errors)) {
      throw new Error(
        `Error fetching GraphQL query '${
          request.name
        }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
          json.errors,
        )}`,
      );
    }
    return json;
  } catch (error) {
    console.log(" ====== RELAY FETCHER ERROR ============== ", error);
    throw error;
  }
}

export interface LocalViewer {
  login: string;
  name: string;
  avatarUrl: string;
  email: string;
}
