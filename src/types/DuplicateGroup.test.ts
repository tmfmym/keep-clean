import { DuplicateGroup } from "./DuplicateGroup";
import { Tab } from "./Tab";

describe("DuplicateGroup", () => {
  describe("#removeTargets", () => {
    test("空リストの場合は空のタブリストを返す", () => {
      const duplicateGroup = new DuplicateGroup("https://example.com", []);
      expect(duplicateGroup.removeTargets()).toEqual([]);
    });

    test("activeのみの場合は空のタブリストを返す", () => {
      const activeTab = new Tab(true, 1, "title", "https://example.com");
      const duplicateGroup = new DuplicateGroup("https://example.com", [activeTab]);

      expect(duplicateGroup.removeTargets()).toEqual([]);
    });

    test("active以外も含まれている場合はactive以外のタブリストをすべて返す", () => {
      const activeTab = new Tab(true, 1, "title", "https://example.com");
      const nonActiveTab = new Tab(false, 2, "title", "https://example.com/1");
      const nonActiveTab2 = new Tab(false, 3, "title", "https://example.com/1");
      const duplicateGroup = new DuplicateGroup("https://example.com", [activeTab, nonActiveTab, nonActiveTab2]);

      expect(duplicateGroup.removeTargets()).not.toEqual([activeTab]);
      expect(duplicateGroup.removeTargets()).toEqual([nonActiveTab, nonActiveTab2]);
    });

    test("一番idの小さいタブ以外のタブリストをすべて返す", () => {
      const nonActiveTab1 = new Tab(false, 10, "title", "https://example.com");
      const nonActiveTab2 = new Tab(false, 2, "title", "https://example.com/1");
      const nonActiveTab3 = new Tab(false, 30, "title", "https://example.com/2");
      const duplicateGroup = new DuplicateGroup("https://example.com", [nonActiveTab1, nonActiveTab2, nonActiveTab3]);

      expect(duplicateGroup.removeTargets()).not.toEqual([nonActiveTab2]);
      expect(duplicateGroup.removeTargets()).toEqual([nonActiveTab1, nonActiveTab3]);
    });
  });
});
