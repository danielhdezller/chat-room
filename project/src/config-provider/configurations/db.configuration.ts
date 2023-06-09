import { IsString, IsNotEmpty, IsPort } from 'class-validator';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class DBConfiguration {
  /**
   * The DB Host.
   *
   * @type {string}
   * @memberof DBConfiguration
   */
  @IsString()
  @IsNotEmpty()
  readonly host: string;

  /**
   * The DB port.
   *
   * @type {string}
   * @memberof DBConfiguration
   */
  @IsPort()
  readonly port: string;

  /**
   * The DB user.
   *
   * @type {string}
   * @memberof DBConfiguration
   */
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  /**
   * The DB password.
   *
   * @type {string}
   * @memberof DBConfiguration
   */
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  /**
   * The database name.
   *
   * @type {string}
   * @memberof DBConfiguration
   */
  @IsString()
  @IsNotEmpty()
  readonly database: string;

  /**
   * Return the typeOrm config which should be used the app.
   *
   * @returns {*}
   * @memberof DBConfiguration
   */
  getTypeOrmConfig(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.host,
      port: parseInt(this.port),
      username: this.user,
      password: this.password,
      synchronize: false,
      database: this.database,
      migrations: ['dist/database/migrations/**/*.js'],
      entities: ['./**/*.entity.js'],
    };
  }

  /**
   * Return the typeOrm config which should be used the app in Testing Mode.
   *
   * @return {*}  {PostgresConnectionOptions}
   * @memberof DBConfiguration
   */
  getTypeOrmConfigForTest(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.host,
      port: parseInt(this.port),
      username: this.user,
      password: this.password,
      synchronize: false,
      database: this.database,
      migrations: ['dist/database/migrations/**/*.ts'],
      entities: ['./**/*.entity.ts'],
    };
  }
}
