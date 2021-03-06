/**
 * COPYRIGHT NOXFLY 2019
 * SVG LIB
 * 
 * link: https://cdn.jsdelivr.net/gh/NoxFly/SVG/svg.js
 * 
 */

class SVG {
    constructor(name, container, width=document.documentElement.clientWidth, height=document.documentElement.clientHeight) {
        if(!isNaN(this.name)) {
            console.warn("The name of the SVG must be a string");
            return false;
        }

        try {this.container = document.querySelector(container);}
        catch(error) {
            console.warn("container not found");
            return false;
        }

        this.width = width;
        this.height = height;
        
        this.name = name;
        this.type = "svg";
        this.index = 0;
        this.xmlns = "http://www.w3.org/2000/svg";
        
        this.data = [];
        this.defaultColor = "none";
        
        let elSVG = document.createElementNS(this.xmlns, "svg");
        this.container.appendChild(elSVG);

        elSVG.setAttribute("class", name);
        Object.assign(elSVG.style, {
            width: width+"px",
            height: height+"px",
            cursor: 'default'
        });
    }

    draw() {
        this.reset();
        for(let j in this.data) {
            let i = this.data[j];
            let newEl = i.obj;
            document.getElementsByClassName(this.name)[0].appendChild(newEl);

            newEl.setAttribute("class", "s"+i.id);
            setAttributes(newEl, {
                "stroke": i.strokeColor,
                "stroke-width": i.strokeWidth,
                "fill": i.background
            });

            switch(i.type) {
                case "line":
                    setAttributes(newEl, {
                        "x1": i.coord[0],
                        "y1": i.coord[1],
                        "x2": i.coord[2],
                        "y2": i.coord[3],
                        "stroke": i.color,
                        "stroke-width": i.size
                    });
                    break;
                case "polyline":
                    newEl.setAttributeNS(null, "points", i.coord);
                    break;
                case "circle":
                    setAttributes(newEl, {
                        "cx": i.x,
                        "cy": i.y,
                        "r": i.r
                    });
                    break;
                case "ellipse":
                    setAttributes(newEl, {
                        "x": i.x,
                        "y": i.y,
                        "rx": i.rx,
                        "ry": i.ry
                    });
                    break;
                case "path":
                    newEl.setAttributeNS(null, "d", i.d);
                    break;
                case "text":
                    setAttributes(newEl, {
                        "x": i.x,
                        "y": i.y,
                        "fill": i.fill,
                        "font-size": i.fontSize
                    });
                    newEl.appendChild(document.createTextNode(i.text));
                    break;
                case "image":
                    setAttributes(newEl, {
                       "x": i.x,
                       "y": i.y,
                       "width": i.width,
                       "height": i.height,
                       "href": i.imageUrl 
                    });
                    break;
            }
            this.data[j].obj = newEl;
        }

        document.getElementsByClassName(this.name)[0].addEventListener('selectstart', function(e){ e.preventDefault(); });
    }

    reset() {
        if(this.name) document.getElementsByClassName(this.name)[0].innerHTML = "";
    }

    line(x1, y1, x2, y2, color=this.defaultColor, size=1) {        
        this.data.push({
            type: "line",
            coord: [x1,y1,x2,y2],
            color: color,
            size: size,
            id: this.index++,
            obj: document.createElementNS(this.xmlns, 'line')
        });
        return this.data[this.index-1];
    }

    polyline(coords, bg=this.defaultColor, strokeColor=this.defaultColor, strokeWidth=1) {
        if(typeof coords == 'object') {
            if(coords[coords.length-1]===true) coords[coords.length-1] = coords[0];
            coords = this.createPolyline(coords);
        } else {
            let firstCoords = coords.split(" ")[0];
            coords = coords.replace(/z$/, " "+firstCoords);
        }

        this.data.push({
            type: "polyline",
            coord: coords,
            background: bg,
            strokeColor: strokeColor,
            strokeWidth: strokeWidth,
            id: this.index++,
            obj: document.createElementNS(this.xmlns, 'polyline')
        });
        return this.data[this.index-1];
    }

    circle(x, y, r, bg=this.defaultColor, strokeColor=this.defaultColor, strokeWidth=1) {
        this.data.push({
            type: "circle",
            x: x,
            y: y,
            r: r,
            background: bg,
            strokeColor: strokeColor,
            strokeWidth: strokeWidth,
            id: this.index++,
            obj: document.createElementNS(this.xmlns, 'circle')
        });
        return this.data[this.index-1];
    }

    ellipse(x, y, rx, ry, bg=this.defaultColor, strokeColor=this.defaultColor, strokeWidth=this.strokeWidth) {
        this.data.push({
            type: "ellipse",
            x: x,
            y: y,
            rx: rx,
            ry: ry,
            background: bg,
            strokeColor: strokeColor,
            strokeWidth: strokeWidth,
            id: this.index++,
            obj: document.createElementNS(this.xmlns, 'ellipse')
        });
        return this.data[this.index-1];
    }

    arc(x, y, r, startAngle, endAngle, bg=this.defaultColor, strokeColor=this.defaultColor, strokeWidth=1) {
        let start = {
            x: x + (r * Math.cos((endAngle-90) * Math.PI / 180.0)),
            y: y + (r * Math.cos((endAngle-90) * Math.PI / 180.0))
        };

        let end = {
            x: x + (r * Math.cos((startAngle-90) * Math.PI / 180.0)),
            y: y + (r * Math.cos((startAngle-90) * Math.PI / 180.0))
        };

        let arc = endAngle - startAngle <= 180 ? "0" : "1";

        let d = [
            "M", start.x, start.y,
            "A", r, r, 0, arc, 0, end.x, end.y
        ].join(" ");

        this.data.push({
            type: "path",
            d: d,
            background: bg,
            strokeColor: strokeColor,
            strokeWidth: strokeWidth,
            id: this.index,
            obj: document.createElementNS(this.xmlns, 'path')
        });
        return this.data[this.index-1];
    }

