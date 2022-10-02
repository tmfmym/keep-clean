import { Url } from "./Url";

describe("Url", () => {
  describe("#value", () => {
    test("ハッシュなしのURLの場合はそのまま返す", () => {
      const url = "https://example.com";
      expect(new Url(url).value()).toBe(url);
    });

    test("ハッシュなしのパスありURLの場合はそのまま返す", () => {
      const url = "https://example.com/test";
      expect(new Url(url).value()).toBe(url);
    });

    test("ハッシュなしのクエリストリングありURLの場合はそのまま返す", () => {
      const url = "https://example.com?test=1";
      expect(new Url(url).value()).toBe(url);
    });

    test("ハッシュありのURLの場合は#以下を除外したURLを返す", () => {
      const url = new Url("https://example.com#test");
      expect(url.value()).not.toBe("https://example.com#test");
      expect(url.value()).toBe("https://example.com");
    });

    test("ハッシュありのパスありURLの場合は#以下を除外したURLを返す", () => {
      const url = new Url("https://example.com/test#test");
      expect(url.value()).not.toBe("https://example.com/test#test");
      expect(url.value()).toBe("https://example.com/test");
    });

    test("ハッシュありのクエリストリングありURLの場合は#以下を除外したURLを返す", () => {
      const url = new Url("https://example.com?test=1#test");
      expect(url.value()).not.toBe("https://example.com?test=1#test");
      expect(url.value()).toBe("https://example.com?test=1");
    });
  });
});
