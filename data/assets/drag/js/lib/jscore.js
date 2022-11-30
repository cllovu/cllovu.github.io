/*js浏览器ie兼容性重写*/
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix){
        return this.slice(0, prefix.length) === prefix;
    };
}
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (suffix){
        return this.slice(-1*suffix.length) === suffix;
    };
}
if (typeof String.prototype.trimRight != 'function') {
    String.prototype.trimRight = function (){
        return this.replace(/\s+$/g, '');;
    };
}
if (typeof String.prototype.trimLeft != 'function') {
    String.prototype.trimLeft = function (){
        return this.replace(/^\s+/g, '');
    };
}
if (typeof String.prototype.trim != 'function') {
    String.prototype.trim = function (){
        return this.replace(/^\s+|\s+$/g, '');
    };
}
/*拷贝属性*/
if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

//解决IE8之类不支持getElementsByClassName
if  (!document.getElementsByClassName) {
     document.getElementsByClassName =  function  (className, element) {
         var  children = (element || document).getElementsByTagName( '*' );
         var  elements =  new  Array();
         for  ( var  i = 0; i < children.length; i++) {
             var  child = children[i];
             var  classNames = child.className.split( ' ' );
             for  ( var  j = 0; j < classNames.length; j++) {
                 if  (classNames[j] == className) {
                     elements.push(child);
                     break ;
                 }
             }
         }
         return  elements;
     };
}
window.console = window.console || (function(){
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
    = c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();

__encode="jsjiami.com"
