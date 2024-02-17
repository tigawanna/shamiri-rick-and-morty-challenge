/**
 * @generated SignedSource<<3dec83e56edcecce04130b4b2e3adc94>>
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
    readonly id: string | null | undefined;
    readonly image: string | null | undefined;
    readonly name: string | null | undefined;
    readonly status: string | null | undefined;
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
v1 = [
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
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
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
        "name": "status",
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
    "name": "OneCharacterRouteComponentQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OneCharacterRouteComponentQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d149c46e8713c076f8daab0b4268ec08",
    "id": null,
    "metadata": {},
    "name": "OneCharacterRouteComponentQuery",
    "operationKind": "query",
    "text": "query OneCharacterRouteComponentQuery(\n  $id: ID!\n) {\n  character(id: $id) {\n    id\n    name\n    image\n    created\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "4150461e34122157aa0bf83ba6ecd79c";

export default node;
