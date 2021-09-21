# GraphQL React Playlist

## Pre-requisite
Following tools need to be installed in your system to run this application. 

- Node & NPM(default comes bundled with Node)
- Docker

Basic understanding of
- HTML
- CSS
- JavaScript

## How to start?

### 1. Run mongodb docker
```
> docker run -itd --name mongodb -p 27017:27017 mongo
```

### 2. Create database
```
> docker exec -it mongodb bash
> mongo
> use booklist
```

### 3. Start GraphQL Server
```
> cd graphql-server
> npm run dev:start
```

### 4. Start React Web Client
```
> cd web-client
> yarn start
```