/**
 * @generated SignedSource<<b5156128a6a7bf1d21e0a429c8f3d3dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type OneEpisodeRouteComponentQuery$variables = {
  id: string;
};
export type OneEpisodeRouteComponentQuery$data = {
  readonly episode: {
    readonly characters: ReadonlyArray<{
      readonly id: string | null | undefined;
      readonly image: string | null | undefined;
      readonly name: string | null | undefined;
      readonly status: string | null | undefined;
    } | null | undefined>;
    readonly created: string | null | undefined;
    readonly id: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type OneEpisodeRouteComponentQuery = {
  response: OneEpisodeRouteComponentQuery$data;
  variables: OneEpisodeRouteComponentQuery$variables;
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          }
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
    "name": "OneEpisodeRouteComponentQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OneEpisodeRouteComponentQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "b9b5401620a5264d6fe622de0abec037",
    "id": null,
    "metadata": {},
    "name": "OneEpisodeRouteComponentQuery",
    "operationKind": "query",
    "text": "query OneEpisodeRouteComponentQuery(\n  $id: ID!\n) {\n  episode(id: $id) {\n    id\n    name\n    created\n    characters {\n      id\n      image\n      name\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b1091a26bc255185a1c1ec53e3a661ba";

export default node;