    path(d, bg=this.defaultColor, strokeColor=this.defaultColor, strokeWidth=this.strokeWidth) {
        this.data.push({
            type: "path",
            d: d,
            background: bg,
            strokeColor: strokeColor,
            strokeWidth: strokeWidth,
            id: this.index++,
            obj: document.createElementNS(this.xmlns, 'path')
        });
        return this.data[this.index-1];
    }

    image(url, width, height, x, y) {
        if(/^(https?)/.test(url)) {
            console.alert("We don't accept online URL request");
            return false;
        }

        this.data.push({
            type: "image",
            imageUrl: url,
            x: x,
            y: y,
            width: width,
            height: height,
            id: this.index++,
            obj: document.createElementNS(this.xmlns, 'image')
        });
        return this.data[this.index-1];
    }

    text(t, x, y, color="#000", size="1em") {
        this.data.push({
            type: "text",
            x: x,
            y: y,
            fontSize: size,
            fill: color,
            text: t,
            id: this.index++,
            obj: document.createElementNS(this.xmlns, 'text')
        });
        return this.data[this.index-1];
    }

    remove(el) {
        if(el) this.data.splice(el.id, 1);
        else this.data = [];
        this.draw();
    }

    hide(el) {
        if(el) document.querySelector(".s"+el.id).style.display = "none";
        else document.querySelector("."+this.name).style.display = "none";
    }

    show(el) {
        if(el) document.querySelector(".s"+el.id).style.display = "block";
        else document.querySelector("."+this.name).style.display = "block";
        this.draw();
    }

    opacity(alpha, el) {
        if(isNaN(alpha)) console.warn("alpha must be a value between 0 and 1");
        else {
            alpha = (alpha>=0 && alpha<=1)? alpha : 1;
            let o = el? ".s"+el.id : "."+this.name;
            document.querySelector(o).style.opacity = alpha;
        }
    }

    fadeIn(time, el) {
        el = elementExists(el);
        if(!el || isNaN(time)) return false;
        el.style.display = "block";
        let op = 0;
        let timer = setInterval(function() {
            op += 0.1;
            if(op>=1) {
                clearInterval(timer);
                op = 1;
            }
            el.style.opacity = op;
            el.style.filter = 'alpha(opacity=' +op+ ")";
        }, time/60);
    }

    fadeOut(time, el) {
        el = elementExists(el);
        if(!el || isNaN(time)) return false;
        let op = 1;
        let timer = setInterval(function() {
            op -= 0.1;
            if(op<=0.1) {
                clearInterval(timer);
                op = 0;
                el.style.display = "none";
            }
            el.style.opacity = op;
            el.style.filter = 'alpha(opacity=' +op+ ")";
        }, time/60);
    }

    moveTo(el, x, y) {
        let object = elementExists(el);
        
        if(!object) {
            console.warn("The element to move must be an SVG element, except a path");
            return false;
        }

        if(isNaN(x) || isNaN(y)) {
            console.warn("Coordonates must be values");
            return false;
        }

        if(el.type=="path") {
            let startX = el.d.split(" ")[0].replace(/[a-zA-Z]/,"");
            let startY = el.d.split(" ")[1];
            console.warn("Cannot move path for now");
        } else if(/polyline|line/.test(el.type)) {
            this.data[el.id].x1 = x;
            this.data[el.id].y1 = y;
            this.data[el.id].x2 = x + (el.x2-el.x1);
            this.data[el.id].y2 = y + (el.y2-el.y1);
        } else {
            this.data[el.id].x = x;
            this.data[el.id].y = y;
        }
        this.draw();
    }

    fill(el, hex) {
        let element = elementExists(el);
        if(!element) return false;
        if(!hexValue(hex)) return false;
        element.style.fill = hex;
    }

    stroke(el, hex) {
        let element = elementExists(el);
        if(!element) return false;
        if(!hexValue(hex)) return false;
        element.style.stroke = hex;
    }

    strokeWidth(el, hex) {
        let element = elementExists(el);
        if(!element) return false;
        if(!hexValue(hex)) return false;
        element.style.strokeWidth = hex;
    }

    createPolyline(coord) {
        let points = "";
        for(let i in coord) {
            points += coord[i][0]+","+coord[i][1];
            if(i<coord.length-1) points += " ";
        }

        return points;
    }

    rect(x, y, width, height, background=this.defaultColor, strokeColor=this.defaultColor, strokeWidth=this.strokeWidth) {
        if(isNaN(x)) x = 0;
        if(isNaN(y)) y = 0;
        if(isNaN(width)) width = 0;
        if(isNaN(height)) height = 0;

        return this.polyline(
            [
                [x, y],
                [x+width, y],
                [x+width, y+height],
                [x, y+height],
                true
            ],
            background, strokeColor, strokeWidth
        );
    }

    setDefaultColor(col) {
        this.defaultColor = col;
    }
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttributeNS(null, key, attrs[key]);
    }
}

function elementExists(el) {
    try {
        let a = document.querySelector(".s"+el.id);
        return a;
    } catch(error) {
        console.warn("This element does not exists: "+el);
        return false;
    }
}

function hexValue(n) {
    return /#([0-9a-fA-F]){6}/.test(n);
}