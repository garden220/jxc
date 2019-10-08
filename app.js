const Koa = require('koa');
const parser=require('koa-bodyparser');
const InitManager=require('./core/init');

const app = new Koa();
//对post请求，ctx的body支持
app.use(parser());
//调用初始化管理器
InitManager.initCore(app);

app.listen(3000);