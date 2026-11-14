import { validateLibraryUrl } from "./library";

describe("validateLibraryUrl", () => {
  it("should validate hostname & pathname", () => {
    // valid hostnames
    // -------------------------------------------------------------------------
    expect(validateLibraryUrl("https://akumadraw.com", ["akumadraw.com"])).toBe(
      true,
    );
    expect(
      validateLibraryUrl("https://www.akumadraw.com", ["akumadraw.com"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://sub.akumadraw.com", ["akumadraw.com"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://library.akumadraw.com", [
        "library.akumadraw.com",
      ]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://akumadraw.com/", ["akumadraw.com/"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://akumadraw.com/sub", ["akumadraw.com/"]),
    ).toBe(true);

    // valid pathnames
    // -------------------------------------------------------------------------
    expect(
      validateLibraryUrl("https://akumadraw.com/specific/path", [
        "akumadraw.com/specific/path",
      ]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://akumadraw.com/specific/path/", [
        "akumadraw.com/specific/path",
      ]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://akumadraw.com/specific/path/deeper", [
        "akumadraw.com/specific/path",
      ]),
    ).toBe(true);

    // invalid hostnames
    // -------------------------------------------------------------------------
    expect(() =>
      validateLibraryUrl("https://akumadraw.co", ["akumadraw.com"]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://notakumadraw.com", ["akumadraw.com"]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://akumadraw.com.evil.example", [
        "akumadraw.com",
      ]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://akumadraws.com", ["akumadraw.com"]),
    ).toThrow();

    // invalid pathnames
    // -------------------------------------------------------------------------
    expect(() =>
      validateLibraryUrl("https://akumadraw.com/specific/pathology", [
        "akumadraw.com/specific/path",
      ]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://akumadraw.com/specific", [
        "akumadraw.com/specific/path",
      ]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://akumadraw.com/", [
        "akumadraw.com/specific/path",
      ]),
    ).toThrow();
  });
});
