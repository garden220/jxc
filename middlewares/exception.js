const {HttpException} = require("../core/http-exception");
//异常处理中间件，监听所有函数的异常
const catchError = async (ctx,next) =>{

    try {
        await next()
    } catch (error) {
        //HTTP status Code 2xx,4xx,5xx
        //mesage 错误信息
        //error_code 详细信息分类, 开发者自己定义  10001 20001等
        //request_url 当前请求url

        const isHttpException=error instanceof HttpException;//是否抛出HttpException异常
        const isDev =global.config.environment==='dev';//是否开发环境

        if(isDev&&!isHttpException){
            //开发环境抛出未知异常
            throw error
        }

        if(isHttpException){
            //已知异常
            ctx.body={
                success:error.code===201,
                error:error.code===201?null:error.msg,
                result:error.code===201?error.msg:null,
                url:`${ctx.method} ${ctx.path}`,
                error_code:error.errorCode,
                status:error.code
            }
            ctx.status=error.code;
        }else{
            //未知异常
            ctx.body={
                success:null,
                result:null,
                error:'服务器错误',
                url:`${ctx.method} ${ctx.path}`,
                error_code:999,
                status:500
            }
            ctx.status=500;
        }
    }

}
module.exports=catchError;