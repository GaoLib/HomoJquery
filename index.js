(function (window) {

    var arr = [],
        push = arr.push;

    function Jquery(selector) {
        return new Jquery.fn.init(selector);
    }
    
    Jquery.fn = Jquery.prototype = {
        constructor: Jquery,
        init: function(selector) {
            var list = select(selector);
            push.apply(this, list);
            return this;
        },
        each: function(callback) {
           return each(this, callback);
        },
        map: function(callback) {
            return map(this, callback);
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
        }
    }
    Jquery.fn.init.prototype = Jquery.fn;

    function isArrayLike(array) {
        var length = array && array.length
        return typeof length === 'number' && length >= 0
    }

    function each(array, callback) {
        var i, k;
        if (isArrayLike(array)) {
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

    function map(array, callback) {
        var i, k, res = [], tmp;
        if (isArrayLike(array)) {
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

    function select(selector) {
        return document.querySelectorAll(selector)
    }


    window.Jquery = window.J = Jquery;

})(window)