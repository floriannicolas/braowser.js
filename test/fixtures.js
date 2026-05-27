// Real-world UA strings covering desktop + mobile + tablet across every
// browser, OS, engine and CPU architecture the library can detect.
//
// Each entry asserts only the fields that matter for that fixture — the test
// uses `expect.objectContaining`, so omitted fields are not checked.

export const fixtures = [
    // =======================================================================
    // DESKTOP — Chrome
    // =======================================================================

    {
        label: 'Chrome 121 / macOS',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',  major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'macOS',   version: '10.15.7' },
        device:  { vendor: 'Apple', model: 'Macintosh', type: undefined },
    },
    {
        label: 'Chrome 130 / macOS 14',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',  major: '130' },
        os:      { name: 'macOS',   version: '14.4.0' },
    },
    {
        label: 'Chrome 144 / Windows 11',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',  major: '144' },
        os:      { name: 'Windows', version: '10' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Chrome 121 / Windows 11',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',  major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Windows', version: '10' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Chrome 110 / Windows 8.1',
        ua: 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        browser: { name: 'Chrome', major: '110' },
        os:      { name: 'Windows', version: '8.1' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Chrome 90 / Windows 8',
        ua: 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        browser: { name: 'Chrome', major: '90' },
        os:      { name: 'Windows', version: '8' },
    },
    {
        label: 'Chrome 121 / Windows 7',
        ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',  major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Windows', version: '7' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Chrome 60 / Windows Vista',
        ua: 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
        browser: { name: 'Chrome', major: '60' },
        os:      { name: 'Windows', version: 'Vista' },
    },
    {
        label: 'Chrome 121 / Linux x86_64',
        ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome', major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Linux' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Chrome 115 / Linux i686',
        ua: 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        browser: { name: 'Chrome', major: '115' },
        os:      { name: 'Linux' },
        cpu:     { architecture: 'ia32' },
    },
    {
        label: 'Chrome 121 / Chrome OS',
        ua: 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome', major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Chrome OS' },
        cpu:     { architecture: 'amd64' },
    },

    // =======================================================================
    // DESKTOP — Chromium (explicit token)
    // =======================================================================

    {
        label: 'Chromium 121 / Linux',
        ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/121.0.0.0 Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chromium', major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Linux' },
    },
    {
        label: 'Chromium 100 / Ubuntu',
        ua: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/100.0.4896.127 Chrome/100.0.4896.127 Safari/537.36',
        browser: { name: 'Chromium', major: '100' },
        os:      { name: 'Linux' },
    },

    // =======================================================================
    // DESKTOP — Edge (Chromium + EdgeHTML)
    // =======================================================================

    {
        label: 'Edge 121 / Windows 11',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
        browser: { name: 'Edge',    major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Windows', version: '10' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Edge 122 / Linux',
        ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
        browser: { name: 'Edge',   major: '122' },
        os:      { name: 'Linux' },
    },
    {
        label: 'Edge 121 / macOS',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
        browser: { name: 'Edge',    major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'macOS' },
        device:  { vendor: 'Apple', model: 'Macintosh' },
    },
    {
        label: 'Edge 80 / macOS (early Chromium-Edge)',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 Edg/80.0.361.66',
        browser: { name: 'Edge', major: '80' },
        os:      { name: 'macOS' },
    },
    {
        label: 'Old Edge 18 / Windows 10 (EdgeHTML)',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/18.18363',
        browser: { name: 'Edge',     major: '18' },
        engine:  { name: 'EdgeHTML', version: '18.18363' },
        os:      { name: 'Windows',  version: '10' },
    },
    {
        label: 'Old Edge 14 / Windows 10 (EdgeHTML)',
        ua: 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
        browser: { name: 'Edge',     major: '14' },
        engine:  { name: 'EdgeHTML', version: '14.14393' },
        os:      { name: 'Windows', version: '10' },
    },

    // =======================================================================
    // DESKTOP — Firefox
    // =======================================================================

    {
        label: 'Firefox 124 / macOS',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.4; rv:124.0) Gecko/20100101 Firefox/124.0',
        browser: { name: 'Firefox', major: '124' },
        engine:  { name: 'Gecko' },
        os:      { name: 'macOS' },
    },
    {
        label: 'Firefox 100 / macOS',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
        browser: { name: 'Firefox', major: '100' },
        engine:  { name: 'Gecko' },
        os:      { name: 'macOS' },
    },
    {
        label: 'Firefox 124 / Windows 11',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
        browser: { name: 'Firefox', major: '124' },
        engine:  { name: 'Gecko' },
        os:      { name: 'Windows', version: '10' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Firefox 60 ESR / Windows 7',
        ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0',
        browser: { name: 'Firefox', major: '60' },
        os:      { name: 'Windows', version: '7' },
    },
    {
        label: 'Firefox 124 / Ubuntu',
        ua: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0',
        browser: { name: 'Firefox', major: '124' },
        engine:  { name: 'Gecko' },
        os:      { name: 'Linux' },
        cpu:     { architecture: 'amd64' },
    },
    {
        label: 'Firefox 124 / Linux i686',
        ua: 'Mozilla/5.0 (X11; Linux i686; rv:124.0) Gecko/20100101 Firefox/124.0',
        browser: { name: 'Firefox', major: '124' },
        os:      { name: 'Linux' },
        cpu:     { architecture: 'ia32' },
    },
    {
        label: 'Firefox 78 ESR / Linux',
        ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0',
        browser: { name: 'Firefox', major: '78' },
        os:      { name: 'Linux' },
    },

    // =======================================================================
    // DESKTOP — Safari
    // =======================================================================

    {
        label: 'Safari 17 / macOS',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
        browser: { name: 'Safari',  major: '17' },
        engine:  { name: 'WebKit' },
        os:      { name: 'macOS' },
        device:  { vendor: 'Apple', model: 'Macintosh' },
    },
    {
        label: 'Safari 16 / macOS',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15',
        browser: { name: 'Safari', major: '16' },
        os:      { name: 'macOS' },
    },
    {
        label: 'Safari 15 / macOS Big Sur',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15',
        browser: { name: 'Safari', major: '15' },
        os:      { name: 'macOS', version: '11.6' },
    },
    {
        label: 'Safari 13 / macOS Mojave',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
        browser: { name: 'Safari', major: '13' },
        os:      { name: 'macOS', version: '10.14.6' },
    },
    {
        label: 'Safari 11 / macOS El Capitan',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/11.0.3 Safari/603.3.8',
        browser: { name: 'Safari', major: '11' },
        os:      { name: 'macOS', version: '10.11.6' },
    },

    // =======================================================================
    // DESKTOP — Opera
    // =======================================================================

    {
        label: 'Opera 109 / Windows',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/109.0.0.0',
        browser: { name: 'Opera',   major: '109' },
        engine:  { name: 'Blink' },
        os:      { name: 'Windows', version: '10' },
    },
    {
        label: 'Opera 95 / Linux',
        ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 OPR/95.0.0.0',
        browser: { name: 'Opera', major: '95' },
        os:      { name: 'Linux' },
    },
    {
        label: 'Opera 80 / macOS',
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 OPR/80.0.4170.16',
        browser: { name: 'Opera', major: '80' },
        os:      { name: 'macOS' },
    },
    {
        label: 'Old Opera 12 / Windows (Presto)',
        ua: 'Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.18',
        browser: { name: 'Opera',  major: '9' },
        engine:  { name: 'Presto', version: '2.12.388' },
        os:      { name: 'Windows', version: '7' },
    },

    // =======================================================================
    // DESKTOP — Internet Explorer
    // =======================================================================

    {
        label: 'IE 11 / Windows 7 (Trident + rv)',
        ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
        browser: { name: 'IE',      major: '11' },
        engine:  { name: 'Trident', version: '7.0' },
        os:      { name: 'Windows', version: '7' },
    },
    {
        label: 'IE 10 / Windows 7',
        ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
        browser: { name: 'IE',      major: '10' },
        engine:  { name: 'Trident', version: '6.0' },
        os:      { name: 'Windows', version: '7' },
    },
    {
        label: 'IE 9 / Windows 7',
        ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
        browser: { name: 'IE',      major: '9' },
        engine:  { name: 'Trident', version: '5.0' },
        os:      { name: 'Windows', version: '7' },
    },
    {
        label: 'IE 8 / Windows XP',
        ua: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
        browser: { name: 'IE',      major: '8' },
        engine:  { name: 'Trident', version: '4.0' },
        os:      { name: 'Windows', version: 'XP' },
    },
    {
        label: 'IE 7 / Windows XP',
        ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        browser: { name: 'IE',      major: '7' },
        os:      { name: 'Windows', version: 'XP' },
    },
    {
        label: 'IE 6 / Windows XP',
        ua: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)',
        browser: { name: 'IE',      major: '6' },
        os:      { name: 'Windows', version: 'XP' },
    },

    // =======================================================================
    // iOS — iPhone Safari, various versions
    // =======================================================================

    {
        label: 'Mobile Safari / iPhone iOS 18',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '18' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS',     version: '18.0' },
        device:  { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
    },
    {
        label: 'Mobile Safari / iPhone iOS 17',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '17' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS',           version: '17.4' },
        device:  { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
    },
    {
        label: 'Mobile Safari / iPhone iOS 16',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '16' },
        os:      { name: 'iOS',          version: '16.6' },
        device:  { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
    },
    {
        label: 'Mobile Safari / iPhone iOS 15',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '15' },
        os:      { name: 'iOS',          version: '15.7' },
        device:  { vendor: 'Apple', model: 'iPhone' },
    },
    {
        label: 'Mobile Safari / iPhone iOS 14',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '14' },
        os:      { name: 'iOS', version: '14.7.1' },
        device:  { vendor: 'Apple', model: 'iPhone' },
    },
    {
        label: 'Mobile Safari / iPhone iOS 13',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '13' },
        os:      { name: 'iOS', version: '13.6' },
        device:  { vendor: 'Apple', model: 'iPhone' },
    },

    // =======================================================================
    // iOS — iPad Safari, various versions
    // =======================================================================

    {
        label: 'Mobile Safari / iPad iOS 17',
        ua: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS', version: '17.4' },
        device:  { vendor: 'Apple', model: 'iPad', type: 'tablet' },
    },
    {
        label: 'Mobile Safari / iPad iOS 16',
        ua: 'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '16' },
        os:      { name: 'iOS', version: '16.6' },
        device:  { vendor: 'Apple', model: 'iPad', type: 'tablet' },
    },
    {
        label: 'Mobile Safari / iPad iOS 15',
        ua: 'Mozilla/5.0 (iPad; CPU OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '15' },
        os:      { name: 'iOS', version: '15.7' },
        device:  { vendor: 'Apple', model: 'iPad', type: 'tablet' },
    },
    {
        label: 'Mobile Safari / iPad iOS 18',
        ua: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari', major: '18' },
        os:      { name: 'iOS', version: '18.0' },
        device:  { vendor: 'Apple', model: 'iPad', type: 'tablet' },
    },

    // =======================================================================
    // iOS — iPod
    // =======================================================================

    {
        label: 'Mobile Safari / iPod touch',
        ua: 'Mozilla/5.0 (iPod touch; CPU iPhone OS 15_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/604.1',
        browser: { name: 'Mobile Safari' },
        os:      { name: 'iOS', version: '15.7.8' },
        device:  { vendor: 'Apple', model: 'iPod', type: 'mobile' },
    },

    // =======================================================================
    // iOS — in-app browser variants (all engine = WebKit)
    // =======================================================================

    {
        label: 'Chrome on iOS (CriOS)',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/121.0.6167.66 Mobile/15E148 Safari/604.1',
        browser: { name: 'Chrome',   major: '121' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS',     version: '17.4' },
        device:  { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
    },
    {
        label: 'Chrome on iPad (CriOS)',
        ua: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/121.0.6167.66 Mobile/15E148 Safari/604.1',
        browser: { name: 'Chrome',  major: '121' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS',    version: '17.4' },
        device:  { vendor: 'Apple', model: 'iPad', type: 'tablet' },
    },
    {
        label: 'Firefox on iOS (FxiOS)',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/124.0 Mobile/15E148 Safari/605.1.15',
        browser: { name: 'Firefox', major: '124' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS' },
        device:  { vendor: 'Apple', model: 'iPhone' },
    },
    {
        label: 'Edge on iOS (EdgiOS)',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 EdgiOS/121.0.0.0 Mobile/15E148 Safari/604.1',
        browser: { name: 'Edge',    major: '121' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS' },
        device:  { vendor: 'Apple', model: 'iPhone' },
    },
    {
        label: 'Opera on iOS (OPiOS)',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 OPiOS/16.0.14.123484 Mobile/15E148 Safari/9537.53',
        browser: { name: 'Opera',   major: '16' },
        engine:  { name: 'WebKit' },
        os:      { name: 'iOS' },
        device:  { vendor: 'Apple', model: 'iPhone' },
    },

    // =======================================================================
    // ANDROID — Google Pixel, various generations
    // =======================================================================

    {
        label: 'Chrome / Pixel 8 Pro / Android 14',
        ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '14' },
        device:  { vendor: 'Google', model: 'Pixel 8 Pro', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 8 / Android 14',
        ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '14' },
        device:  { vendor: 'Google', model: 'Pixel 8', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 7 / Android 14',
        ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Android', version: '14' },
        device:  { vendor: 'Google', model: 'Pixel 7', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 6 / Android 13',
        ua: 'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '110' },
        os:      { name: 'Android', version: '13' },
        device:  { vendor: 'Google', model: 'Pixel 6', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 5 / Android 12',
        ua: 'Mozilla/5.0 (Linux; Android 12; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '100' },
        os:      { name: 'Android', version: '12' },
        device:  { vendor: 'Google', model: 'Pixel 5', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 4 / Android 11',
        ua: 'Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '95' },
        os:      { name: 'Android', version: '11' },
        device:  { vendor: 'Google', model: 'Pixel 4', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 3 / Android 10',
        ua: 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '87' },
        os:      { name: 'Android', version: '10' },
        device:  { vendor: 'Google', model: 'Pixel 3', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 2 / Android 9',
        ua: 'Mozilla/5.0 (Linux; Android 9; Pixel 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '80' },
        os:      { name: 'Android', version: '9' },
        device:  { vendor: 'Google', model: 'Pixel 2', type: 'mobile' },
    },
    {
        label: 'Chrome / Pixel 6a / Android 13',
        ua: 'Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '115' },
        os:      { name: 'Android', version: '13' },
        device:  { vendor: 'Google', model: 'Pixel 6a', type: 'mobile' },
    },

    // =======================================================================
    // ANDROID — Samsung Galaxy phones + tablets
    // =======================================================================

    {
        label: 'Chrome / Samsung Galaxy S22 / Android 14',
        ua: 'Mozilla/5.0 (Linux; Android 14; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '121' },
        os:      { name: 'Android',   version: '14' },
        device:  { vendor: 'Samsung', model: 'SM-S901B', type: 'mobile' },
    },
    {
        label: 'Chrome / Samsung Galaxy S23 / Android 13',
        ua: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '110' },
        os:      { name: 'Android',   version: '13' },
        device:  { vendor: 'Samsung', model: 'SM-S911B', type: 'mobile' },
    },
    {
        label: 'Chrome / Samsung Galaxy S20 / Android 11',
        ua: 'Mozilla/5.0 (Linux; Android 11; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '95' },
        os:      { name: 'Android',   version: '11' },
        device:  { vendor: 'Samsung', model: 'SM-G981B', type: 'mobile' },
    },
    {
        label: 'Chrome / Samsung Galaxy A54 / Android 14',
        ua: 'Mozilla/5.0 (Linux; Android 14; SM-A546B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '121' },
        os:      { name: 'Android',   version: '14' },
        device:  { vendor: 'Samsung', model: 'SM-A546B', type: 'mobile' },
    },
    {
        label: 'Chrome / Samsung Galaxy Note 20 / Android 12',
        ua: 'Mozilla/5.0 (Linux; Android 12; SM-N981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '100' },
        os:      { name: 'Android',   version: '12' },
        device:  { vendor: 'Samsung', model: 'SM-N981B', type: 'mobile' },
    },
    {
        label: 'Chrome / Samsung Galaxy S10 / Android 9',
        ua: 'Mozilla/5.0 (Linux; Android 9; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.111 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '76' },
        os:      { name: 'Android',   version: '9' },
        device:  { vendor: 'Samsung', model: 'SM-G973F', type: 'mobile' },
    },
    {
        label: 'Chrome / Samsung Galaxy Tab S8 / Android 13 (tablet)',
        ua: 'Mozilla/5.0 (Linux; Android 13; SM-X800) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',    major: '121' },
        os:      { name: 'Android',   version: '13' },
        device:  { vendor: 'Samsung', model: 'SM-X800', type: 'tablet' },
    },
    {
        label: 'Chrome / Samsung Galaxy Tab S9 Ultra / Android 14',
        ua: 'Mozilla/5.0 (Linux; Android 14; SM-X910) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',    major: '121' },
        os:      { name: 'Android',   version: '14' },
        device:  { vendor: 'Samsung', model: 'SM-X910', type: 'tablet' },
    },
    {
        label: 'Chrome / Samsung Galaxy Tab A8 / Android 11 (tablet)',
        ua: 'Mozilla/5.0 (Linux; Android 11; SM-X200) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Safari/537.36',
        browser: { name: 'Chrome',    major: '95' },
        os:      { name: 'Android',   version: '11' },
        device:  { vendor: 'Samsung', model: 'SM-X200', type: 'tablet' },
    },
    {
        label: 'Samsung Internet / Galaxy S22',
        ua: 'Mozilla/5.0 (Linux; Android 14; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Samsung Internet', major: '23' },
        engine:  { name: 'Blink' },
        os:      { name: 'Android', version: '14' },
        device:  { vendor: 'Samsung', model: 'SM-S901B', type: 'mobile' },
    },
    {
        label: 'Samsung Internet 19 / Galaxy S10',
        ua: 'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/19.0 Chrome/102.0.5005.125 Mobile Safari/537.36',
        browser: { name: 'Samsung Internet', major: '19' },
        os:      { name: 'Android', version: '12' },
        device:  { vendor: 'Samsung', model: 'SM-G973F', type: 'mobile' },
    },

    // =======================================================================
    // ANDROID — Xiaomi
    // =======================================================================

    {
        label: 'Chrome / Xiaomi Redmi Note 11 / Android 12',
        ua: 'Mozilla/5.0 (Linux; Android 12; Redmi Note 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '12' },
        device:  { vendor: 'Xiaomi', type: 'mobile' },
    },
    {
        label: 'Chrome / Xiaomi Redmi Note 12 / Android 13',
        ua: 'Mozilla/5.0 (Linux; Android 13; Redmi Note 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '13' },
        device:  { vendor: 'Xiaomi', type: 'mobile' },
    },
    {
        label: 'Chrome / Xiaomi POCO X5 / Android 13',
        ua: 'Mozilla/5.0 (Linux; Android 13; POCO X5 5G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '13' },
        device:  { vendor: 'Xiaomi', type: 'mobile' },
    },
    {
        label: 'Chrome / Xiaomi POCO F4 / Android 12',
        ua: 'Mozilla/5.0 (Linux; Android 12; POCO F4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '110' },
        os:      { name: 'Android', version: '12' },
        device:  { vendor: 'Xiaomi', type: 'mobile' },
    },
    {
        label: 'Chrome / Xiaomi Mi 11 / Android 12',
        ua: 'Mozilla/5.0 (Linux; Android 12; Mi 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '108' },
        os:      { name: 'Android', version: '12' },
        device:  { vendor: 'Xiaomi', type: 'mobile' },
    },

    // =======================================================================
    // ANDROID — Huawei
    // =======================================================================

    {
        label: 'Chrome / Huawei VOG-L29 (P30 Pro) / Android 10',
        ua: 'Mozilla/5.0 (Linux; Android 10; HUAWEI VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '10' },
        device:  { vendor: 'Huawei', model: 'VOG-L29', type: 'mobile' },
    },
    {
        label: 'Chrome / Huawei NOH-NX9 (Mate 40) / Android 11',
        ua: 'Mozilla/5.0 (Linux; Android 11; HUAWEI NOH-NX9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '110' },
        os:      { name: 'Android', version: '11' },
        device:  { vendor: 'Huawei', model: 'NOH-NX9', type: 'mobile' },
    },

    // =======================================================================
    // ANDROID — OnePlus
    // =======================================================================

    {
        label: 'Chrome / OnePlus LE2123 (10 Pro) / Android 13',
        ua: 'Mozilla/5.0 (Linux; Android 13; OnePlus LE2123) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '121' },
        os:      { name: 'Android',  version: '13' },
        device:  { vendor: 'OnePlus', model: 'LE2123', type: 'mobile' },
    },
    {
        label: 'Chrome / OnePlus IN2023 (8 Pro) / Android 12',
        ua: 'Mozilla/5.0 (Linux; Android 12; OnePlus IN2023) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',    major: '108' },
        os:      { name: 'Android',  version: '12' },
        device:  { vendor: 'OnePlus', model: 'IN2023', type: 'mobile' },
    },

    // =======================================================================
    // ANDROID — non-Chrome browsers
    // =======================================================================

    {
        label: 'Edge on Android (EdgA) / Pixel 7',
        ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36 EdgA/121.0.0.0',
        browser: { name: 'Edge',     major: '121' },
        engine:  { name: 'Blink' },
        os:      { name: 'Android', version: '14' },
        device:  { vendor: 'Google', model: 'Pixel 7', type: 'mobile' },
    },
    {
        label: 'Edge on Android (EdgA) / Samsung Galaxy S22',
        ua: 'Mozilla/5.0 (Linux; Android 14; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36 EdgA/121.0.0.0',
        browser: { name: 'Edge',     major: '121' },
        os:      { name: 'Android', version: '14' },
        device:  { vendor: 'Samsung', model: 'SM-S901B', type: 'mobile' },
    },
    {
        label: 'Firefox on Android / mobile',
        ua: 'Mozilla/5.0 (Android 14; Mobile; rv:124.0) Gecko/124.0 Firefox/124.0',
        browser: { name: 'Firefox', major: '124' },
        engine:  { name: 'Gecko' },
        os:      { name: 'Android', version: '14' },
        device:  { type: 'mobile' },
    },
    {
        label: 'Firefox on Android / older',
        ua: 'Mozilla/5.0 (Android 11; Mobile; rv:100.0) Gecko/100.0 Firefox/100.0',
        browser: { name: 'Firefox', major: '100' },
        engine:  { name: 'Gecko' },
        os:      { name: 'Android', version: '11' },
        device:  { type: 'mobile' },
    },
    {
        label: 'Firefox on Android tablet',
        ua: 'Mozilla/5.0 (Android 13; Tablet; rv:124.0) Gecko/124.0 Firefox/124.0',
        browser: { name: 'Firefox', major: '124' },
        os:      { name: 'Android', version: '13' },
        device:  { type: 'tablet' },
    },
    {
        label: 'Opera on Android (OPR) / Pixel',
        ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36 OPR/76.0.4017.74308',
        browser: { name: 'Opera',    major: '76' },
        engine:  { name: 'Blink' },
        os:      { name: 'Android', version: '14' },
        device:  { vendor: 'Google', model: 'Pixel 7', type: 'mobile' },
    },

    // =======================================================================
    // ANDROID — generic + various Android versions
    // =======================================================================

    {
        label: 'Generic Android tablet (no Mobile token, no known model)',
        ua: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '13' },
        device:  { vendor: undefined, model: undefined, type: 'tablet' },
    },
    {
        label: 'Generic Android phone (Mobile token, no known model)',
        ua: 'Mozilla/5.0 (Linux; Android 12; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
        browser: { name: 'Chrome',   major: '121' },
        os:      { name: 'Android', version: '12' },
        device:  { type: 'mobile' },
    },
    {
        label: 'Chrome 80 / Android 9 / generic phone',
        ua: 'Mozilla/5.0 (Linux; Android 9; Generic) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36',
        browser: { name: 'Chrome',  major: '80' },
        os:      { name: 'Android', version: '9' },
        device:  { type: 'mobile' },
    },
    {
        label: 'Chrome 60 / Android 7 / generic',
        ua: 'Mozilla/5.0 (Linux; Android 7.0; Nexus) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Mobile Safari/537.36',
        browser: { name: 'Chrome',  major: '60' },
        os:      { name: 'Android', version: '7.0' },
        device:  { type: 'mobile' },
    },
    {
        label: 'Chrome 50 / Android 6 / generic',
        ua: 'Mozilla/5.0 (Linux; Android 6.0.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Mobile Safari/537.36',
        browser: { name: 'Chrome',  major: '50' },
        os:      { name: 'Android', version: '6.0.1' },
        device:  { type: 'mobile' },
    },
    {
        label: 'Chrome 40 / Android 5 / generic',
        ua: 'Mozilla/5.0 (Linux; Android 5.0.2; Nexus) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Mobile Safari/537.36',
        browser: { name: 'Chrome',  major: '40' },
        os:      { name: 'Android', version: '5.0.2' },
        device:  { type: 'mobile' },
    },

    // =======================================================================
    // WINDOWS PHONE
    // =======================================================================

    {
        label: 'IE Mobile / Lumia 520 / Windows Phone 8.1',
        ua: 'Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537',
        engine:  { name: 'Trident' },
        os:      { name: 'Windows Phone', version: '8.1' },
        device:  { type: 'mobile' },
        cpu:     { architecture: 'arm' },
    },
    {
        label: 'IE Mobile 10 / Windows Phone 8',
        ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
        browser: { name: 'IE',  major: '10' },
        engine:  { name: 'Trident', version: '6.0' },
        os:      { name: 'Windows Phone', version: '8.0' },
        device:  { type: 'mobile' },
    },

    // =======================================================================
    // CPU architecture coverage (synthetic but realistic)
    // =======================================================================

    {
        label: 'Linux aarch64 / Firefox',
        ua: 'Mozilla/5.0 (X11; Linux aarch64; rv:124.0) Gecko/20100101 Firefox/124.0',
        os:      { name: 'Linux' },
        cpu:     { architecture: 'arm64' },
    },
    {
        label: 'Linux armv7l / Firefox',
        ua: 'Mozilla/5.0 (X11; Linux armv7l; rv:124.0) Gecko/20100101 Firefox/124.0',
        os:      { name: 'Linux' },
        cpu:     { architecture: 'arm' },
    },
    {
        label: 'Windows 10 WOW64 / Firefox (legacy 32-bit Firefox on 64-bit Windows)',
        ua: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:115.0) Gecko/20100101 Firefox/115.0',
        os:      { name: 'Windows', version: '10' },
        cpu:     { architecture: 'amd64' },
    },
];
