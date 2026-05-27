import { describe, it, expect, afterEach, vi } from 'vitest';
import { Braowser } from '../src/braowser.js';
import { fixtures } from './fixtures.js';

// ---------------------------------------------------------------------------
// Fixture-driven UA-string tests
// ---------------------------------------------------------------------------

describe('UA-string detection', () => {
    for (const f of fixtures) {
        describe(f.label, () => {
            const result = new Braowser(f.ua).getResult();

            if (f.browser) {
                it('detects browser', () => {
                    expect(result.browser).toEqual(expect.objectContaining(f.browser));
                });
            }
            if (f.engine) {
                it('detects engine', () => {
                    expect(result.engine).toEqual(expect.objectContaining(f.engine));
                });
            }
            if (f.os) {
                it('detects OS', () => {
                    expect(result.os).toEqual(expect.objectContaining(f.os));
                });
            }
            if (f.device) {
                it('detects device', () => {
                    expect(result.device).toEqual(expect.objectContaining(f.device));
                });
            }
            if (f.cpu) {
                it('detects CPU', () => {
                    expect(result.cpu).toEqual(expect.objectContaining(f.cpu));
                });
            }
        });
    }
});

// ---------------------------------------------------------------------------
// Result shape
// ---------------------------------------------------------------------------

describe('getResult() shape', () => {
    it('always returns ua + browser + cpu + device + engine + os keys', () => {
        const r = new Braowser('').getResult();
        expect(Object.keys(r).sort()).toEqual(['browser', 'cpu', 'device', 'engine', 'os', 'ua'].sort());
    });

    it('returns undefined fields for an empty UA — never throws', () => {
        const r = new Braowser('').getResult();
        expect(r.browser.name).toBeUndefined();
        expect(r.os.name).toBeUndefined();
        expect(r.engine.name).toBeUndefined();
        expect(r.device.vendor).toBeUndefined();
        expect(r.cpu.architecture).toBeUndefined();
    });

    it('memoizes the result', () => {
        const b = new Braowser('Mozilla/5.0');
        expect(b.getResult()).toBe(b.getResult()); // same reference
    });
});

// ---------------------------------------------------------------------------
// setUA invalidates the cache; is chainable
// ---------------------------------------------------------------------------

describe('setUA()', () => {
    it('is chainable and invalidates the memoized result', () => {
        const uaA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';
        const uaB = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1';

        const b = new Braowser(uaA);
        expect(b.getResult().os.name).toBe('macOS');

        const returned = b.setUA(uaB);
        expect(returned).toBe(b); // chainable
        expect(b.getResult().os.name).toBe('iOS');
    });
});

// ---------------------------------------------------------------------------
// applyHtmlClasses — keep v1 CSS vocabulary; idempotent; SSR-safe
// ---------------------------------------------------------------------------

describe('applyHtmlClasses()', () => {
    it('emits v1-vocabulary classes for macOS Chrome', () => {
        const el = { className: '' };
        new Braowser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36').applyHtmlClasses(el);
        const classes = el.className.split(/\s+/).filter(Boolean);
        expect(classes).toContain('mac');
        expect(classes).toContain('chrome');
        expect(classes).toContain('v-148');
    });

    it('emits expected classes for IE 11 on Windows 7', () => {
        const el = { className: '' };
        new Braowser('Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko').applyHtmlClasses(el);
        const classes = el.className.split(/\s+/).filter(Boolean);
        expect(classes).toContain('windows');
        expect(classes).toContain('ie');
        expect(classes).toContain('v-11');
    });

    it('emits the mobile class for iPhone Safari', () => {
        const el = { className: '' };
        new Braowser('Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1').applyHtmlClasses(el);
        const classes = el.className.split(/\s+/).filter(Boolean);
        expect(classes).toContain('ios');
        expect(classes).toContain('safari');
        expect(classes).toContain('mobile');
    });

    it('is idempotent — repeat calls do not duplicate classes', () => {
        const el = { className: '' };
        const b = new Braowser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        b.applyHtmlClasses(el);
        const after1 = el.className;
        b.applyHtmlClasses(el);
        expect(el.className).toBe(after1);
    });

    it('preserves preexisting classes on the target element', () => {
        const el = { className: 'app-root dark-theme' };
        new Braowser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36').applyHtmlClasses(el);
        const classes = el.className.split(/\s+/).filter(Boolean);
        expect(classes).toContain('app-root');
        expect(classes).toContain('dark-theme');
        expect(classes).toContain('chrome');
    });

    it('is SSR-safe — no-op when target is null', () => {
        const b = new Braowser('Mozilla/5.0 (Macintosh) Chrome/121.0.0.0');
        expect(() => b.applyHtmlClasses(null)).not.toThrow();
    });

    it('returns the instance for chaining', () => {
        const el = { className: '' };
        const b = new Braowser('Mozilla/5.0 (Macintosh) Chrome/121.0.0.0');
        expect(b.applyHtmlClasses(el)).toBe(b);
    });
});

// ---------------------------------------------------------------------------
// isMobile / isTouch
// ---------------------------------------------------------------------------

