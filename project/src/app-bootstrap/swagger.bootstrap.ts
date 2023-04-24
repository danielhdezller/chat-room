import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ApiConfiguration } from '@/config-provider/configurations/api.configuration';

/**
 * Configure a INestApplication to use a document generator (swagger right now).
 *
 * @param {INestApplication} app The app where the document builder will be configured.
 */
export function configureDocumentationGenerator(
  app: INestApplication,
  path: string,
  credentials: ApiConfiguration,
): void {
  const swaggerPaths = [
    path,
    // Add a second swagger path with that reference to the best tv show.
    'the-office',
  ];

  // Extract a list of paths that will be protected.
  const pathWithCredentials: string[] = [];

  swaggerPaths.forEach((path) =>
    pathWithCredentials.push(`/${path}`, `/${path}-json`),
  );

  // Add credentials to api path
  if (!credentials.ignoreCredentials) {
    app.use(
      pathWithCredentials,
      basicAuth({
        challenge: true,
        users: {
          [credentials.user]: credentials.password,
        },
      }),
    );
  }

  // Configure the list of documents path`
  swaggerPaths.forEach((path) => {
    const options = new DocumentBuilder()
      .setTitle('ChatRoom')
      .setDescription('¿Do you like chat-room? integrate with our api')
      .setContact(
        'chat-room',
        'https://www.chat-room.com/',
        'contact@chat-room.com',
      )
      .setTermsOfService(
        'https://www.chat-room.com/en/legal-notice-and-conditions/',
      )
      .setVersion('1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(path, app, document);
  });
}
