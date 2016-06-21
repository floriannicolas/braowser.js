/*!
 Braowser - 1.0.0
 Copyright © 2016 Florian Nicolas
 Licensed under the MIT license.
 https://github.com/ticlekiwi/braowser.js
 !*/

var classes = '';
var os = navigator.platform;
var vendor = navigator.vendor;
var user_agent = navigator.userAgent;
var version = null;
var name = '';

/* Get operating system
 ----------------------------------------------------------------------------------------*/

if (/Mac/.test(os)) {
    classes += " mac";
} else if (/Linux/.test(os)) {
    classes += " linux";

} else if (/Win/.test(os)) {
    classes += " windows";
}

/* Get browser
 ----------------------------------------------------------------------------------------*/

if (/Apple/.test(vendor)) {
    name = 'Safari';
    classes += " safari";
} else if (/Google/.test(vendor)){
    name = 'Chrome';
    classes += " chrome";
} else if (/Firefox/.test(user_agent)) {
    name = 'Firefox';
    classes += " firefox";
} else if (/Edge/.test(user_agent)) {
    name = 'Edge';
    classes += " edge";
} else if (/MSIE/.test(user_agent)) {
    name = 'Internet Explorer';
    classes += " ie";
    version = user_agent.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/);
} else if (/Gecko|Mozilla/.test(user_agent)) {
    name = 'Mozilla';
    version = user_agent.match(/rv:(\d+(?:\.\d+)+)/);
} else if (window.opera != undefined) {
    name = 'Opera';
    classes += " opera";
}
if (!version) {
    var regex = new RegExp(name + '(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)');
    var result = user_agent.match(regex);
    version = parseFloat(result[1]);
}
if (name == 'Mozilla' && version >= 6 && version <= 12) {
    classes += " ie";
}

classes += " v-" + version;

/* Check if is retina
 ----------------------------------------------------------------------------------------*/

if (window.devicePixelRatio >= 2) {
    classes += " retina";
} 

/* Add Classes
 ----------------------------------------------------------------------------------------*/

document.documentElement.className += classes;
console.log('braowser.js : ' + classes);




