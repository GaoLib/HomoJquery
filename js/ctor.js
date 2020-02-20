(function() {
    var Jquery = window.Jquery,
        J = Jquery
        arr = [],
        push = arr.push;

    var init = Jquery.fn.init =  function(selector) {
    if (!selector) return this;
        if (typeof selector === 'string') {
            if(selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>') {
                push.apply(this, Jquery.parseHTML(selector));
            } else {
                push.apply(this, Jquery.select(selector));
            }
            return this;
        }
        
    }

    init.prototype = Jquery.fn;

})(window)