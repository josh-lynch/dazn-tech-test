# dazn tech test

## api testing instructions

the live api can be queried at the following endpoint:

```
https://XXXXXXXXXX.execute-api.eu-west-2.amazonaws.com/dev/graphql
```

the api uses the graphql syntax and can be queried via `POST` requests using the following structure:

```
query {
  user(id: 0) {
    currentStreams
    canStartNewStream
  }
}
```

there are currently 10 users in the database (id: [0 - 9]).

### deploying

to redeploy this api run the following cli scripts;

```
yarn deploy-dev-service
  // deploys lambda function api and db
yarn seed
  // seeds dummy data in db
```

## scalability strategy