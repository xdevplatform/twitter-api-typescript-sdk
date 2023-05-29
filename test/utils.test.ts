// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import { base64Encode } from "../src/utils";

describe("test utils", () => {

  test("base64Encode is equivalent to Buffer.toString('base64')", () => {
    for (let i = 0; i < 64; i++) { // go through all 64 symbols
      const byteValues = new Uint8Array([i << 2]);
      expect(base64Encode(byteValues)).toEqual(Buffer.from(Buffer.from(byteValues)).toString("base64"));
    }
  });

});
