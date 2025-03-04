/**
 * PayPal Server SDKLib
 *
 * This file was automatically generated by APIMATIC v3.0 ( https://www.apimatic.io ).
 */

import { Schema, stringEnum } from '../schema';

/**
 * Enum for LinkHttpMethod
 */
export enum LinkHttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Head = 'HEAD',
  Connect = 'CONNECT',
  Options = 'OPTIONS',
  Patch = 'PATCH',
}

/**
 * Schema for LinkHttpMethod
 */
export const linkHttpMethodSchema: Schema<LinkHttpMethod> = stringEnum(
  LinkHttpMethod,
  true
);
