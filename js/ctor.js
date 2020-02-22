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