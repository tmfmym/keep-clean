import { Tab } from "./Tab";

/**
 * 重複タブを表したクラスです。
 */
export class DuplicateGroup {
  readonly url: string;
  readonly tabs: Tab[];

  // TODO: urlはUrlの値オブジェクトを使いたい
  constructor(url: string, tabs: Tab[]) {
    if (url === "") {
      throw new Error("url is invalid");
    }

    this.url = url;
    this.tabs = tabs;
  }

  /**
   * 削除対象のタブを取得する
   * @returns タブのリスト
   */
  removeTargets(): Tab[] {
    // activeなものがあれば除外し、なければ一番idの小さいタブを除外したものが削除対象
    const activeTab = this.tabs.find(tab => tab.active);
    if (activeTab) {
      return this.tabs.filter(tab => tab !== activeTab);
    } else {
      return this.tabs.sort((a, b) => a.id - b.id).slice(1);
    }
  }
}
