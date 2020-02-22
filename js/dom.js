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