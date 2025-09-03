/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder/TextDecoder for JSDOM
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as unknown as {
  new (): TextDecoder;
};
