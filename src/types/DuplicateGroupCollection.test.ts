import { DuplicateGroupCollection } from "./DuplicateGroupCollection";
import { Tab } from "./Tab";

describe("DuplicateGroupCollection", () => {
  describe("#hasDuplicate", () => {
    test("空のタブリストの場合はfalseを返す", () => {
      const collection = new DuplicateGroupCollection([]);
      expect(collection.hasDuplicate()).toBeFalsy();
    });

    test("ホスト名が異なるURLのタブリストの場合はfalseを返す", () => {
      const tab1 = new Tab(true, 1, "test1", "https://example.com");
      const tab2 = new Tab(false, 2, "test2", "https://test.com");

      const collection = new DuplicateGroupCollection([tab1, tab2]);
      expect(collection.hasDuplicate()).toBeFalsy();
    });

    test("ホスト名が同じURLのタブリストの場合はtrueを返す", () => {
      const tab1 = new Tab(true, 1, "test1", "https://example.com");
      const tab2 = new Tab(false, 2, "test2", "https://example.com");

      const collection = new DuplicateGroupCollection([tab1, tab2]);
      expect(collection.hasDuplicate()).toBeTruthy();
    });

    test("ホスト名が同じでパスが異なるがURLのタブリストが含まれる場合はfalseを返す", () => {
      const tab1 = new Tab(true, 1, "test1", "https://example.com");
      const tab2 = new Tab(false, 2, "test2", "https://example.com/test");

      const collection = new DuplicateGroupCollection([tab1, tab2]);
      expect(collection.hasDuplicate()).toBeFalsy();
    });

    test("ホスト名が同じでパスが同じでハッシュがあるURLのタブリストが含まれる場合はtrueを返す", () => {
      const tab1 = new Tab(true, 1, "test1", "https://example.com/test");
      const tab2 = new Tab(false, 2, "test2", "https://example.com/test#example");

      const collection = new DuplicateGroupCollection([tab1, tab2]);
      expect(collection.hasDuplicate()).toBeTruthy();
    });
  });
});
