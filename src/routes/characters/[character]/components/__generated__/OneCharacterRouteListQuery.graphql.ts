/**
 * @generated SignedSource<<c1738d83382eb241414bd0dc5e56656d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type OneCharacterRouteListQuery$variables = {
  id: string;
};
export type OneCharacterRouteListQuery$data = {
  readonly character: {
    readonly created: string | null | undefined;
    readonly episode: ReadonlyArray<{
      readonly air_date: string | null | undefined;
      readonly created: string | null | undefined;
      readonly id: string | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined>;
    readonly id: string | null | undefined;
    readonly image: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type OneCharacterRouteListQuery = {
  response: OneCharacterRouteListQuery$data;
  variables: OneCharacterRouteListQuery$variables;
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
  "name": "created",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "character",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Episode",
        "kind": "LinkedField",
        "name": "episode",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "air_date",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
      (v1/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OneCharacterRouteListQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OneCharacterRouteListQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "3c766c294e95f5185f3faf1eddde31cd",
    "id": null,
    "metadata": {},
    "name": "OneCharacterRouteListQuery",
    "operationKind": "query",
    "text": "query OneCharacterRouteListQuery(\n  $id: ID!\n) {\n  character(id: $id) {\n    episode {\n      air_date\n      created\n      id\n      name\n    }\n    id\n    name\n    image\n    created\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e8faad220856e65b0cc14bf97cf4c65";

export default node;
