// Copyright 2022 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import type {
  OpenAPI3,
  OperationObject,
  ParameterObject,
  PathItemObject,
  RequestBody,
  ResponseObject,
  SchemaObject,
  // https://github.com/microsoft/TypeScript/issues/49721
  // @ts-expect-error
} from "openapi-typescript";
import { promises as fs } from "fs";
import prettier from "prettier";
import fetch from "node-fetch";
import path from "path";
import $RefParser from "@apidevtools/json-schema-ref-parser";

const LICENCE = `// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0`;

function exportTypes(operationIds: string[]) {
  let output = "";
  operationIds.forEach((x) => {
    output += `export type ${x} = operations['${x}']\n`;
  });
  return output;
}

function importTypes(operationIds: string[]) {
  let output = "import {";
  operationIds.forEach((x) => {
    output += `${x},\n`;
  });
  output += '} from "./openapi-types"';
  return output;
}

function functionDocs(
  summary?: string,
  description?: string,
  operationId?: string,
  pathVariables?: ParameterObject[],
  pathQueryVariables?: ParameterObject[],
  requestBody?: RequestBody
) {
  let output = "";
  output += `\n/**\n    * ${summary}\n    *\n\n    * ${description}\n`;
  pathVariables?.forEach((x) => {
    output += `    * @param ${x.name} - ${x.description}\n`;
  });
  if (pathQueryVariables?.length)
    output += `    * @param params - The params for ${operationId}\n`;
  if (requestBody)
    output += `    * @param request_body - The request_body for ${operationId}\n`;
  output += `    * @param request_options - Customize the options for this request\n`;
  output += "    */\n";
  return output;
}

function functionParameters(
  pathKey: string,
  method: string,
  pathQueryVariables: ParameterObject[],
  pathVariables: ParameterObject[],
  operationId: string,
  requestBody: (RequestBody & Record<string, any>) | undefined,
  responseBody: SchemaObject | undefined,
  isStreaming: boolean
) {
  let output = "";
  const args = pathVariables
    ?.map((x) => `${x.name}${x.required === false ? "?" : ""}: string`)
    .join(",");
  const responseType = `TwitterResponse<${operationId}>`;
  const needsPathQuery = pathQueryVariables && pathQueryVariables.length > 0;
  const needsRequestBody = !!requestBody;
  const pathQueryRequired = pathQueryVariables?.some(
    (x) => x.required === true
  );
  let requestBodyRequired = false;
  if (requestBody?.content && requestBody.content["application/json"]?.schema) {
    const schema = requestBody.content["application/json"]
      .schema as SchemaObject;
    requestBodyRequired =
      !requestBody.required ||
      requestBody.required === true ||
      (!!schema.properties &&
        Object.keys(schema.properties).some((x) =>
          schema.required?.includes(x)
        ));
  }
  const isPaginated =
    pathQueryVariables?.some(
      (x) => (x as ParameterObject).name === "pagination_token"
    ) &&
    !!(responseBody?.properties?.meta as SchemaObject | undefined)?.properties
      ?.next_token;
  const type = isPaginated ? "paginate" : isStreaming ? "stream" : "rest";
  const optionalParams = needsPathQuery && !pathQueryRequired;
  const optionalRequestBody = !requestBodyRequired;
  output += `${operationId}: (`;
  if (args) output += `${args}, `;
  if (needsRequestBody && needsPathQuery) {
    output += `request_body: TwitterBody<${operationId}>`;
    if (optionalRequestBody) output += "= {}";
    output += ",";
    // Add request body inline to stop generating inlined types
    output += `params: TwitterParams<${operationId}>`;
    if (optionalParams) output += "= {}";
    output += ",";
  } else if (needsRequestBody && !needsPathQuery) {
    output += `request_body: TwitterBody<${operationId}>`;
    if (optionalRequestBody) output += "= {}";
    output += ",";
  } else if (!needsRequestBody && needsPathQuery) {
    output += `params: TwitterParams<${operationId}>`;
    if (optionalParams) output += "= {}";
    output += ",";
  }
  output += "request_options?: Partial<RequestOptions>): ";
  switch (type) {
    case "paginate":
      output += `TwitterPaginatedResponse<TwitterResponse<${operationId}>>`;
      break;
    case "stream":
      output += `AsyncGenerator<TwitterResponse<${operationId}>>`;
      break;
    default:
      output += `Promise<TwitterResponse<${operationId}>> `;
  }
  output += ` => `;
  output += `${type}<${responseType}>({ auth: this.#auth, ...this.#defaultRequestOptions, ...request_options, endpoint: \`${pathKey.replace(
    /{/g,
    "${"
  )}\``;
  if (needsPathQuery) output += ",params";
  if (needsRequestBody) output += ",request_body";
  output += `,method: '${method.toUpperCase()}'})\n`;
  return output;
}

