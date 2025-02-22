/**
 * PayPal Server SDKLib
 *
 * This file was automatically generated by APIMATIC v3.0 ( https://www.apimatic.io ).
 */

import { isExpired, isValid } from './authentication';
import { OAuthToken } from './models/oAuthToken';
import { ClientInterface } from './clientInterface';
import { OAuthAuthorizationController } from './controllers/oAuthAuthorizationController';

export class ClientCredentialsAuthManager {
  private _oAuthClientId: string;
  private _oAuthClientSecret: string;
  private _oAuthClockSkew?: number;
  private _oAuthController: OAuthAuthorizationController;

  constructor(
    {
      oAuthClientId,
      oAuthClientSecret,
      oAuthClockSkew,
    }: {
      oAuthClientId: string;
      oAuthClientSecret: string;
      oAuthClockSkew?: number;
    },
    client: ClientInterface
  ) {
    this._oAuthClientId = oAuthClientId;
    this._oAuthClientSecret = oAuthClientSecret;
    this._oAuthClockSkew = oAuthClockSkew;
    this._oAuthController = new OAuthAuthorizationController(client);
  }

  public async updateToken(oAuthToken?: OAuthToken): Promise<OAuthToken> {
    if (!this.isValid(oAuthToken) || this.isExpired(oAuthToken)) {
      oAuthToken = await this.fetchToken();
    }
    return oAuthToken;
  }

  public isValid(oAuthToken: OAuthToken | undefined): oAuthToken is OAuthToken {
    return isValid(oAuthToken);
  }

  public isExpired(oAuthToken: OAuthToken) {
    return isExpired(oAuthToken, this._oAuthClockSkew);
  }

  public async fetchToken(
    scope?: string,
    additionalParams?: Record<string, unknown>
  ): Promise<OAuthToken> {
    const authorization = this.getClientBasicAuth(
      this._oAuthClientId,
      this._oAuthClientSecret
    );
    const { result } = await this._oAuthController.requestToken(
      {
        authorization: authorization,
        scope,
      },
      additionalParams
    );
    return this.setExpiry(result);
  }

  private getClientBasicAuth(clientId: string, clientSecret: string): string {
    return `Basic ${Buffer.from(clientId + ':' + clientSecret).toString(
      'base64'
    )}`;
  }

  private async setExpiry(token: OAuthToken) {
    const newToken = token;
    if (newToken.expiresIn) {
      newToken.expiry =
        BigInt(Math.round(Date.now() / 1000)) + newToken.expiresIn;
    }
    return newToken;
  }
}
