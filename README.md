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

## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **src/**                          | Source files |
| **src/middleware/**               | Express Middlewares like error handler feature |
| **build/**                        | Compiled source files will be placed here |
| **tests/**                        | Test cases will be placed here |
| **tests/unit/**             | Unit Test cases will be placed here  |
| **tests/integration/**      | API routes (Integration) Test cases will be placed here|

## Notes

### 1. Why is my git pre-commit hook not executable by default?

- Because files are not executable by default; they must be set to be executable.

```
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

### 2. [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

- Don’t use deprecated or vulnerable versions of Express
- Use TLS
- Use Helmet
- Use cookies securely
- Prevent brute-force attacks against authorization
- Ensure your dependencies are secure
- Avoid other known vulnerabilities
- Additional considerations
