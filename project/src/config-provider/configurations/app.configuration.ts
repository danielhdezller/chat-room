import { createHash } from 'crypto';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPort,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

import { cloneDeep } from 'lodash';
import { EnvironmentModes } from '../interfaces/app.interfaces';
import { DBConfiguration } from './db.configuration';
import { ApiConfiguration } from '@/config-provider/configurations/api.configuration';
import { ValidInstanceOf } from '@/shared/validators/valid-instance-of.validator';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

/**
 * This class represent the app configuration object.
 *
 * @export
 * @class AppConfig
 */
export class AppConfiguration {
  /**
   * The app name.
   *
   * @type {EnvironmentModes}
   * @memberof AppConfiguration
   */
  @IsString()
  @IsNotEmpty()
  public readonly appName: string;

  /**
   * The port where the application should be executed.
   *
   * @type {string}
   * @memberof AppConfiguration
   */
  @IsPort()
  public readonly appPort: string;

  /**
   * The mode of the app.
   *
   * @type {EnvironmentModes}
   * @memberof AppConfiguration
   */
  @IsString()
  @IsEnum(Object.values(EnvironmentModes))
  @IsNotEmpty()
  readonly mode: EnvironmentModes;

  /**
   * The app secret key, used to generate the rest of keys.
   *
   * @type {EnvironmentModes}
   * @memberof AppConfiguration
   */
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  private readonly appSecretKey: string;

  /**
   * The list of allowed cors domain (origin).
   *
   * @type {string[]}
   * @memberof AppConfiguration
   */
  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  public readonly corsDomains?: string[];

  /**
   * The duration of the session.
   *
   * @type {number}
   * @memberof AppConfiguration
   */
  @IsInt()
  @Min(1)
  sessionTTL: number;

  /**
   * The api configuration object.
   *
   * Contains some api configuration used by the api swagger.
   *
   * @type {ApiConfiguration}
   * @memberof ApiConfiguration
   */
  @ValidInstanceOf(ApiConfiguration)
  private readonly apiConfiguration: ApiConfiguration;

  /**
   * The db configuration object.
   *
   * Contains some db configuration values necessary to make the connection.
   *
   * @type {DBConfiguration}
   * @memberof AppConfiguration
   */
  @ValidInstanceOf(DBConfiguration)
  private readonly dbConfiguration: DBConfiguration;

  /**
   * Check if the configuration is in develop mode.
   *
   * @returns {boolean}
   * @memberof AppConfiguration
   */
  isMode(mode: EnvironmentModes): boolean {
    return this.mode == mode;
  }

  /**
   * Return the typeOrm config which should be used the app.
   *
   * @returns {*}
   * @memberof AppConfiguration
   */
  getTypeOrmConfig(mode: EnvironmentModes): PostgresConnectionOptions {
    if (mode === EnvironmentModes.Test) {
      return this.dbConfiguration.getTypeOrmConfigForTest();
    }
    return this.dbConfiguration.getTypeOrmConfig();
  }

  /**
   * Generate a custom context key using a master key and a context.
   *
   * @param {string} context The context of the key.
   * @returns {string} A key for this context.
   * @memberof AppConfiguration
   */
  getContextKey(context: string): string {
    const keyPayload = context + '_' + this.appSecretKey + '_' + context;

    const key = createHash('sha512')
      .update(keyPayload)
      .digest('hex')
      .toString();

    return key;
  }

  /**
   * Return the api config which should be used by the app.
   *
   * @returns {*}
   * @memberof AppConfiguration
   */
  getApiConfiguration(): ApiConfiguration {
    return cloneDeep(this.apiConfiguration);
  }
}
