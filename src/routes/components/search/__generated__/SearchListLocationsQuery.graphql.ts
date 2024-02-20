/**
 * @generated SignedSource<<286a018abd6a78585c33dcce22c2e6c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SearchListLocationsQuery$variables = {
  name: string;
  page?: number | null | undefined;
};
export type SearchListLocationsQuery$data = {
  readonly characters: {
    readonly info: {
      readonly count: number | null | undefined;
      readonly next: number | null | undefined;
      readonly pages: number | null | undefined;
      readonly prev: number | null | undefined;
    } | null | undefined;
    readonly results: ReadonlyArray<{
      readonly id: string | null | undefined;
      readonly location: {
        readonly id: string | null | undefined;
        readonly name: string | null | undefined;
        readonly type: string | null | undefined;
      } | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly episodes: {
    readonly info: {
      readonly count: number | null | undefined;
      readonly next: number | null | undefined;
      readonly pages: number | null | undefined;
      readonly prev: number | null | undefined;
    } | null | undefined;
    readonly results: ReadonlyArray<{
      readonly air_date: string | null | undefined;
      readonly characters: ReadonlyArray<{
        readonly location: {
          readonly id: string | null | undefined;
          readonly name: string | null | undefined;
          readonly type: string | null | undefined;
        } | null | undefined;
      } | null | undefined>;
      readonly created: string | null | undefined;
      readonly id: string | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly locations: {
    readonly info: {
      readonly count: number | null | undefined;
      readonly next: number | null | undefined;
      readonly pages: number | null | undefined;
      readonly prev: number | null | undefined;
    } | null | undefined;
    readonly results: ReadonlyArray<{
      readonly id: string | null | undefined;
      readonly name: string | null | undefined;
      readonly type: string | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type SearchListLocationsQuery = {
  response: SearchListLocationsQuery$data;
  variables: SearchListLocationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "page"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  {
    "kind": "Variable",
    "name": "page",
    "variableName": "page"
  }
],
v2 = {
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": (v1/*: any*/),
  "concreteType": "Locations",
  "kind": "LinkedField",
  "name": "locations",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "results",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "location",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": (v1/*: any*/),
  "concreteType": "Characters",
  "kind": "LinkedField",
  "name": "characters",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "results",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        (v4/*: any*/),
        (v7/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "air_date",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchListLocationsQuery",
    "selections": [
      (v6/*: any*/),
      (v8/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Episodes",
        "kind": "LinkedField",
        "name": "episodes",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Episode",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchListLocationsQuery",
    "selections": [
      (v6/*: any*/),
      (v8/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Episodes",
        "kind": "LinkedField",
        "name": "episodes",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Episode",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "04262ebe34d1aaa954f3c7615fea5b2f",
    "id": null,
    "metadata": {},
    "name": "SearchListLocationsQuery",
    "operationKind": "query",
    "text": "query SearchListLocationsQuery(\n  $name: String!\n  $page: Int\n) {\n  locations(page: $page, filter: {name: $name}) {\n    info {\n      count\n      next\n      pages\n      prev\n    }\n    results {\n      id\n      name\n      type\n    }\n  }\n  characters(page: $page, filter: {name: $name}) {\n    info {\n      count\n      next\n      pages\n      prev\n    }\n    results {\n      id\n      name\n      location {\n        id\n        name\n        type\n      }\n    }\n  }\n  episodes(page: $page, filter: {name: $name}) {\n    info {\n      count\n      next\n      pages\n      prev\n    }\n    results {\n      id\n      name\n      created\n      air_date\n      characters {\n        location {\n          id\n          name\n          type\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7b9568a7c5748186ff5728ca6fbcde24";

export default node;
