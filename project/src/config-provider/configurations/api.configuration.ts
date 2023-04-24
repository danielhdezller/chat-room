import { IsString, IsNotEmpty } from 'class-validator';

export class ApiConfiguration {
  /**
   * A flag that indicates if the credentials should be ignore when a user access to api docs.
   *
   * @type {boolean}
   * @memberof ApiConfiguration
   */
  readonly ignoreCredentials?: boolean;

  /**
   * The api Auth user.
   *
   * @type {string}
   * @memberof ApiConfiguration
   */
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  /**
   * The api password.
   *
   * @type {string}
   * @memberof ApiConfiguration
   */
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
