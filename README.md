# braowser.js

A tiny, zero-dependency JavaScript library for browser, OS, engine, device and CPU detection. Returns a result shaped like [ua-parser-js](https://github.com/faisalman/ua-parser-js), and can optionally inject related classes (`mac`, `chrome`, `v-148`, …) onto the `<html>` element.

You can try it with this [DEMO](https://floriannicolas.github.io/braowser.js/).

## Current version: 2.0.0

No runtime dependencies. Two builds, same API:

- **Modern (ESM)** — the source, ~7 KB unminified, uses `?.`, `??`, `async/await`. For modern projects.
- **Legacy (IIFE)** — `dist/braowser.legacy.js`, ES2015-compatible (no `?.`, no `??`, no `async/await`, no `import/export`). For old projects that load via `<script>`.

## Install

```bash
npm install braowser
```

## Usage — modern (ESM)

```js
import { Braowser } from 'braowser';

const b = new Braowser();
b.getResult();
// {
//   ua: "Mozilla/5.0 ...",
//   browser: { name: "Chrome",  version: "148.0.0.0",      major: "148" },
//   cpu:     { architecture: undefined },
//   device:  { vendor: "Apple", model: "Macintosh",        type: undefined },
//   engine:  { name: "Blink",   version: "148.0.0.0" },
//   os:      { name: "macOS",   version: "10.15.7" }
// }
```

On Chromium browsers, `getResultAsync()` queries the User-Agent Client Hints API (`navigator.userAgentData.getHighEntropyValues()`) to fill in the full version and the CPU architecture:

```js
await b.getResultAsync();
// {
//   ua: "Mozilla/5.0 ...",
//   browser: { name: "Chrome",  version: "148.0.7778.179", major: "148" },
//   cpu:     { architecture: "arm64" },
//   device:  { vendor: "Apple", model: "Macintosh",        type: undefined },
//   engine:  { name: "Blink",   version: "148.0.7778.179" },
//   os:      { name: "macOS",   version: "26.3.1" }
// }
```

On Safari/Firefox the async path falls back to the sync result.

## Usage — legacy (`<script>` tag, no module syntax)

For old projects that can't use ES modules. The bundle exposes `Braowser` as a global on `window`:

```html
<script src="https://unpkg.com/braowser/dist/braowser.legacy.min.js"></script>
<script>
    var b = new Braowser();
    console.log(b.getResult());
    b.applyHtmlClasses();
</script>
```

The legacy bundle is ES2015-compatible — `?.`, `??`, `async/await`, and `import/export` are all transpiled away by esbuild. It works in any browser that supports `class`, `Promise`, and `const`/`let` (Chrome 49+, Firefox 45+, Safari 10+, Edge 13+). Same API as the ESM build.

### HTML class injection

The v1 behaviour — appending classes to the `<html>` element — is now an explicit method:

```js
new Braowser().applyHtmlClasses();
// <html class="mac chrome v-148 retina">
```

You can pass a different target element if you want, e.g. `b.applyHtmlClasses(document.body)`. The method is idempotent — calling it twice does not duplicate classes — and safe to call in SSR (it no-ops when `document` is undefined).

### SSR / Node

Pass a UA string explicitly:

```js
import { Braowser } from 'braowser';

const b = new Braowser(request.headers['user-agent']);
b.getResult();
```

## API

```ts
new Braowser(ua?: string)

b.getUA():              string
b.setUA(ua: string):    this              // chainable, invalidates the cache
b.getBrowser():         { name, version, major }
b.getOS():              { name, version }
b.getEngine():          { name, version }
b.getDevice():          { vendor, model, type }
b.getCPU():             { architecture }
b.isMobile():           boolean           // phone or mobile-class tablet
b.isTouch():            boolean           // runtime probe in a browser; falls back to UA inference in SSR
b.getResult():          IResult
b.getResultAsync():     Promise<IResult>   // enriched via UA-CH on Chromium
b.applyHtmlClasses(target?: Element):  this
```

## Detected values

| Field | Values |
|---|---|
| `browser.name` | `Chrome`, `Chromium`, `Edge`, `Firefox`, `Safari`, `Mobile Safari`, `Opera`, `Samsung Internet`, `IE` |
| `engine.name` | `Blink`, `WebKit`, `Gecko`, `Trident`, `EdgeHTML`, `Presto` |
| `os.name` | `macOS`, `Windows`, `Linux`, `Android`, `iOS`, `iPadOS`, `Chrome OS`, `Windows Phone` |
| `device.type` | `mobile`, `tablet`, or `undefined` (desktop) |
| `device.vendor` | `Apple`, `Google`, `Samsung`, `Xiaomi`, `Huawei`, `OnePlus`, … |
| `cpu.architecture` | `arm64`, `arm`, `amd64`, `ia32`, `ppc64`, `ppc` |

## HTML classes (back-compat with v1)

`applyHtmlClasses()` emits the same vocabulary as v1, so existing CSS rules keep working:

| Detected | Emitted class |
|---|---|
| macOS | `mac` |
| Windows | `windows` |
| Linux | `linux` |
| Android | `android` |
| iOS / iPadOS | `ios` |
| Windows Phone | `windows_phone` |
| Browser name | lowercased (`chrome`, `firefox`, `safari`, `edge`, `ie`, `opera`, `samsung-internet`) |
| Browser major version | `v-{major}` |
| Mobile UA | `mobile` |
| Touch-capable | `touch` |
| `devicePixelRatio >= 2` | `retina` |

### CSS examples

```css
html.ie.v-8 {
    border: 1px solid #999;
}

html.safari,
html.chrome {
    -webkit-font-smoothing: subpixel-antialiased;
}

html.retina {
    background-image: url(image@2x.png);
}
```

## Upgrading from v1

v2 is a clean break. The old global functions (`braowser_init()`, `braowser_hasClass()`) and the auto-run-on-script-load behaviour are gone.

| v1 | v2 |
|---|---|
| `<script src="braowser.min.js">` (auto-runs) | `<script type="module">import { Braowser } from 'braowser'; new Braowser().applyHtmlClasses();</script>` |
| `braowser_init()` | `new Braowser().applyHtmlClasses()` |
| `braowser_hasClass('ie v-8')` | `const r = new Braowser().getResult(); r.browser.name === 'IE' && r.browser.major === '8'` |

The CSS classes emitted by `applyHtmlClasses()` are unchanged, so your stylesheets keep working.

## Running the demo locally

ESM requires the demo to be served over `http://` (not opened as a `file://`). From the repo root:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open <http://localhost:8080>.

## Contribute

Bug reports, pull requests and ideas are welcome.

## License

MIT
