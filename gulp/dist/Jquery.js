(function (window) {

    var arr = [];

    function Jquery(selector) {
        return new Jquery.fn.init(selector);
    }
    
    Jquery.fn = Jquery.prototype = {
        constructor: Jquery,
        length: 0,
        each: function(callback) {
           return Jquery.each(this, callback);
        },
        map: function(callback) {
            return Jquery.map(this, callback);
        },
        toArray: function() {
            // 1. each
            /* var array = [];
            this.each(function(){
                array.push(this)
            })
            return array    */
            // 2.map
            /* return this.map(function (v){
                return v;
            })  */
            // 3. 
            return arr.slice.call(this);
        },
        get: function(index) {
            if (index === undefined) {
                return this.toArray()
            } else {
                if (index >= 0 ) {
                    return this[index];
                } else if (index < 0) {
                    return this[this.length + index];
                }
            }
            return this
        },
        end: function() {
            return this.prevObj || this;
        },
        pushStack: function(newObj) { 
            newObj.prevObj = this;
            return newObj;
        }
    }

    Jquery.isArrayLike = function(array) {
        var length = array && array.length
        return typeof length === 'number' && length >= 0
    }

    Jquery.each = function(array, callback) {
        var i, k;
        if (Jquery.isArrayLike(array)) {
            for (i=0; i<array.length;i++) {
                if(callback.call(array[i], i, array[i]) === false) break;
            }
        } else {
            for (k in array) {
                if(callback.call(array[k], k, array[k]) === false) break;
            }
        }
        return array;
    }

    Jquery.map = function(array, callback) {
        var i, k, res = [], tmp;
        if (Jquery.isArrayLike(array)) {
            for (i=0; i<array.length; i++) {
                tmp = callback(array[i], i)
                if (tmp !== undefined) {
                    res.push(tmp)
                }
            }
        } else {
            for (k in array) {
                tmp = callback(array[k], k)
                if (tmp !== undefined) {
                    res.push(tmp)
                }
            }
        }
        return res;
    }

    Jquery.select = function(selector) {
        return document.querySelectorAll(selector)
    }

    Jquery.extend = Jquery.fn.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    }

    window.Jquery = window.J = Jquery;

})(window)
(function() {
    var Jquery = window.Jquery,
        J = Jquery;

    function parseHTML(htmlStr) {
        var rest = [], div = document.createElement('div');
        div.innerHTML = htmlStr;
        for (var i=0; i<div.childNodes.length; i++) {
            rest.push(div.childNodes[i]);
        }
        return rest;
    }

    Jquery.parseHTML = parseHTML

    Jquery.extend({
        unique: function(jobj) {
            var tmp = [],
                newJobj = Jquery();
            for(var i=0; i<jobj.length; i++){
                if(tmp.indexOf(jobj[i]) == -1){
                    tmp.push(jobj[i])
                }
            }
            push.apply(newJobj, tmp);
            return newJobj;
        }
    })

    Jquery.fn.extend({
        appendTo: function(selector) {
            var jobj = Jquery(selector),
                jNewObj = Jquery(),
                tmp,
                res = [],
                len = jobj.length,
                i;
    
            this.each(function(){
                for(i=0;i<len;i++){
                    tmp =  i == len - 1 ? this : this.cloneNode(true);
                    jobj[i].appendChild(tmp);
                    res.push(tmp);
                }
            });
    
            push.apply(jNewObj, res);
    
            jNewObj.prevObj = this;
    
            return this.pushStack(jNewObj);
        },
        parent: function(){
            var jobj = Jquery();
            push.apply(jobj, this.map(function (v){
                return v.parentNode;
            }))
            jobj = Jquery.unique(jobj);

            return this.pushStack(jobj);
        }
    })

})(window)
(function(window) {
    var Jquery = window.Jquery,
        J = Jquery
        arr = [],
        push = arr.push;

    Jquery.fn.type = 'Jquery'

    var init = Jquery.fn.init =  function(selector) {
       
    // 处理 null、undefined、''
    if (!selector) return this;
    // 处理字符串：html格式 和 选择器
        if (typeof selector === 'string') {
            // html
            if(selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>') {
                push.apply(this, Jquery.parseHTML(selector));
            } else {
                // 选择器
                push.apply(this, Jquery.select(selector));
            }
            return this;
        }

        // 处理 dom 元素：nodeType
        if (selector.nodeType) {
            // 方法一：
            /* this[0] = selector;
             this.length = 1;   */
            // 方法二：
            push.call(this, selector);
            return this;
        }
        // 处理 Jquery 对象 : constructor | 自定义属性
        if (selector.type === 'Jquery') {
        // if (selector.constructor == Jquery) {
            // var jobj1 = J('div');  var jobj2 = J(jobj1);  job1 == job2 -> true
            // return selector;
            push.apply(this, selector);
            return this;
        }
        // 处理函数
        if (typeof selector == 'function') {
            window.addEventListener('load', selector);
        }
    }

    init.prototype = Jquery.fn;

})(window)
(function(window){

    Jquery.fn.extend({
        on: function(eventName, callback){
            return this.each(function(){
               this.addEventListener(eventName, callback)
            })
        },
        off: function(eventName, callback){
            return this.each(function(){
               this.removeEventListener(eventName, callback)
            })
        }
    })

    J.each(('copy,cut,paste,abort,blur,cancel,canplay,canplaythrough,change,click,close,contextmenu,' +
    'cuechange,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,' +
    'emptied,ended,error,focus,input,invalid,keydown,keypress,keyup,load,loadeddata,loadedmetadata,' +
    'loadstart,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,' +
    'operadetachedviewchange,operadetachedviewcontrol,pause,play,playing,progress,ratechange,reset,' +
    'resize,scroll,seeked,seeking,select,stalled,submit,suspend,timeupdate,toggle,volumechange,' +
    'waiting,wheel,auxclick,gotpointercapture,lostpointercapture,pointerdown,pointermove,pointerup,' +
    'pointercancel,pointerover,pointerout,pointerenter,pointerleave,selectstart,selectionchange,' +
    'animationend,animationiteration,animationstart,transitionend,formdata,pointerrawupdate,' +
    'beforecopy,beforecut,beforepaste,search,fullscreenchange,fullscreenerror,webkitfullscreenchange,' +
    'webkitfullscreenerror').split(','), function(i, v){
        Jquery.fn[v] = function(callback){
            return this.on(v, callback);
        }
    })  

})(window)
(function(window){

    Jquery.fn.extend({
        css: function(name, value){
            if(value === undefined){

                if(typeof name === 'string'){
                    return this[0].style[name] || window.getComputedStyle(this[0])[name];
                } else {
                    return this.each(function(){
                        var that = this;
                        Jquery.each(name, function(k, v){
                            that.style[k] = v;
                        })
                    })
                }
            } else {
                return this.each(function(){
                    this.style[name] = value;
                })
            }
        },
        addClass: function(name){
            // this 指所有dom元素
            return this.each(function(){
                if(this.className){
                    this.className += ' ' + name;
                } else {
                    this.className = name;
                }
            })
        },
        removeClass: function(name){
            return this.each(function(){
                var names = this.className && this.className.split(' ') || [];
                var newNames = names.filter(function(v, i){
                    return v != name;
                })
                this.className = newNames.join(' ');
            })
        },
        hasClass: function(name){
            var dom = this[0];
            var names = dom.className && dom.className.split(' ') || [];
            // var res = false;
            // names.forEach(element => {
            //     if(element === name){
            //         res = true;
            //     }
            // });
            // return res;
            for(var i=0;i<names.length;i++){
                if(names[i] === name){
                    return true;
                }
            }
            return false;
        },
        toggleClass: function(name){
            return this.each(function(){
                var jobj = Jquery(this);
                if(jobj.hasClass(name)){
                    jobj.removeClass(name);
                } else {
                    jobj.addClass(name);            
                }
            })
        }
    })

})(window)
(function(window){

    Jquery.fn.extend({
        attr: function(name, value){
            if(value === undefined){
                return this[0].getAttribute(name);
            } else {
                return this.each(function(){
                    this.setAttribute(name, value);
                })
            }
        },
        prop: function(name,value){
            if(value === undefined){
                return this[0][name];
            } else {
                return this.each(function(){
                    this[name] = value;
                })
            }
        }
    })

    Jquery.each({
        html: 'innerHTML',
        text: 'innerText',
        val: 'value'
    },function(k, v){
        Jquery.fn[k] = function(value){
            if(value === undefined){
                return this[0][v];
            } else {
                return this.each(function(){
                    this[v] = value;
                })
            }
        }
    })

})(window)