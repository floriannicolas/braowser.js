# braowser.js

### A very simple javascript plugin for browser detection who just add related classes to html element.

braowser.js can detect : 

* Operating system
* Mobile or Touch Screen
* Browser
* Browser version
* Screen resolution


## Current version : 1.0.10

### What's new in the latest version : 

- ES6 import compatibility
- npm package created

## Examples : 

```html
<html class="mac firefox v-48 retina">
```
```html
<html class="windows ie v-9">
```

## How to use it

To use braowser.js just add this following line in your head element (braowser.js doesn't need jquery or something else to work).

```html
<script type="text/javascript" src="/path/to/braowser.min.js"></script>
```

Or using npm

```bash
npm install braowser
```

That's it!




## Documentation

#### Operating systems detected :
* mac 
* windows
* linux
* windows_phone
* android
* ios

#### Mobile or Touch Screen detected :
* if mobile is detected braowser.js add "mobile" class to html element.
* if touch screen is detected braowser.js add "touch" class to html element.

#### Browsers detected :
* chrome
* safari 
* firefox
* edge
* ie
* opera

#### Screen resolution :

if devicePixelRatio >= 2 braowser.js add "retina" class to html element.


### Examples of usecases in CSS

```css
html.ie.v-8{
    border: 1px solid #999;
}

html.safari,
html.chrome{
	-webkit-font-smoothing: subpixel-antialiased;
}

html.retina{
	background-image:url(image@2x.png);
}
```

### Examples of usecases in Javascript

```javascript
// Only javascript
if((' ' + document.documentElement.className + ' ').indexOf('ie v-8') > -1){
	// Do something if browser is IE8
}

// With braowser function (purely javascript)
if(braowser_hasClass('ie v-8')){
	// Do something if browser is IE8
}

// with jQuery or Zepto
if($('html').hasClass('ie v-8')){
	// Do something if browser is IE8
}

// With ES6 import
import braowser_init, braowser_hasClass from "braowser";
// then you can use :
if(braowser_hasClass('ie v-8')){
	// Do something if browser is IE8
}
// or use braowser_init to launch braowser again (this function is launched by default) 
braowser_init();
```



## Contribute

We're always looking for:

* Bug reports, especially those for aspects with a reduced test case
* Pull requests for features, spelling errors, clarifications, etc.
* Ideas for enhancements


