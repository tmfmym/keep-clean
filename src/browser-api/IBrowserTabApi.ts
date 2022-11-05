import { Tab } from "../types/Tab";
import { Url } from "../types/Url";

/**
 * ブラウザのタブを操作するAPIを表すインタフェースです。
 */
export interface IBrowserTabApi {
  /**
   * タブが更新された場合に発火します。
   * @param callback コールバック関数
   */
  onUpdated(callback: Function): void;

  /**
   * 指定されたURLのタブを取得します。
   * @param url URL
   * @returns タブのリスト
   */
  getTabAsync(url: Url): Promise<Tab[]>;

  /**
   * 現在開いているタブを取得します。
   * @returns 現在開いているタブのリスト
   */
  getOpenTabsAsync(): Promise<Tab[]>;

  /**
   * 指定したタブを削除します。
   * @param tab 削除するタブ
   */
  removeAsync(tab: Tab): Promise<void>;
}