function buildClasses(classes: {
  [x: string]: {
    name: string;
    description: string;
    externalDocs: { description: string; url: string };
    functions: string[];
  };
}) {
  let output = "";
  Object.keys(classes).forEach((x) => {
    const { name, description, externalDocs, functions } = classes[x];
    if (functions.length < 1) return;
    if (name && description && externalDocs) {
      output += `\n/**\n* ${name}\n*\n* ${description}\n*\n* ${externalDocs.description}\n* ${externalDocs.url}\n*/\n`;
    }
    output += `public readonly ${x} = {
      ${functions.join("\n,")}
    };`;
  });
  return output;
}

export async function generate(): Promise<void> {
  const version = process.argv[2];
  const specFileIndex = process.argv.indexOf("--specFile");
  let specFilePath: string;
  if (specFileIndex > -1) specFilePath = process.argv[specFileIndex + 1];
  let spec: OpenAPI3 & {
    tags: Record<string, any>;
    components: Record<string, any>;
    info: Record<string, any>;
  };
  if (specFilePath) {
    spec = await fs
      .readFile(path.resolve(__dirname, specFilePath), "utf8")
      .then(JSON.parse);
  } else {
    spec = await fetch("https://api.twitter.com/2/openapi.json").then((x) =>
      x.json()
    );
  }
  const openApiTs = (await import("openapi-typescript")).default;
  let openApiTypes = await openApiTs(spec);

  openApiTypes = LICENCE + "\n\n" + openApiTypes;

  await $RefParser.dereference(spec);

  const { paths, tags } = spec;

  const classes = tags.reduce((prev: any, next: { name: string }) => {
    const name = next.name.toLowerCase();
    return {
      ...prev,
      [name]: { functions: [], ...next },
    };
  }, {});

  const operationIds: string[] = [];

  let output = `${LICENCE}
   
/*
This file is auto-generated
Do not make direct changes to this file
*/

import { rest, stream, paginate, RequestOptions } from '../request'
import { AuthClient, TwitterResponse, TwitterBody, TwitterParams, TwitterPaginatedResponse } from '../types'
import { OAuth2Bearer } from "../auth";\n\n`;

  if (!paths) return;

  Object.keys(paths).forEach((pathKey) => {
    const endpointPath = paths[pathKey];
    Object.keys(endpointPath).forEach((methodKey) => {
      const method = endpointPath[
        methodKey as keyof PathItemObject
      ] as OperationObject & Record<string, any>;
      const {
        description,
        summary,
        operationId,
        parameters,
        requestBody,
        responses = {},
        tags,
      } = method;

      if (!operationId) return new Error("No operation id");

      const queryVariables = parameters?.filter(
        (x) => "in" in x && x.in === "query"
      ) as ParameterObject[];

      const pathVariables = parameters?.filter(
        (x) => "in" in x && x.in === "path"
      ) as ParameterObject[];

      const okResponse = responses["200"] as ResponseObject | undefined;
      const responseBody = (
        responses
          ? okResponse?.content
            ? okResponse.content["application/json"].schema
            : undefined
          : undefined
      ) as ResponseObject;
      const isStreaming = method["x-twitter-streaming"] === true;

      operationIds.push(operationId);

      if (!tags?.length) throw "No tags found";
      const tag = tags[0].toLowerCase();
      classes[tag].functions.push(
        functionDocs(
          summary,
          description,
          operationId,
          pathVariables,
          queryVariables,
          requestBody as RequestBody
        ) +
          functionParameters(
            pathKey,
            methodKey,
            queryVariables,
            pathVariables,
            operationId,
            requestBody,
            responseBody,
            isStreaming
          )
      );
    });
  });

  openApiTypes += exportTypes(operationIds);

  output += importTypes(operationIds);

  output += `
/**
 * Twitter API TypeScript Client
 *
 * TypeScript SDK for use with the Twitter API
 *
 */
export class Client {
  #auth: AuthClient;
  #defaultRequestOptions?: Partial<RequestOptions>;
  version: string;
  twitterApiOpenApiVersion: string;

  constructor(auth: string | AuthClient, requestOptions?: Partial<RequestOptions>) {
    this.version = "${version}"
    this.twitterApiOpenApiVersion = "${spec.info.version}"
    this.#auth = typeof auth === "string" ? new OAuth2Bearer(auth) : auth;
    this.#defaultRequestOptions = { ...requestOptions, headers: { "User-Agent": "twitter-api-typescript-sdk/" + this.version, ...requestOptions?.headers }};
  }

  ${buildClasses(classes)}

}`;
  await Promise.all([
    fs.writeFile(
      path.resolve(__dirname, "../src/gen/", "openapi-types.ts"),
      openApiTypes
    ),
    fs.writeFile(
      path.resolve(__dirname, "../src/gen/", "Client.ts"),
      prettier.format(output, { parser: "typescript" })
    ),
  ]);
}

generate();
