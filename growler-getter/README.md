Growler Getter
==============

Scrapes a [Digitalpour growler tap list](http://digitalpour.com) web page and dumps JSON with all the data.

# Running it

By default if you don't specify a URL it uses the [Happy Valley Growlers tap list](http://fbpage.digitalpour.com/?companyID=5237d19cfb890c093ca8029f&locationID=1). This page is embedded in an iframe on the client company website.

```sh
deno run --allow-net https://raw.githubusercontent.com/jherr/growlers/master/growler-getter/growler-getter.ts
```

Or:

```sh
deno run --allow-net https://raw.githubusercontent.com/jherr/growlers/master/growler-getter/growler-getter.ts URL
```
