<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework with [Prisma](https://github.com/prisma/prisma) TypeScript starter repository.

## 1. 설치

1. Download Source Code.

2. Install Node modules.

```bash
$ npm install
```

## 2. Profile 설정 (local / dev / prod)

### 2.1 .env 파일에서 프로필 지정

```.env
# .env 파일에서 설정
# dev, prod branch 에서 최초 설정 후 gitignore 파일로 지정.

NODE_ENV="dev"
```

### 2.2 .env.{profile} 파일 생성하여 프로필 별 환경 설정

ex) .env.local 파일 생성 후 설정 변수/값 입력

```bash
# DB 접속 정보 설정
MYDB_URL="postgresql://username:password@localhost:5432/dbname?schema=schemaname"
```

Set .env.dev & .env.prod

## 3. Prisma 설정

### 3.1 Prisma DataSource 설정

-   DataSource 설정 변수명 규칙

`{Prefix}_URL`

ex) .env.dev 파일에 DataSource 설정 추가

```bash
MYDB_URL="postgresql://username:password@localhost:5432/dbname?schema=schemaname"
```

### 3.3 Prisma Schema 파일 생성 (.prisma)

-   File 명 규칙

`.env.{profile} 파일의 URL 변수 prefix와 일치해야함`

ex) 환경설정 파일의 Database URL의 변수 Prefix가 MYDB 일때

```bash
# FILE : .env.dev
MYDB_URL="postgresql://username:password@localhost:5432/dbname?schema=schemaname"
```

해당 `Prefix`를 .prisma 파일의 `파일명`으로 지정

```bash
# File : mydb.prisma
generator client {
  provider = "prisma-client-js"
  output   = "./dwClient"
}

datasource db {
  provider = "postgresql"
  url      = env("MYDB_URL")
}

model Sample {
  id Int @id @default(uuid())
  name String
}
```

### 3.4 Pull Prisma Schema (Database -> prisma)

./prisma/\*.prisma 파일들을 읽으면서 각각 url에 맞춰 DB Pull

```bash
# If your OS is Window
npm run prisma:p:win
```

```bash
# If your OS is Linux/Ubuntu
npm run prisma:p:ubu
```

### 3.5 Generate Prisma Client

./prisma/\*.prisma 파일들을 읽으면서 각각 url에 맞춰 Client 생성

```bash
# If your OS is Window
npm run prisma:c:win
```

```bash
# If your OS is Linux/Ubuntu
npm run prisma:c:ubu
```

### 3.6 Generate Prisma Service

-   다음 경로에 Prisma 서비스 생성

`./src/prismas/`

-   PrismaClient 를 상속하여 서비스 생성

```TypeScript
# /src/prismas/mydb/mydb.service.ts
...

import { PrismaClient } from '../../../prisma/mydbClient';

@Injectable()
export class MydbService extends PrismaClient implements OnmoduleInit, OnModuleDestory {

  ...
}

```

-   enableShutdownHooks 사용 시 `main.ts` 에 설정 추가

```TypeScript
# /src/main.ts
...

const mydbService = app.get(MydbService);
mydbService.enableShutdownHooks(app);

...
```

-   prismas.module.ts 에 exports 추가

```TypeScript
# /src/prismas/prismas.module.ts
...

@Global()
@Module({
    imports: [],
    providers: [MydbService, Mydb2Service],
    exports: [MydbService, Mydb2Service],
})
export class PrismasModule {}

...
```

### 3.7 Use Prisma Service

-   Service 객체를 주입받아 사용

```TypeScript
# other service
@Injectable()
export class UserService {
    constructor(private readonly mydbService: MydbService) {}

    async findOne(id: string) {
        return await this.mydbService.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    ...
}
```

## 4. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 5. Swagger Docs.

http://localhost:3000/api-docs

## 6. License

Nest is MIT licensed
Prisma is Apache licensed
