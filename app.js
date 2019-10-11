const Koa = require('koa');
const parser=require('koa-bodyparser');
const cors=require('koa2-cors');
const InitManager=require('./core/init');
const catchError=require("./middlewares/exception");
const setCors=require("./middlewares/cors");

const app = new Koa();
//配置跨域
app.use(setCors);
//加载全局异常处理中间件
app.use(catchError);
//对post请求，ctx的body支持
app.use(parser());
//调用初始化管理器
InitManager.initCore(app);

app.listen(3000);