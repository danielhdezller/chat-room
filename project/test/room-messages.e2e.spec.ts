import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { expect } from 'chai';
import { User } from '@/user/entities/user.entity';
import { Room } from '@/room/entities/room.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: User;
  let room: Room;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('(POST) /users', async () => {
    const name = 'Frank';
    const response = await request(app.getHttpServer())
      .post(`/users`)
      .send({ name });

    expect(response.statusCode).to.equal(201);
    expect(response.body.name).to.equal(name);
    user = response.body;
  });

  it('(POST) /rooms', async () => {
    const name = 'Pop-International';
    const response = await request(app.getHttpServer())
      .post(`/rooms`)
      .send({ name });

    expect(response.statusCode).to.equal(201);
    expect(response.body.name).to.equal(name);
    room = response.body;
  });

  it('(POST) /rooms/${roomId}/messages', async () => {
    const roomId = room.id;
    const userId = user.id;
    const message = 'Hi!';

    const response = await request(app.getHttpServer())
      .post(`/rooms/${roomId}/messages`)
      .send({ message, userId });

    expect(response.statusCode).to.equal(201);
    expect(response.body.message).to.equal(message);
  });

  it('(POST) /rooms/${roomId}/messages status 500 if no userId', async () => {
    const roomId = room.id;
    const response = await request(app.getHttpServer())
      .post(`/rooms/${roomId}/messages`)
      .send({ message: 'Hi!' });
    expect(response.statusCode).to.equal(500);
  });

  it('(GET) /rooms/${roomId}/messages', async () => {
    const roomId = room.id;
    const response = await request(app.getHttpServer()).get(
      `/rooms/${roomId}/messages`,
    );

    expect(response.statusCode).to.equal(200);
  });

  it('(GET) /rooms/${roomId}/messages/latest', async () => {
    const roomId = room.id;
    const response = await request(app.getHttpServer()).get(
      `/rooms/${roomId}/messages/latest`,
    );

    expect(response.statusCode).to.equal(200);
  });
});
