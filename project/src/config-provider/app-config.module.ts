import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';

import { Module } from '@nestjs/common';
import { ConfigProviderService } from './services/config-provider.service';
import { AppConfiguration } from '@/config-provider/configurations/app.configuration';
import { ConfigurationProviderOptions } from '@/config-provider/interfaces/app.interfaces';

@Module({})
export class AppConfigModule extends createConfigurableDynamicRootModule<
  AppConfigModule,
  ConfigurationProviderOptions
>(ConfigurationProviderOptions, {
  providers: [
    {
      provide: AppConfiguration,
      inject: [ConfigurationProviderOptions],
      useFactory: async (
        configurationProviderOptions: ConfigurationProviderOptions,
      ) => {
        const configProviderService = new ConfigProviderService(
          configurationProviderOptions,
        );
        await configProviderService.init();
        return configProviderService.getAppConfiguration();
      },
    },
  ],
  exports: [AppConfiguration],
}) {
  static deferred = () =>
    AppConfigModule.externallyConfigured(AppConfigModule, 0);
}
