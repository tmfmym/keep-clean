import { Tab } from "../types/Tab";
import { Url } from "../types/Url";
import { IBrowserTabApi } from "./IBrowserTabApi";

/**
 * ブラウザのタブを操作するクラスを生成するクラスです。
 */
export class BrowserTabApiCreator {
  /**
   * ブラウザのタブを操作するクラスを生成します。
   * @returns ブラウザのタブを操作するクラス
   */
  static create(): IBrowserTabApi {
    return new ChromeBrowserTabApi();
  }
}

/**
 * Chromeのタブを操作するAPIを表すクラスです。
 */
export class ChromeBrowserTabApi implements IBrowserTabApi {
  onUpdated(callback: Function): void {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === 'complete') {
        console.log('onUpdated: complete', { tabId, changeInfo, tab });
        callback(new Tab(tab.active, tab.id, tab.title, tab.url))
      }
    });
  }

  async getTabAsync(url: Url): Promise<Tab[]> {
    const tabs = await chrome.tabs.query({ url: `${url.value}*` });
    return tabs.map(tab => new Tab(tab.active, tab.id, tab.title, tab.url));
  }

  async getOpenTabsAsync(): Promise<Tab[]> {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    return tabs.map(tab => new Tab(tab.active, tab.id, tab.title, tab.url));
  }

  async removeAsync(tab: Tab): Promise<void> {
    await chrome.tabs.remove(tab.id);
  }
}
