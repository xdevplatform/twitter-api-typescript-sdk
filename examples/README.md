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
CLIENT_ID=my-client-id
CLIENT_SECRET=my-client-secret
```

Run the example with `ts-node`

`npx ts-node *.ts`

For example:

```
npx ts-node oauth2-bearer.ts
```
