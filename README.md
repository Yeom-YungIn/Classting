# CLASSTING

# Introduction

CLASSTING 과제 : 학교 소식을 전달하고 받아보는 ‘학교소식 뉴스피드’ 백엔드 구현

### Tech Stack

- Node.js (v20.11.1)
- NestJS
- TypeORM
- TypeScript
- Postgresql

# Install & Setting

- Install

```bash
npm install

```

- DB config

```sql
-- DB schema create
CREATE DATABASE classting; 
-- [options] 
-- OWNER = user 
-- ENCODING = 'UTF8'

```

```json
// DB config modify
// /config/defualt.json

  "db": {
    "host": "127.0.0.1",
    "username": "local", // DB user
    "password": "",      // DB usd PW
    "type": "postgres",
    "port": 5432,
    "database": "classting",
    "synchronize": true,
    "autoLoadEntities": true
  },
```

- start

```bash
npm run start
```

# TEST

```bash
npm test

##coverage Test
npm test:cov
```

### API Docs

```json
Swagger at http://localhost:3000/api-docs
```

- [API 테스트 참고 문서](https://github.com/Yeom-YungIn/Classting/tree/master/docs)