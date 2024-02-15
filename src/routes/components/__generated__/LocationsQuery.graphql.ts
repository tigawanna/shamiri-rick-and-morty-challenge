/**
 * @generated SignedSource<<d518e2b947890fe55491c84df1353c28>>
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
    "cacheID": "10dc0266a42b430bc284a3ef58e3c6b5",
    "id": null,
    "metadata": {},
    "name": "LocationsQuery",
    "operationKind": "query",
    "text": "query LocationsQuery {\n  locations(page: 1) {\n    info {\n      count\n      next\n      pages\n      prev\n    }\n    results {\n      created\n      dimension\n      id\n      name\n      type\n      residents {\n        id\n        name\n        status\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0d73d001f68e22173f67aa8e5a247741";

export default node;
