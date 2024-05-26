# WeRoad tech case: Travels & Bookings management

My name is Mauro Esposito and this is my version of the Travels & Booking management system.
It was developed using Vue3, Nuxt3, TypeScript, TailwindCSS and Jest.

## Setup

Install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Tests

```bash
# npm
npm run test:unit

# pnpm
pnpm run test:unit

# yarn
yarn test:unit

# bun
bun run test:unit
```

It is necessary to config a .env file with the path of the api (vue server mock), that will be built in the path /api of the running environment. I.e.
```
API_BASE_URL=http://localhost:3000/api
```
