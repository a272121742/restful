//Router检测
if(!Router){
  throw new Meteor.Error(10000, '无法找到依赖', 'rest api 所依赖的\"iron-router\"可能未正确安装，请安装后使用！');
}
//默认属性
var DEFAULT_PREFIX = '/REST',
    DEFAULT_SUFFIX = ':SUFFIX',
    DEFAULT_DEBUG = false,
    DEFAULT_HAND = function(){};
//定义RESTOR
var RESTOR = function(){
  this._apis = [];
  this._config = {
    prefix:DEFAULT_PREFIX,  //定义前缀
    debug:DEFAULT_DEBUG     //定义调试模式
  };
};
//url过滤检测
function urlFilter(url){
  var u = url;
  if(u.indexOf('/')){
    u = '/' + u;
  }
  var i = u.length - 1;
  if(u.lastIndexOf('/') === i){
    u = u.substring(0,i)
  }
  return u;
};
/**
 * api注册
 */
RESTOR.prototype.reg = function(api){
  //获取前缀
  var prefix = this._config.prefix;
  //检查url并修订
  if(!api.url){
    api.url = DEFAULT_SUFFIX;
    if(this._config.debug){
      console.warn('url not be empty, system given your default value is "'+ DEFAULT_SUFFIX +'"!');
    }
  }
  //捕获url的key字段
  var key = urlFilter(api.url);
  api.url = prefix + key;
  if(!api.hand){
    api.hand = DEFAULT_HAND;
  }
  //使用iron-router注册server-api
  Router.route(api.url,{
    where : 'server',
    path : api.url,
    action : function(){
      var me = this;
      var req = me.request;
      var method = req.method;
      var data = method === 'GET' ? req.query : req.body;
      var params = me.params;
      var json = {
        value:api.hand.call(me,data,params),
      };
      var result = JSON.stringify(json);
      me.response.writeHead(200, {"Content-Type":"text/javascript;charset=UTF-8"});
      me.response.end(result);
    }
  });
  //添加系统api
  if(!api.internal){
    if(!~this._apis.indexOf(key)){
      this._apis.push({url:api.url,dir:api.dir,key:key});
    }
  }
  if(this._config.debug === true){
    console.info('api reg success!',api.url,(api.dir || '暂无说明'));
  }
};
/**
 * 配置，配置对象如：
 *  {
 *    prefix:String,  //前缀，默认"/REST"
 *    debug:Boolean   //是否开启debug模式，默认false
 *  }
 */
RESTOR.prototype.configure = function(config){
  config = config || {};
  var prefix = config.prefix || DEFAULT_PREFIX;
  this._config.prefix = urlFilter(prefix);
  this._config.debug = !!config.debug;
};

REST = new RESTOR();

