# Larkin

Simple Docker container management, including automatic reverse proxy, private registry, host management, and more.

# Project status

Currently Larkin is alpha. We will launch beta version by April 2019, so please watch us.

![image](https://github.com/acro5piano/docker-run.com/blob/master/demo.gif)

# Why

We all know Docker in production environment is great. Stateless deployment, shared environment in both development and production, and more. However, we have to do a lot of work when we manage our containers in production, such as Blue-Green deployment, Containers health check, and learn Kubernates. Do you imagine if we can run Docker Containers just by telling the url of your Docker image?

- No need to create Fargate instance
- No need to learn Kubernates
- No need to write deploy script
- No need to care about scalability
- No need to set up your certificates

Yes, docker-run.com is here: A new and better way to run Docker containers in production.

# How to use

As you can see the above demo, all you have to do is input your docker image url. docker-run.com creates an unique domain for your application.

Deploy a new image? It is quite easy, no need to install any tools:

```
curl -XPOST -H 'Authorization: YOUR_TOKEN' -d HOST/IMAGE:VERSION https://docker-run.com/APP_ID/renew
```

And the Docker container will be renew without downtime.

# Running it locally

**Requirements**

- Node.js >= 10
- Yarn

**How to run**

```
git clone git@github.com:getlarkin/larkin
cd larkin
cp .env ./packages/frontend/.env
cp .env ./packages/api/.env
yarn install
yarn dev
```

Note: The following features will not currently work in locally:

- nginx proxy
- Route53 host management
- Docker registry server

# TODO

- Set env vars
- Ansible Vault
- Ansilbe Template
