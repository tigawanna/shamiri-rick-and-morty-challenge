/**
 * @generated SignedSource<<43472b1243f02c83db042e69fd583223>>
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
        readonly residents: ReadonlyArray<{
          readonly id: string | null | undefined;
          readonly image: string | null | undefined;
          readonly name: string | null | undefined;
          readonly status: string | null | undefined;
        } | null | undefined>;
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
      readonly characters: ReadonlyArray<{
        readonly location: {
          readonly id: string | null | undefined;
          readonly name: string | null | undefined;
        } | null | undefined;
      } | null | undefined>;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly locations: {
    readonly results: ReadonlyArray<{
      readonly id: string | null | undefined;
      readonly name: string | null | undefined;
      readonly residents: ReadonlyArray<{
        readonly image: string | null | undefined;
        readonly name: string | null | undefined;
        readonly status: string | null | undefined;
      } | null | undefined>;
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v7 = {
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
v8 = {
  "alias": null,
  "args": (v1/*: any*/),
  "concreteType": "Characters",
  "kind": "LinkedField",
  "name": "characters",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "results",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Location",
          "kind": "LinkedField",
          "name": "location",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Character",
              "kind": "LinkedField",
              "name": "residents",
              "plural": true,
              "selections": [
                (v2/*: any*/),
                (v5/*: any*/),
                (v3/*: any*/),
                (v6/*: any*/)
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
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "location",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchListLocationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Locations",
        "kind": "LinkedField",
        "name": "locations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "residents",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v8/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Episodes",
        "kind": "LinkedField",
        "name": "episodes",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Episode",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v9/*: any*/)
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
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Locations",
        "kind": "LinkedField",
        "name": "locations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "residents",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v8/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Episodes",
        "kind": "LinkedField",
        "name": "episodes",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Episode",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v9/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0df71883f899c25c90366b5134a89510",
    "id": null,
    "metadata": {},
    "name": "SearchListLocationsQuery",
    "operationKind": "query",
    "text": "query SearchListLocationsQuery(\n  $name: String!\n  $page: Int\n) {\n  locations(page: $page, filter: {name: $name}) {\n    results {\n      id\n      name\n      type\n      residents {\n        image\n        name\n        status\n        id\n      }\n    }\n  }\n  characters(page: $page, filter: {name: $name}) {\n    info {\n      count\n      next\n      pages\n      prev\n    }\n    results {\n      id\n      name\n      location {\n        id\n        name\n        residents {\n          id\n          image\n          name\n          status\n        }\n      }\n    }\n  }\n  episodes(page: $page, filter: {name: $name}) {\n    info {\n      count\n      next\n      pages\n      prev\n    }\n    results {\n      characters {\n        location {\n          id\n          name\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "31c2db8fa2f10aaae8940cb7ecbbf31e";

export default node;
