/**
 * @generated SignedSource<<316b4cb4f04b2dc6767d927b49b8f73c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LocationsQuery$variables = Record<PropertyKey, never>;
export type LocationsQuery$data = {
  readonly locations: {
    readonly info: {
      readonly count: number | null | undefined;
      readonly next: number | null | undefined;
      readonly pages: number | null | undefined;
      readonly prev: number | null | undefined;
    } | null | undefined;
    readonly results: ReadonlyArray<{
      readonly created: string | null | undefined;
      readonly dimension: string | null | undefined;
      readonly id: string | null | undefined;
      readonly name: string | null | undefined;
      readonly residents: ReadonlyArray<{
        readonly id: string | null | undefined;
        readonly image: string | null | undefined;
        readonly name: string | null | undefined;
        readonly status: string | null | undefined;
      } | null | undefined>;
      readonly type: string | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type LocationsQuery = {
  response: LocationsQuery$data;
  variables: LocationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "page",
        "value": 1
      }
    ],
    "concreteType": "Locations",
    "kind": "LinkedField",
    "name": "locations",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Info",
        "kind": "LinkedField",
        "name": "info",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "count",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "next",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pages",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "prev",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "results",
        "plural": true,
        "selections": [
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
            "kind": "ScalarField",
            "name": "dimension",
            "storageKey": null
          },
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
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
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "locations(page:1)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LocationsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a0008ffbc0a52598652c71e03287c1b8",
    "id": null,
    "metadata": {},
    "name": "LocationsQuery",
    "operationKind": "query",
    "text": "query LocationsQuery {\n  locations(page: 1) {\n    info {\n      count\n      next\n      pages\n      prev\n    }\n    results {\n      created\n      dimension\n      id\n      name\n      type\n      residents {\n        id\n        name\n        status\n        image\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "92a2e6cb65a0d6373ea074815fcdb9c6";

export default node;