describe('isMobile()', () => {
    it.each([
        ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36', false],
        ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',       false],
        ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1', true],
        ['Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',          true],
        ['Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',                    true],
        ['Mozilla/5.0 (Linux; Android 14; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',                   true],
    ])('isMobile(%s) === %s', (ua, expected) => {
        expect(new Braowser(ua).isMobile()).toBe(expected);
    });
});

describe('isTouch()', () => {
    it('returns false in Node for a desktop UA (no window, isMobile=false)', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';
        expect(new Braowser(ua).isTouch()).toBe(false);
    });

    it('falls back to isMobile() in SSR — true for mobile UAs', () => {
        const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1';
        expect(new Braowser(ua).isTouch()).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// getResultAsync — UA-CH enrichment
// ---------------------------------------------------------------------------

describe('getResultAsync()', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('resolves to the sync result when navigator.userAgentData is missing', async () => {
        // Node has no `navigator` global by default.
        const b = new Braowser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        const sync = b.getResult();
        await expect(b.getResultAsync()).resolves.toEqual(sync);
    });

    it('enriches the result via getHighEntropyValues()', async () => {
        vi.stubGlobal('navigator', {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            userAgentData: {
                brands: [
                    { brand: 'Google Chrome', version: '121' },
                    { brand: 'Chromium',      version: '121' },
                    { brand: 'Not.A/Brand',   version: '99'  },
                ],
                getHighEntropyValues: async () => ({
                    architecture:     'arm',
                    bitness:          '64',
                    fullVersionList: [
                        { brand: 'Google Chrome', version: '121.0.6167.184' },
                        { brand: 'Chromium',      version: '121.0.6167.184' },
                    ],
                    platformVersion:  '14.4.0',
                    model:            '',
                }),
            },
        });

        const b = new Braowser();
        const r = await b.getResultAsync();
        expect(r.cpu.architecture).toBe('arm64');
        expect(r.os.version).toBe('14.4.0');
        expect(r.browser.version).toBe('121.0.6167.184');
        expect(r.browser.major).toBe('121');
        expect(r.engine.version).toBe('121.0.6167.184');
    });

    it('returns the sync result if getHighEntropyValues() rejects', async () => {
        vi.stubGlobal('navigator', {
            userAgent: 'Mozilla/5.0 (Macintosh) Chrome/121.0.0.0',
            userAgentData: {
                brands: [{ brand: 'Google Chrome', version: '121' }],
                getHighEntropyValues: () => Promise.reject(new Error('user denied')),
            },
        });

        const b = new Braowser();
        const sync = b.getResult();
        const r = await b.getResultAsync();
        expect(r).toEqual(sync);
    });
});

// ---------------------------------------------------------------------------
// Chromium-via-UA-CH brand refinement
// ---------------------------------------------------------------------------

describe('Chrome ↔ Chromium refinement via UA-CH brands', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    const chromeUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

    it('reports Chrome when brands include Google Chrome', () => {
        vi.stubGlobal('navigator', {
            userAgentData: {
                brands: [
                    { brand: 'Google Chrome', version: '121' },
                    { brand: 'Chromium',      version: '121' },
                    { brand: 'Not.A/Brand',   version: '99'  },
                ],
            },
        });
        expect(new Braowser(chromeUA).getBrowser().name).toBe('Chrome');
    });

    it('reports Chromium when brands lack Google Chrome (Brave, Arc, etc.)', () => {
        vi.stubGlobal('navigator', {
            userAgentData: {
                brands: [
                    { brand: 'Brave',       version: '121' },
                    { brand: 'Chromium',    version: '121' },
                    { brand: 'Not.A/Brand', version: '99'  },
                ],
            },
        });
        expect(new Braowser(chromeUA).getBrowser().name).toBe('Chromium');
    });

    it('keeps name "Chrome" when navigator is unavailable (Node/SSR)', () => {
        expect(new Braowser(chromeUA).getBrowser().name).toBe('Chrome');
    });
});

// ---------------------------------------------------------------------------
// iPad-as-desktop-Safari heuristic (iPadOS 13+)
// ---------------------------------------------------------------------------

describe('iPadOS-via-MacIntel heuristic', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('reclassifies a macOS-Safari UA as iPadOS when platform=MacIntel + maxTouchPoints>1', () => {
        vi.stubGlobal('navigator', {
            platform:        'MacIntel',
            maxTouchPoints:  5,
        });
        const desktopSafariUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15';
        const b = new Braowser(desktopSafariUA);
        expect(b.getOS().name).toBe('iPadOS');
        expect(b.getDevice()).toEqual({ vendor: 'Apple', model: 'iPad', type: 'tablet' });
    });

    it('leaves the desktop-Safari UA as macOS when maxTouchPoints is 0', () => {
        vi.stubGlobal('navigator', {
            platform:        'MacIntel',
            maxTouchPoints:  0,
        });
        const desktopSafariUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15';
        expect(new Braowser(desktopSafariUA).getOS().name).toBe('macOS');
    });
});
