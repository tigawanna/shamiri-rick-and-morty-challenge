import { createRequestHandler } from "rakkasjs/server";
import { cookie } from "@hattip/cookie";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/relay/modules";
import { fetchFn } from "./lib/relay/RelayEnvironment";
import { RequestContext } from "rakkasjs";
import { PocketBaseClient } from "./lib/pb/client";
import PocketBase from "pocketbase";
function createRelayEnvironment(ctx: RequestContext) {
   return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables }
      }),
    ),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}

function pocketbaseMiddleware(ctx: RequestContext) {
  ctx.locals.pb = new PocketBase(
    import.meta.env.RAKKAS_PB_URL,
  ) as PocketBaseClient;
  // load the store data from the request cookie string
  ctx.locals.pb.authStore.loadFromCookie(
    ctx.request.headers.get("cookie") || "",
  );
}

export default createRequestHandler({
  middleware: {
    beforePages: [],
    beforeApiRoutes: [],
    beforeNotFound: [],
    beforeAll: [cookie(), pocketbaseMiddleware],
  },

  createPageHooks(requestContext) {
    const serverRelayEnvironment = createRelayEnvironment(requestContext);
    return {
      emitToDocumentHead() {
        const cookie_theme = requestContext?.cookie?.theme;
        const relay_data = serverRelayEnvironment
          ?.getStore()
          ?.getSource()
          ?.toJSON();
        return `
    <link rel="icon" type="image/svg+xml" href="/site.svg" />
    <link rel="manifest" href="manifest.json" />
    <script>
      (function() {
        document.documentElement.setAttribute("data-theme", "${cookie_theme}");
      })();
     </script>
     <script>__RELAY_DATA__=${JSON.stringify(relay_data)}</script>

  `;
      },

      async extendPageContext(pageContext) {
        const request = pageContext.requestContext?.request;
        if (!request) return;

        if (!pageContext.locals.pb) {
          pageContext.locals.pb = new PocketBase(
            import.meta.env.RAKKAS_PB_URL,
          ) as PocketBaseClient;
          // load the store data from the request cookie string
          pageContext.locals.pb.authStore.loadFromCookie(
            request.headers.get("cookie") || "",
          );
        }
        try {
          if (pageContext.locals.pb.authStore.isValid) {
            const user = pageContext?.locals?.pb;
            pageContext.queryClient.setQueryData(
              "user",
              user?.authStore?.model,
            );
            // console.log("===VALID USER , UPDATING POCKETBASE USER= ===");
          } else {
            // console.log("====INVALID USER , LOGGING OUT POCKETBASE= ===");
            pageContext.locals.pb.authStore.clear();
            pageContext.queryClient.setQueryData("user", null);
          }
        } catch (_) {
          // clear the auth store on failed refresh
          pageContext.locals.pb.authStore.clear();
        }
      },

      wrapApp(app) {
        return (
          <RelayEnvironmentProvider environment={serverRelayEnvironment}>
            {app}
          </RelayEnvironmentProvider>
        );
      },
    };
  },
});
