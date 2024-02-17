/**
 * @generated SignedSource<<afa2d53c6066d05229a1a083c5642516>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type OneEpisodesRouteListQuery$variables = {
  id: string;
};
export type OneEpisodesRouteListQuery$data = {
  readonly episode: {
    readonly characters: ReadonlyArray<{
      readonly id: string | null | undefined;
      readonly image: string | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined>;
    readonly created: string | null | undefined;
    readonly id: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type OneEpisodesRouteListQuery = {
  response: OneEpisodesRouteListQuery$data;
  variables: OneEpisodesRouteListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Episode",
    "kind": "LinkedField",
    "name": "episode",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "created",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "characters",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "image",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OneEpisodesRouteListQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OneEpisodesRouteListQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3ede2ea8ed527920f8ae9deab8343eef",
    "id": null,
    "metadata": {},
    "name": "OneEpisodesRouteListQuery",
    "operationKind": "query",
    "text": "query OneEpisodesRouteListQuery(\n  $id: ID!\n) {\n  episode(id: $id) {\n    id\n    name\n    created\n    characters {\n      id\n      image\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2836ec982d56771733a3255c53f44b1e";

export default node;
