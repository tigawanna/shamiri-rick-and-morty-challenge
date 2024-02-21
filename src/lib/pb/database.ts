/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
  /**
   * 15 characters string to store as record ID.
   */
  id: string;
  /**
   * Date string representation for the creation date.
   */
  created: string;
  /**
   * Date string representation for the creation date.
   */
  updated: string;
  /**
   * The collection id.
   */
  collectionId: string;
  /**
   * The collection name.
   */
  collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
  /**
   * 15 characters string to store as record ID.
   * If not set, it will be auto generated.
   */
  id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
  /**
   * The username of the auth record.
   */
  username: string;
  /**
   * Auth record email address.
   */
  email: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility: boolean;
  /**
   * Indicates whether the auth record is verified or not.
   */
  verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
  /**
   * The username of the auth record.
   * If not set, it will be auto generated.
   */
  username?: string;
  /**
   * Auth record email address.
   */
  email?: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility?: boolean;
  /**
   * Auth record password.
   */
  password: string;
  /**
   * Auth record password confirmation.
   */
  passwordConfirm: string;
  /**
   * Indicates whether the auth record is verified or not.
   * This field can be set only by admins or auth records with "Manage" access.
   */
  verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
  /**
   * The username of the auth record.
   */
  username?: string;
  /**
   * The auth record email address.
   * This field can be updated only by admins or auth records with "Manage" access.
   * Regular accounts can update their email by calling "Request email change".
   */
  email?: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility?: boolean;
  /**
   * Old auth record password.
   * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
   */
  oldPassword?: string;
  /**
   * New auth record password.
   */
  password?: string;
  /**
   * New auth record password confirmation.
   */
  passwordConfirm?: string;
  /**
   * Indicates whether the auth record is verified or not.
   * This field can be set only by admins or auth records with "Manage" access.
   */
  verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
  id: string;
}

// utilities

type MaybeArray<T> = T | T[];



// ===== shamiri_rick_and_morty_notes =====

export interface ShamiriRickAndMortyNotesResponse extends BaseCollectionResponse {
  collectionName: "shamiri_rick_and_morty_notes";
  character_name: string;
  character_id: string;
  user: string;
  note: string;
  status: "hidden" | "visible";
}

export interface ShamiriRickAndMortyNotesCreate extends BaseCollectionCreate {
  character_name: string;
  character_id: string;
  user: string;
  note: string;
  status: "hidden" | "visible";
}

export interface ShamiriRickAndMortyNotesUpdate extends BaseCollectionUpdate {
  character_name?: string;
  character_id?: string;
  user?: string;
  note?: string;
  status?:"hidden"|"visible"
}

export interface ShamiriRickAndMortyNotesCollection {
  type: "base";
  collectionId: string;
  collectionName: "shamiri_rick_and_morty_notes";
  response: ShamiriRickAndMortyNotesResponse;
  create: ShamiriRickAndMortyNotesCreate;
  update: ShamiriRickAndMortyNotesUpdate;
  relations: {
    user: ShamiriUsersCollection;
  };
}

// ===== shamiri_users =====

export interface ShamiriUsersResponse extends AuthCollectionResponse {
  collectionName: "shamiri_users";
  avatarUrl: string;
}

export interface ShamiriUsersCreate extends AuthCollectionCreate {
  avatarUrl?: string;
}

export interface ShamiriUsersUpdate extends AuthCollectionUpdate {
  avatarUrl?: string;
}

export interface ShamiriUsersCollection {
  type: "auth";
  collectionId: string;
  collectionName: "shamiri_users";
  response: ShamiriUsersResponse;
  create: ShamiriUsersCreate;
  update: ShamiriUsersUpdate;
  relations: {
    "shamiri_rick_and_morty_notes(user)": ShamiriRickAndMortyNotesCollection[];
  };
}

// ===== Schema =====

export type Schema = {

  shamiri_rick_and_morty_notes: ShamiriRickAndMortyNotesCollection;
  shamiri_users: ShamiriUsersCollection;
};
