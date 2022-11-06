import { DuplicateGroup } from "./DuplicateGroup";
import { Tab } from "./Tab";
import { Url } from "./Url";

/**
 * 重複タブコレクションを表すクラスです。 
 */
export class DuplicateGroupCollection {
  private duplicateMap: Map<string, DuplicateGroup>;

  constructor(tabs: readonly Tab[]) {
    this.duplicateMap = this.createDuplicateMap(tabs);
  }

  /**
   * 重複タブがあるするかどうか
   * @returns 重複タブがある場合はtrue、ない場合はfalse
   */
  public hasDuplicate(): boolean {
    return this.duplicateMap.size > 0;
  }

  /**
   *  指定したUrlに対応する重複タブを取得します。
   * @param url 重複タブを検索するURL
   * @returns 重複タブ
   */
  public getDuplicate(url: Url): DuplicateGroup | undefined {
    return this.duplicateMap.get(url.value);
  }

  /**
   * 重複タブリストを取得します。
   * @returns 重複タブのリスト
   */
  public getDuplicates(): readonly DuplicateGroup[] {
    return Array.from(this.duplicateMap.values());
  }

  private createDuplicateMap(tabs: readonly Tab[]): Map<string, DuplicateGroup> {
    const tabMap = this.grouping(tabs);

    const duplicateMap = new Map<string, DuplicateGroup>();
    tabMap.forEach((value, key) => {
      if (value.length > 1) {
        duplicateMap.set(key, new DuplicateGroup(key, value));
      }
    });

    return duplicateMap;
  }

  private grouping(tabs: readonly Tab[]): Map<string, Tab[]> {
    const tabMap = new Map<string, Tab[]>();

    // Urlをキーにして、同じUrlのタブをグループ化する
    tabs.forEach(tab => {
      const key = tab.url.value;
      if (key === "") {
        return;
      }

      if (tabMap.has(key)) {
        tabMap.get(key)?.push(tab);
      } else {
        tabMap.set(key, [tab]);
      }
    });

    return tabMap;
  }
}
