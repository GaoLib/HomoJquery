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

})(window)