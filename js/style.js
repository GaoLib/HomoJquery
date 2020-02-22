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
            var res = false;
            names.forEach(element => {
                if(element === name){
                    res = true;
                }
            });
            return res;
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