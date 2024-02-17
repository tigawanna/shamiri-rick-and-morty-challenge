/**
 * @generated SignedSource<<4d0c341dc26573c309190c17783310e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type OneLocationRouteComponentQuery$variables = {
  id: string;
};
export type OneLocationRouteComponentQuery$data = {
  readonly location: {
    readonly created: string | null | undefined;
    readonly id: string | null | undefined;
    readonly name: string | null | undefined;
    readonly residents: ReadonlyArray<{
      readonly id: string | null | undefined;
      readonly image: string | null | undefined;
      readonly name: string | null | undefined;
      readonly status: string | null | undefined;
    } | null | undefined>;
  } | null | undefined;
};
export type OneLocationRouteComponentQuery = {
  response: OneLocationRouteComponentQuery$data;
  variables: OneLocationRouteComponentQuery$variables;
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "location",
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
        "name": "residents",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "image",
            "storageKey": null
          },
          (v1/*: any*/),
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
    "name": "OneLocationRouteComponentQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OneLocationRouteComponentQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "9677c9436e538f49ca8de864f682c6b4",
    "id": null,
    "metadata": {},
    "name": "OneLocationRouteComponentQuery",
    "operationKind": "query",
    "text": "query OneLocationRouteComponentQuery(\n  $id: ID!\n) {\n  location(id: $id) {\n    name\n    id\n    created\n    residents {\n      id\n      image\n      name\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab8df6beb3c257fabeeaf09ec194cc4c";

export default node;
