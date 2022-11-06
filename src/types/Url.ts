/**
 * URLを表すクラスです。
 */
export class Url {
  readonly original: string;
  readonly value: string;
  constructor(url: string | undefined) {
    if (url === undefined || url === "") {
      throw new Error("url is invalid");
    }

    this.original = url;
    this.value = this.withoutHash();
  }

  private withoutHash(): string {
    return this.original.split("#")[0];
  }
}
