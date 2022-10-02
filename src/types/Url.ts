/**
 * URLを表すクラスです。
 */
export class Url {
  readonly original: string;
  constructor(url: string | undefined) {
    if (url === undefined || url === "") {
      throw new Error("url is invalid");
    }

    this.original = url;
  }

  value(): string {
    return this.withoutHash();
  }

  private withoutHash(): string {
    return this.original.split("#")[0];
  }
}
