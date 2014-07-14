(function(){
  REST.reg({
    url:'/apis',
    hand:function(){
      console.log('apis');
      return REST._apis;
    },
    internal:true
  });
  REST.reg({
    url:'/apis/:name',
    hand:function(data,param){
      var regexp = new RegExp(param.name);
      console.log('apis:name');
      return REST._apis.filter(function(item){
        return regexp.test(item.key);
      });
    },
    internal:true
  });
})();