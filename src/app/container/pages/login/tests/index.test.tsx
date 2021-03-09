import * as React from "react";
import { createBasicSnapshotTest } from "../../../../utils/testHelper";
import LoginPage from "..";

const path = ["/login"];

describe("LoginPage", () => {
  createBasicSnapshotTest(<LoginPage />, path);
});
