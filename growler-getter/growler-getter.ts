import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const res = await fetch(
  Deno.args?.[0] ??
    "http://fbpage.digitalpour.com/?companyID=5237d19cfb890c093ca8029f&locationID=1"
);
const html = await res.text();

const doc = new DOMParser().parseFromString(html, "text/html");
const tapList = doc?.querySelectorAll("div.tapList .lineItem");
const taps = [];
for (const tap of tapList ?? []) {
  const beverageInfo = (tap as Element)?.querySelector(
    ".beverageInfo[style='display:table-cell']"
  );

  const getImage = (selector: string): string | null =>
    (tap as Element)?.querySelector(selector)?.attributes?.src ?? null;
  const getText = (selector: string): string =>
    (beverageInfo as Element)?.querySelector(selector)?.textContent?.trim() ??
    "";
  const getColor = (selector: string): string =>
    (beverageInfo as Element)
      ?.querySelector(selector)
      ?.attributes?.style?.replace("background:", "") ?? "";
  const getLevel = (selector: string): number =>
    (Number.parseInt(
      (tap as Element)
        ?.querySelector(selector)
        ?.attributes?.style?.replace(/background:(.*?);height:/, "")
        ?.replace("px;", "") ?? ""
    ) /
      37.0) *
    100.0;

  const tapObj = {
    name: beverageInfo?.attributes?.name?.replace("Layout", ""),
    producerName: getText(".producerName"),
    beverageName: getText(".beverageName"),
    beverageColor: getColor(".beverageColor"),
    beverageStyle: getText(".beverageStyle"),
    producerLocation: getText(".producerLocation"),
    abv: getText(".abv"),
    ibu: getText(".ibu"),
    logo: getImage(".beverageLogo"),
    level: getLevel(".kegLevel"),
  };
  if (tapObj.beverageName && tapObj.logo) {
    taps.push(tapObj);
  }
}

console.log(JSON.stringify(taps, null, 2));
