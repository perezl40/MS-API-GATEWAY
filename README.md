<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Description

Una pasarela API es nuestro punto de entrada para todos los clientes, en nuestro caso, para todas las solicitudes de clientes basadas en HTTP.

La pasarela de la API gestiona las solicitudes de dos maneras. Algunas solicitudes son simplemente proxies/enrutadas al servicio apropiado. Otras solicitudes se gestionan mediante la distribución a múltiples servicios. 

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
