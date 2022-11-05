import { BrowserTabApiCreator } from "./browser-api/ChromeBrowserTabApi";
import { DuplicateGroupCollection } from "./types/DuplicateGroupCollection";
import { Tab } from "./types/Tab";

const browserTabApi = BrowserTabApiCreator.create();

browserTabApi.onUpdated(async function (tab: Tab) {
  const tabs = await browserTabApi.getTabAsync(tab.url);

  const duplicateGroups = new DuplicateGroupCollection(tabs);
  if (duplicateGroups.getDuplicate(tab.url) !== undefined) {
    console.log(`${tab.url.value} is duplicate`);

    await browserTabApi.removeAsync(tab);
  }
});