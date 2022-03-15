# Twitter API TypeScript SDK Examples

## To run the examples

Make sure you are in the `examples` directory

Install the required packages

```
npm install
```

Next, create a `.env` file in the example directory and populate the following variables (You do not need them all for each example, for example `oauth2-bearer.ts` only requires a `BEARER_TOKEN`):

```
BEARER_TOKEN=my-bearer-token
API_KEY=my-api-key
API_SECRET_KEY=my-secret-key
ACCESS_TOKEN=my-access-token
ACCESS_TOKEN_SECRET=my-access-token-secret
```

Run the example with `ts-node`

`npx ts-node *.ts`

For example:

```
npx ts-node oauth2-bearer.ts
```
