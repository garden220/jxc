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
        if(error instanceof HttpException){
            //已知异常
            ctx.body={
                msg:error.msg,
                error_code:error.errorCode,
                request:`${ctx.method} ${ctx.path}`,
                status:error.code
            }
            ctx.status=error.code;
        }else{
            //未知异常
            ctx.body={
                msg:'服务器错误',
                error_code:999,
                request:`${ctx.method} ${ctx.path}`,
                status:500
            }
            ctx.status=500;
        }
    }

}
module.exports=catchError;