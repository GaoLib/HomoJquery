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