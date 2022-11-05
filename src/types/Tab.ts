import { Url } from "./Url";

/**
 * タブIDを表す型です。
 */
export type TabId = number;

/**
 * タブを表すクラスです。
 */
export class Tab {
  readonly active: boolean;
  readonly id: TabId;
  readonly title: string;
  readonly url: Url;

  constructor(active: boolean, id: number | undefined, title: string | undefined, url: string | undefined) {
    // TAB_ID_NONE: -1
    if (id === undefined || id === -1) {
      throw new Error("id is invalid");
    }

    this.active = active || false;
    this.id = id;
    this.title = title || "";
    this.url = new Url(url);
  }
}
