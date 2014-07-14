使用方法
======

## 注册API

```javascript
REST.reg({
  url : '/getRandomNum',
  hand : function(){
    return Math.random();
  }
});
```

注意：如果url不是以`/`开头，本扩展也会自动加上。

## 调用

因为整个项目可能存在多个路由，尤其客户端路由容易和服务端路由混淆，所以restful的api前都会有一个前缀`/REST`。调用时，需要加上此前缀：

```javascript
HTTP.get('/REST/getRandomNum', function(err, response){
  console.log(response.data);  // {value : 0.12809109809840392} //一个随机数
});
```

返回的数值都会由键名为`value`的键值对包裹送达。

## 查询API

可以查询所有的系统API：

```
HTTP.get('/REST/apis', function(err, response){
  console.log(response.data);  //返回系统已经注册的api
});
```

或者根据名字查找API：

```
HTTP.get('/REST/apis/get', function(err, response){
  console.log(response.data);  //返回系统已经注册并且以get开头的api
});
```