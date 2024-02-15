/* eslint-disable no-var */
import { startClient } from "rakkasjs/client";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/relay/modules";
import { fetchFn } from "./lib/relay/RelayEnvironment";
import { PocketBaseClient } from "./lib/pb/client";
import PocketBase from "pocketbase";

const relay_data_from_server = (window as any)?.__RELAY_DATA__;

function createRelayEnvironment() {
  return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
      }),
    ),
    store: new Store(RecordSource.create(relay_data_from_server)),
    isServer: false,
  });
}
export const clientRelayEnvironment = createRelayEnvironment();

startClient({
  hooks: {
    beforeStart() {
      // Do something before starting the client
    },

    wrapApp(app) {
      return (
        <RelayEnvironmentProvider environment={clientRelayEnvironment}>
          {app}
        </RelayEnvironmentProvider>
      );
    },

    extendPageContext(ctx) {
      if (!ctx.locals.pb) {
        ctx.locals.pb = new PocketBase(
          import.meta.env.RAKKAS_PB_URL,
        ) as PocketBaseClient;
        ctx.locals.pb?.authStore.onChange(() => {
          ctx.requestContext?.setCookie?.(
            "set-cookie",
            ctx.locals.pb?.authStore.exportToCookie(),
          );
        });
      }
    },
  },
});
