/**
 * @generated SignedSource<<35a57c75c40a594134b9f9f6bb7bfeff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type OneCharacterRouteComponentQuery$variables = {
  id: string;
};
export type OneCharacterRouteComponentQuery$data = {
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
export type OneCharacterRouteComponentQuery = {
  response: OneCharacterRouteComponentQuery$data;
  variables: OneCharacterRouteComponentQuery$variables;
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
    "name": "OneCharacterRouteComponentQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OneCharacterRouteComponentQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "8954bb8a54b1bf156f532060a2655067",
    "id": null,
    "metadata": {},
    "name": "OneCharacterRouteComponentQuery",
    "operationKind": "query",
    "text": "query OneCharacterRouteComponentQuery(\n  $id: ID!\n) {\n  character(id: $id) {\n    episode {\n      air_date\n      created\n      id\n      name\n    }\n    id\n    name\n    image\n    created\n  }\n}\n"
  }
};
})();

(node as any).hash = "00ba0bce53ff3fe959205568683b3b66";

export default node;
