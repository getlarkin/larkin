# larkin

Simple Docker container management, including automatic reverse proxy, private registry, host management, and more.

# Running it locally

**Requirements**

- Node.js >= 10
- Yarn

**How to run**

```
git clone git@github.com:getlarkin/larkin
cd larkin
cp .env.local .env
cp .env.local ./packages/frontend/.env
cp .env.local ./packages/api/.env
yarn install
yarn dev
```

Note: The following features will not currently work in locally:

- nginx proxy
- Route53 host management
- Docker registry server
