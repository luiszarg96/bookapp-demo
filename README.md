# Book App

A simple app to register books using a full javascript enviroment

## Installation

### Mongo DB

- To install in dev enviroment, you need MongoDB to fetch and persist data
- after install mongo in yout localhost, you'll need to create an .env file and put in ther a MONGODB_URI constant with the mongodb connection url, like this:

```
    MONGODB_URI=mongodb://localhost/yourdatabase
```

### NPM

- run `npm install`
- `npm run start` to run in production enviroment
- `npm run dev` to run in dev enviroment
- `npm run build` To build with webpack, run
- `npm run server:dev` to run a webpack dev server
