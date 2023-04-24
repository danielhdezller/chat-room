import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@/config-provider/app-config.module';
import { normalize } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/ormconfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Typeorm App Configuration
    TypeOrmModule.forRoot(dataSourceOptions),
    // Configuration provider module
    AppConfigModule.forRootAsync(AppConfigModule, {
      useFactory: () => {
        return {
          envPath: normalize(`${__dirname}/../config.json`),
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
