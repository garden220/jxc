const requireDirectory = require('require-directory');
const Router = require('koa-router');
//初始化管理器
class InitManager {
    // 初始化类的入口方法，在app页调用，并传入app实例
    static initCore(app) {
        InitManager.app = app;
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.loadConfig();
        InitManager.loadSuccess();
    }
    // 导入所有路由
    static initLoadRouters() {
        const apiDirectory=`${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: (obj) => {
                if (obj instanceof Router) {
                    InitManager.app.use(obj.routes());
                }
            }
        });
    }
    // global上挂载所有error异常类
    static loadHttpException(){
        const errors=require("../core/http-exception");
        global.errors=errors;
    }
    // global上挂载config
    static loadConfig(path=''){
        const configPath=path || process.cwd()+'/config/config.js';
        const config=require(configPath);
        global.config=config;
    }
    // global上挂载成功后返回数据
    static loadSuccess(){
        const success=(result,ctx)=> {
            ctx.body={
                success:true,
                error:null,
                result:result,
                url:`${ctx.method} ${ctx.path}`,
                error_code:0,
                status:201
            }
        }
        global.success=success;
    }
}

module.exports = InitManager;