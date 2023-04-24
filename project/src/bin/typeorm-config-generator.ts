import { normalize } from 'path';
import { ConfigProviderService } from '@/config-provider/services/config-provider.service';
import { DataSource } from 'typeorm';

const config = async () => {
  const configProviderService = new ConfigProviderService({
    envPath: normalize(`${__dirname}/../../config.json`),
  });

  await configProviderService.init();
  const configuration = configProviderService.getAppConfiguration();
  const typeOrmConfig = configuration.getTypeOrmConfig();

  const config = {
    ...typeOrmConfig,
    entities: ['./**/*.entity.js'],
    migrations: ['dist/database/migrations/**/*.js'],
  };
  return new DataSource(config);
};

export default config();
