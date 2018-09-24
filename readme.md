# dazn tech test

## api testing instructions

the live api can be queried at the following endpoint:

```
https://55ktfzyps8.execute-api.eu-west-2.amazonaws.com/dev/graphql
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
yarn
  // install dependencies
yarn deploy-dev-service
  // deploys lambda function api and db
yarn seed
  // seeds dummy data in db
```

the service can be tested by running `yarn test`

## scalability strategy

my knowledge on scalablity is limited, from my understanding aws lambda itself will handle scaling automatically based on demand up to the concurrency limit. i think a more likely limitation than lambda itself is the downstream dependency (dynamodb) which i believe is less effective at auto-scaling.

if the lambda was the source of scalability issues, i suspect the code from this could be redeployed in containers on ECS which would enable more instances to be run than on lambda.

i do not know of a better alternative to replace dynamodb if this were to be the cause of scaling issues.