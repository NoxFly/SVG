# SVG library

### current CDN link:
```js
<script src='https://cdn.jsdelivr.net/gh/NoxFly/SVG/svg.min.js'></script>
```

I'll add it on npm and unpkg soon.

**Works without Jquery**

other cool library: [Drag & Drop library](http://github.com/NoxFly/Drag-and-Drop)

### Usage

```js
var svg = new SVG('name', width, height, backgroundColor); // elem can be .class, #id or tag name
// all these elements are now draggable !
```

## Methods

```js
// SVG :
draw()       // display the svg on the screen
reset()      // remove all data from SVG (on the screen) --> to undisplay SVG
remove()     // remove an element from SVG data, or remove all from SVG data (but still display)

// ELEMENTS ON SVG :
line(x1, y1, x2, y2, strokeColor, strokeWidth)
polyline([[x1,y1],[x2,y2]], backgroundColor, strokeColor, strokeWidth)   
circle(x, y, r, backgroundColor, strokeColor, strokeWidth)  
ellipse(x, y, rx, ry, backgroundColor, strokeColor, strokeWidth)
arc(x, y, r, startAngle, endAngle, backgroundColor, strokeColor, strokeWidth)
path(d, background, strokeColor, strokeWidth)
image(url, width, height, x, y)
text(text, x, y, fontSize)

// SVG & ELEMENT METHOD
hide() // hide the SVG or an element of, without transition
       //--> without argument, hide the SVG, else hide the element of the SVG
    --> svg.hide()
    --> svg.hide(myCircle1)
  
show() // inverse of the hide method
       //--> without argument, show the SVG, else show the element of the SVG
    --> svg.show()
    --> svg.show(myCircle1)
  
opacity(int)    // change element's opacity int{0,...,1}
                //--> first argument = opacity value, second is optional, it can be a SVG element
    --> svg.opacity(0.5)
    --> svg.opacity(0.5, myCircle1)
  
// Don't move an element WHILE you didn't draw the SVG: element not existing yet
```