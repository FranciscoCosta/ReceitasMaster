import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { ValidationPipe } from '@nestjs/common';
import PrismaService from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333/');
  });
  afterAll(async () => {
    await app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'xico123@gmail.com',
      password: '123456a!',
    };
    describe('Signup', () => {
      it('should throw error if email empty', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({
            password: '123456a!',
          })
          .expectStatus(400);
      });
      it('should throw error if password empty', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({
            email: 'xico@gmail.com',
          })
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Singin', () => {
      it('should throw error if email empty', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({
            password: '123456a!',
          })
          .expectStatus(400);
      });
      it('should throw error if password empty', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({
            email: 'xico@gmail.com',
          })
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
  // describe('User', () => {});
  // describe('Recipe', () => {});
  // describe('Review', () => {});
});
