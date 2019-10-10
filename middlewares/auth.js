//身份验证中间件，验证请求中的token是否合法

const basicAuth=require('basic-auth');
const jwt = require('jsonwebtoken')

class Auth{
    constructor(level){
        //api权限等级
        this.level=level||1;
        //权限分级
        Auth.USER=8;
        Auth.ADMIN=16;
        Auth.SUPER_ADMIN=32;
    }
    get auth(){
        return async (ctx,next)=>{
            const userToken=basicAuth(ctx.req);
            let errMsg='token不合法';

            if(!userToken||!userToken.name){
                throw new global.errors.Forbbiden(errMsg);
            }
            try{
                var decode=jwt.verify(userToken.name,global.config.security.secretKey)//校验用户发来的token,并返回存有uid和scope的对象
            }
            catch(error){
                //令牌过期
                if(error.name==='TokenExpiredError'){
                    errMsg='token已过期'
                }
                //令牌不合法
                throw new global.errors.Forbbiden(errMsg);
            }
            //比较用户等级和api等级大小
            if(decode.scope<this.level){
                throw new global.errors.Forbbiden("权限不足");
            }
            //ctx上绑定uid和scope
            ctx.auth={
                uid:decode.uid,
                scope:decode.scope
            }
            await next()

        }
    }
}
module.exports={
    Auth
}