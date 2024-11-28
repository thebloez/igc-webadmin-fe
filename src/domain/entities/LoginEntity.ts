/**
 * @file LoginEntity.ts
 * @description Contains interfaces related to user authentication and profile data
 */

import { IResponseEntity } from "./ResponseEntity";

/**
 * Interface representing the state of a user in the application.
 * @interface ILoginData
 * @since 1.0.0
 */
export interface ILoginData {
  /** Authentication token for the user */
  token: string;
  /** Expiration timestamp of the authentication token */
  expires_at: string;
}

/**
 * Interface representing user profile information.
 * @interface IProfileData
 * @since 1.0.0
 */
export interface IProfileData {
  /** Unique identifier for the user */
  id: number;
  /** Full name of the user */
  name: string;
  /** Email address of the user */
  email: string;
  /** Timestamp when email was verified, null if unverified */
  email_verified_at: any;
  /** Timestamp when the profile was created */
  created_at: string;
  /** Timestamp when the profile was last updated */
  updated_at: string;
}

/**
 * Interface representing the authentication form data.
 * @interface ILoginRequest
 * @since 1.0.0
 */
export interface ILoginRequest {
  /** Email address used for authentication */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Interface representing the response from login endpoint.
 * @interface ILoginResponse
 * @extends {IResponseEntity<ILoginData>}
 * @since 1.0.0
 * @see ILoginData
 * @see IResponseEntity
 */
export interface ILoginResponse extends IResponseEntity<ILoginData> {}

/**
 * Interface representing the response from profile endpoint.
 * @interface IProfileResponse
 * @extends {IResponseEntity<IProfileData>}
 * @since 1.0.0
 * @see IProfileData
 * @see IResponseEntity
 */
export interface IProfileResponse extends IResponseEntity<IProfileData> {}