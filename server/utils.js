var Utils = {
    proxy: function(func, context){
        return function(){
            func.apply(context || this, arguments);
        };
    }
};

for ( var method in Utils ) {
    exports[method] = Utils[method];
}
