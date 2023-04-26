import { Module } from '@nestjs/common';
import { AppConfigModule } from '@/config-provider/app-config.module';
import { normalize } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { AppConfiguration } from './config-provider/configurations/app.configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule.deferred()],
      inject: [AppConfiguration],
      useFactory: async (appConfiguration: AppConfiguration) => {
        return appConfiguration.getTypeOrmConfig(appConfiguration.mode);
      },
    }),
    // Configuration provider module
    AppConfigModule.forRootAsync(AppConfigModule, {
      useFactory: () => {
        return {
          envPath: normalize(`${__dirname}/../config.json`),
        };
      },
    }),
    UserModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
