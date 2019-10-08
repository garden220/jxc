const requireDirectory = require('require-directory');
const Router = require('koa-router');
//初始化管理器
class InitManager {
    // 初始化类的入口方法，在app页调用，并传入app实例
    static initCore(app) {
        InitManager.app = app;
        InitManager.initLoadRouters();
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
}

module.exports = InitManager;