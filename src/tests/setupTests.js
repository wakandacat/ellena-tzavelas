import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

//from https://blog.incubyte.co/blog/vitest-react-testing-library-guide/
//https://betterstack.com/community/guides/testing/vitest-explained/#step-1-setting-up-the-directory
// Runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
