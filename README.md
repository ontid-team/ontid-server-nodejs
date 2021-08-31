## Installation

Development environment requirements:
- [Docker](https://www.docker.com) >= 17.06
- [Docker Compose](https://docs.docker.com/compose/install/)

## Before starting - dev stage
```bash
$ cp .env.dev .env
$ npm run typeorm migration:run
$ npm run start:dev
```

## Before starting - prod stage
```bash
$ cp .env.prod .env
$ docker-compose up -d --build
```
