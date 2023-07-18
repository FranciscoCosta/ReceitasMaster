import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { ValidationPipe } from '@nestjs/common';
import PrismaService from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { CreateRecipeDto } from 'src/recipe/dto';
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
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('Should return unauthorized if no access_token', () => {
        return pactum.spec().get('users/me').expectStatus(401);
      });
      it('Should return user', () => {
        return pactum
          .spec()
          .get('users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      const dto = {
        firstName: 'francisco',
        lastName: 'Costa',
      };
      it('Should return unauthorized if no access_token', () => {
        return pactum.spec().patch('users').expectStatus(401);
      });
      it('Should edit user', () => {
        return pactum
          .spec()
          .patch('users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
    });
  });
  describe('Recipe', () => {
    describe('Get all recipes', () => {
      it('Should return all recipes', () => {
        return pactum.spec().get('recipes').expectStatus(200);
      });
    });
    describe('Create new recipe', () => {
      const dto: CreateRecipeDto = {
        title: 'recipe title',
        description: 'recipe description',
        ingredients: ['ingredient 1', 'ingredient 2'],
        instructions: ['instruction 1', 'instruction 2'],
        tumbnail:
          'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
        categories: ['category 1', 'category 2'],
        rating: 5,
        userId: 1,
      };

      it('Should create new recipe', () => {
        return pactum
          .spec()
          .post('recipes')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('recipeId', 'id');
      });
    });
    describe('Get recipe by id', () => {
      it('Should recipe by id', () => {
        return pactum
          .spec()
          .get('recipes/{id}')
          .withPathParams('id', '$S{recipeId}')
          .expectStatus(200)
          .inspect();
      });
    });
  });
  // describe('Review', () => {});
});
