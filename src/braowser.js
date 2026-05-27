/*!
 * Braowser 2.0.1
 * MIT License — https://github.com/floriannicolas/braowser.js
 *
 * Zero-dependency browser/OS/engine/device/CPU detection.
 * Returns a ua-parser-js-shaped result, plus optional HTML-class injection.
 */

/**
 * @typedef {Object} IBrowser
 * @property {string|undefined} name
 * @property {string|undefined} version
 * @property {string|undefined} major
 *
 * @typedef {Object} IOS
 * @property {string|undefined} name
 * @property {string|undefined} version
 *
 * @typedef {Object} IEngine
 * @property {string|undefined} name
 * @property {string|undefined} version
 *
 * @typedef {Object} IDevice
 * @property {string|undefined} model
 * @property {string|undefined} vendor
 * @property {'mobile'|'tablet'|undefined} type
 *
 * @typedef {Object} ICPU
 * @property {string|undefined} architecture
 *
 * @typedef {Object} IResult
 * @property {string} ua
 * @property {IBrowser} browser
 * @property {ICPU} cpu
 * @property {IDevice} device
 * @property {IEngine} engine
 * @property {IOS} os
 */

// ---------------------------------------------------------------------------
// Lookup tables
// ---------------------------------------------------------------------------

// Resolution order matters: Edge/Opera/Samsung must be checked before Chrome
// because their UAs all contain "Chrome/". Same idea for Safari (last among
// the WebKit family) and IE (Trident before MSIE).
const BROWSER_PATTERNS = [
    [/Edg(?:e|A|iOS)?\/(\d+(?:\.\d+)*)/,            (m) => ({ name: 'Edge',             version: m[1] })],
    [/OPR\/(\d+(?:\.\d+)*)/,                        (m) => ({ name: 'Opera',            version: m[1] })],
    [/OPiOS\/(\d+(?:\.\d+)*)/,                      (m) => ({ name: 'Opera',            version: m[1] })],
    [/Opera\/(\d+(?:\.\d+)*)/,                      (m) => ({ name: 'Opera',            version: m[1] })],
    [/SamsungBrowser\/(\d+(?:\.\d+)*)/,             (m) => ({ name: 'Samsung Internet', version: m[1] })],
    [/Chromium\/(\d+(?:\.\d+)*)/,                   (m) => ({ name: 'Chromium',         version: m[1] })],
    [/(?:CrMo|CriOS)\/(\d+(?:\.\d+)*)/,             (m) => ({ name: 'Chrome',           version: m[1] })],
    [/Chrome\/(\d+(?:\.\d+)*)/,                     (m) => ({ name: 'Chrome',           version: m[1] })],
    [/(?:Firefox|FxiOS)\/(\d+(?:\.\d+)*)/,          (m) => ({ name: 'Firefox',          version: m[1] })],
    // Prefer Version/X when present — it's the actual Safari version. Fall
    // back to Mobile/X Safari/Y only when Version/ is absent.
    [/Version\/(\d+(?:\.\d+)*).+Mobile.+Safari\//,  (m) => ({ name: 'Mobile Safari',    version: m[1] })],
    [/Mobile\/\S+ Safari\/(\d+(?:\.\d+)*)/,         (m) => ({ name: 'Mobile Safari',    version: m[1] })],
    [/Version\/(\d+(?:\.\d+)*).+Safari\//,          (m) => ({ name: 'Safari',           version: m[1] })],
    // IE — carries over the v1 Trident/rv: extraction
    [/Trident\/.+?rv:(\d+(?:\.\d+)*)/,              (m) => ({ name: 'IE',               version: m[1] })],
    [/MSIE (\d+(?:\.\d+)*)/,                        (m) => ({ name: 'IE',               version: m[1] })],
];

// Blink must be detected before WebKit: Blink UAs still contain "AppleWebKit/"
// for legacy compatibility.
const ENGINE_PATTERNS = [
    [/EdgeHTML\/(\d+(?:\.\d+)*)/,                   (m) => ({ name: 'EdgeHTML', version: m[1] })],
    [/Edge\/(\d+(?:\.\d+)*)/,                       (m) => ({ name: 'EdgeHTML', version: m[1] })],
    [/Trident\/(\d+(?:\.\d+)*)/,                    (m) => ({ name: 'Trident',  version: m[1] })],
    [/Presto\/(\d+(?:\.\d+)*)/,                     (m) => ({ name: 'Presto',   version: m[1] })],
    // Note: CriOS is excluded here on purpose — Chrome on iOS runs on WebKit,
    // not Blink (Apple policy). The AppleWebKit/ rule below catches it.
    [/(?:Chrome|Chromium)\/(\d+(?:\.\d+)*)/,        (m) => ({ name: 'Blink',    version: m[1] })],
    [/rv:(\d+(?:\.\d+)*).+Gecko\//,                 (m) => ({ name: 'Gecko',    version: m[1] })],
    [/Gecko\/(\d+(?:\.\d+)*)/,                      (m) => ({ name: 'Gecko',    version: m[1] })],
    [/(?:AppleWebKit|WebKit)\/(\d+(?:\.\d+)*)/,     (m) => ({ name: 'WebKit',   version: m[1] })],
];

const WINDOWS_NT_VERSIONS = {
    '10.0': '10', '6.3': '8.1', '6.2': '8', '6.1': '7',
    '6.0': 'Vista', '5.2': 'XP', '5.1': 'XP', '5.0': '2000',
};

// Windows Phone before Android — its UA also contains "Android" on some
// builds. Same ordering note as the v1 source (src/braowser.js:54 in v1).
const OS_PATTERNS = [
    [/Windows Phone(?: OS)? (\d+(?:\.\d+)*)/,       (m) => ({ name: 'Windows Phone', version: m[1] })],
    [/Windows NT (\d+\.\d+)/,                       (m) => ({ name: 'Windows',       version: WINDOWS_NT_VERSIONS[m[1]] || m[1] })],
    [/Android (\d+(?:\.\d+)*)/,                     (m) => ({ name: 'Android',       version: m[1] })],
    [/Android/,                                     ()   => ({ name: 'Android',       version: undefined })],
    [/CPU(?: iPhone)? OS (\d+(?:[._]\d+)*)/,        (m) => ({ name: 'iOS',           version: m[1].replace(/_/g, '.') })],
    [/iPhone OS (\d+(?:[._]\d+)*)/,                 (m) => ({ name: 'iOS',           version: m[1].replace(/_/g, '.') })],
    [/Mac OS X (\d+(?:[._]\d+)*)/,                  (m) => ({ name: 'macOS',         version: m[1].replace(/_/g, '.') })],
    [/Macintosh/,                                   ()   => ({ name: 'macOS',         version: undefined })],
    [/CrOS/,                                        ()   => ({ name: 'Chrome OS',     version: undefined })],
    [/(?:Ubuntu|Fedora|Debian|Linux)/,              ()   => ({ name: 'Linux',         version: undefined })],
];

const DEVICE_PATTERNS = [
    // iPod UAs contain "CPU iPhone OS …" — keep iPod before iPhone.
    [/iPod/,                                        ()   => ({ vendor: 'Apple',   model: 'iPod',      type: 'mobile' })],
    [/iPad/,                                        ()   => ({ vendor: 'Apple',   model: 'iPad',      type: 'tablet' })],
    [/iPhone/,                                      ()   => ({ vendor: 'Apple',   model: 'iPhone',    type: 'mobile' })],
    [/Macintosh/,                                   ()   => ({ vendor: 'Apple',   model: 'Macintosh', type: undefined })],
    [/(Pixel(?: \d+[a-zA-Z]?(?:\s+Pro)?(?:\s+XL)?)?)/, (m) => ({ vendor: 'Google',  model: m[1],     type: 'mobile' })],
    [/(SM-[A-Z]\w+)/,                               (m) => {
        const isTablet = /^SM-[TX]/.test(m[1]);
        return { vendor: 'Samsung', model: m[1], type: isTablet ? 'tablet' : 'mobile' };
    }],
    [/(?:HUAWEI|Huawei)[ -]([A-Z0-9-]+)/,           (m) => ({ vendor: 'Huawei',  model: m[1],        type: 'mobile' })],
    [/(?:OnePlus|ONEPLUS) ([A-Z0-9-]+)/,            (m) => ({ vendor: 'OnePlus', model: m[1],        type: 'mobile' })],
    [/(?:POCO|Redmi|Mi) ([A-Za-z0-9]+(?: [A-Za-z0-9]+)?)/, (m) => ({ vendor: 'Xiaomi', model: m[1].trim(), type: 'mobile' })],
    [/Windows Phone/,                               ()   => ({ vendor: undefined, model: undefined,  type: 'mobile' })],
];

const CPU_PATTERNS = [
    [/aarch64|arm64/i,                              () => ({ architecture: 'arm64' })],
    [/armv?[5-8]l|armhf|\barm\b/i,                  () => ({ architecture: 'arm'   })],
    [/x86[_-]64|Win64; x64|WOW64|amd64/i,           () => ({ architecture: 'amd64' })],
    [/i[3-6]86|\bx86\b/i,                           () => ({ architecture: 'ia32'  })],
    [/ppc64/i,                                      () => ({ architecture: 'ppc64' })],
    [/\bppc\b/i,                                    () => ({ architecture: 'ppc'   })],
];

// Carry-over of the battle-tested v1 mobile regex (src/braowser.js:69 in v1).
// Used both as the fallback for `device.type` and as the source for the
// `mobile` CSS class in `applyHtmlClasses()`.
const MOBILE_REGEX_A = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
const MOBILE_REGEX_B = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

function isMobileUA(ua) {
    return MOBILE_REGEX_A.test(ua) || MOBILE_REGEX_B.test(ua.substr(0, 4));
}

// ---------------------------------------------------------------------------
// HTML class mapping (kept identical to v1 vocabulary for CSS back-compat)
// ---------------------------------------------------------------------------

const OS_TO_CLASS = {
    'macOS':         'mac',
    'iPadOS':        'ios',
    'iOS':           'ios',
    'Windows':       'windows',
    'Windows Phone': 'windows_phone',
    'Android':       'android',
    'Linux':         'linux',
    'Chrome OS':     'linux',
};

const BROWSER_TO_CLASS = {
    'Edge':             'edge',
    'Opera':            'opera',
    'Samsung Internet': 'samsung-internet',
    'Chromium':         'chrome',
    'Chrome':           'chrome',
    'Firefox':          'firefox',
    'Safari':           'safari',
    'Mobile Safari':    'safari',
    'IE':               'ie',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function matchFirst(ua, table) {
    for (const [regex, map] of table) {
        const m = regex.exec(ua);
        if (m) return map(m);
    }
    return undefined;
}

function majorOf(version) {
    if (!version) return undefined;
    const dot = version.indexOf('.');
    return dot === -1 ? version : version.slice(0, dot);
}

// Chromium-family browsers (Brave, Arc, Vivaldi, Electron, …) ship the same
// "Chrome/X" token as stock Chrome. UA-CH `brands` is the only sync signal
// that lets us tell them apart: stock Chrome's brand list includes
// "Google Chrome"; the others don't.
function isStockChrome() {
    if (typeof navigator === 'undefined') return undefined;
    const brands = navigator.userAgentData?.brands;
    if (!Array.isArray(brands)) return undefined;
    return brands.some((b) => b.brand === 'Google Chrome');
}

function hasTouch() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    return 'ontouchstart' in window
        || (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0)
        || !!navigator.msMaxTouchPoints;
}

function isRetina() {
    return typeof window !== 'undefined' && window.devicePixelRatio >= 2;
}

// iPadOS 13+ ships a desktop-Safari UA. Detect via maxTouchPoints + platform.
function looksLikeIpad() {
    if (typeof navigator === 'undefined') return false;
    return navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1;
}

// Derive `cpu.architecture` from UA-CH `architecture` + `bitness`.
function normalizeArch(architecture, bitness) {
    if (!architecture) return undefined;
    const a = architecture.toLowerCase();
    if (a === 'arm')  return bitness === '64' ? 'arm64' : 'arm';
    if (a === 'x86')  return bitness === '64' ? 'amd64' : 'ia32';
    if (a === 'ppc')  return bitness === '64' ? 'ppc64' : 'ppc';
    return a;
}

// ---------------------------------------------------------------------------
// Braowser class
// ---------------------------------------------------------------------------

export class Braowser {
    /**
     * @param {string} [ua] - Optional UA string. Defaults to navigator.userAgent.
     */
    constructor(ua) {
        if (typeof ua === 'string') {
            this._ua = ua;
        } else if (typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string') {
            this._ua = navigator.userAgent;
        } else {
            this._ua = '';
        }
        this._result = null;
    }

    /** @returns {string} */
    getUA() {
        return this._ua;
    }

    /**
     * @param {string} ua
     * @returns {this}
     */
    setUA(ua) {
        this._ua = ua;
        this._result = null;
        return this;
    }

    /** @returns {IBrowser} */
    getBrowser() {
        const m = matchFirst(this._ua, BROWSER_PATTERNS);
        let name = m?.name;
        const version = m?.version;
        // Refine "Chrome" → "Chromium" when UA-CH brands show this isn't
        // actually Google Chrome (e.g. Brave, Arc, Vivaldi, Electron apps).
        if (name === 'Chrome' && isStockChrome() === false) {
            name = 'Chromium';
        }
        return { name, version, major: majorOf(version) };
    }

    /** @returns {IOS} */
    getOS() {
        const m = matchFirst(this._ua, OS_PATTERNS);
        const base = m ?? { name: undefined, version: undefined };
        if (base.name === 'macOS' && looksLikeIpad()) {
            return { name: 'iPadOS', version: base.version };
        }
        return { name: base.name, version: base.version };
    }

    /** @returns {IEngine} */
    getEngine() {
        const m = matchFirst(this._ua, ENGINE_PATTERNS);
        return m ?? { name: undefined, version: undefined };
    }

    /** @returns {IDevice} */
    getDevice() {
        const m = matchFirst(this._ua, DEVICE_PATTERNS);
        let device = m ?? { vendor: undefined, model: undefined, type: undefined };
        // iPad-as-desktop-Safari fallback (no "iPad" token in UA)
        if (device.model === 'Macintosh' && looksLikeIpad()) {
            device = { vendor: 'Apple', model: 'iPad', type: 'tablet' };
        }
        // Android: the `Mobile` token is the canonical phone/tablet signal.
        // Check this before the broader mobile regex (which considers any
        // `Android` token mobile-class for legacy v1 CSS reasons).
        if (!device.type && /Android/.test(this._ua)) {
            device = { ...device, type: /Mobile/.test(this._ua) ? 'mobile' : 'tablet' };
        }
        // Final fallback for non-Android mobile devices (older feature phones,
        // BlackBerry, etc.) — keep the v1 mobile-regex behaviour.
        if (!device.type && isMobileUA(this._ua)) {
            device = { ...device, type: 'mobile' };
        }
        return device;
    }

    /** @returns {ICPU} */
    getCPU() {
        const m = matchFirst(this._ua, CPU_PATTERNS);
        return m ?? { architecture: undefined };
    }

    /**
     * True if the UA matches a mobile device (phone or mobile-class tablet).
     * Matches the semantics of the `mobile` HTML class — kept consistent with v1.
     * @returns {boolean}
     */
    isMobile() {
        return this.getDevice().type === 'mobile' || isMobileUA(this._ua);
    }

    /**
     * True if the runtime exposes touch capability. In a browser this is a
     * real probe (`ontouchstart` / `maxTouchPoints`). With no `window`
     * available (Node/SSR), falls back to UA-based inference — mobile UAs
     * are assumed touch-capable, desktop UAs are not.
     * @returns {boolean}
     */
    isTouch() {
        if (typeof window !== 'undefined') return hasTouch();
        return this.isMobile();
    }

    /** @returns {IResult} */
    getResult() {
        if (this._result) return this._result;
        this._result = {
            ua:      this._ua,
            browser: this.getBrowser(),
            cpu:     this.getCPU(),
            device:  this.getDevice(),
            engine:  this.getEngine(),
            os:      this.getOS(),
        };
        return this._result;
    }

    /**
     * Async result enriched via `navigator.userAgentData.getHighEntropyValues()`
     * on Chromium. Falls back to the sync result elsewhere.
     * @returns {Promise<IResult>}
     */
    async getResultAsync() {
        const result = { ...this.getResult() };
        const uaData = typeof navigator !== 'undefined' ? navigator.userAgentData : undefined;
        if (!uaData || typeof uaData.getHighEntropyValues !== 'function') return result;

        let hints;
        try {
            hints = await uaData.getHighEntropyValues([
                'architecture', 'bitness', 'fullVersionList', 'platformVersion', 'model',
            ]);
        } catch {
            return result;
        }

        // CPU: combine architecture + bitness into the ua-parser-js vocabulary.
        const arch = normalizeArch(hints.architecture, hints.bitness);
        if (arch) result.cpu = { architecture: arch };

        // OS: high-entropy platformVersion is the real OS version.
        if (hints.platformVersion) {
            result.os = { ...result.os, version: hints.platformVersion };
        }

        // Browser: find the brand matching our detected browser name and use
        // its fullVersionList entry. Update engine.version too — Blink tracks
        // Chrome's full version.
        if (Array.isArray(hints.fullVersionList) && result.browser.name) {
            const wanted = result.browser.name.toLowerCase();
            const brand = hints.fullVersionList.find((b) => {
                const n = b.brand.toLowerCase();
                if (wanted === 'chrome')   return n === 'google chrome';
                if (wanted === 'chromium') return n === 'chromium';
                if (wanted === 'edge')     return n === 'microsoft edge';
                if (wanted === 'opera')    return n === 'opera';
                return n === wanted;
            });
            if (brand) {
                result.browser = { name: result.browser.name, version: brand.version, major: majorOf(brand.version) };
                if (result.engine.name === 'Blink') {
                    result.engine = { ...result.engine, version: brand.version };
                }
            }
        }

        // Device model — useful on mobile.
        if (hints.model) {
            result.device = { ...result.device, model: hints.model };
        }

        return result;
    }

    /**
     * Apply v1-compatible classes (mac, chrome, v-148, mobile, touch, retina, …)
     * to a target element. Idempotent — re-applying does not duplicate classes.
     * No-op when `target` is missing (SSR-safe).
     * @param {Element|null} [target]
     * @returns {this}
     */
    applyHtmlClasses(target) {
        const el = target ?? (typeof document !== 'undefined' ? document.documentElement : null);
        if (!el) return this;

        const r = this.getResult();
        const tokens = [];

        const osClass = r.os.name ? OS_TO_CLASS[r.os.name] : undefined;
        if (osClass) tokens.push(osClass);

        const browserClass = r.browser.name ? BROWSER_TO_CLASS[r.browser.name] : undefined;
        if (browserClass) tokens.push(browserClass);

        if (r.browser.major) tokens.push('v-' + r.browser.major);

        if (r.device.type === 'mobile' || isMobileUA(this._ua)) tokens.push('mobile');
        if (hasTouch()) tokens.push('touch');
        if (isRetina()) tokens.push('retina');

        const existing = new Set((el.className || '').split(/\s+/).filter(Boolean));
        for (const t of tokens) existing.add(t);
        el.className = [...existing].join(' ');

        return this;
    }
}

export default Braowser;
