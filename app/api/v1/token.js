const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/token',//配置路由前缀
});
const {TokenValidator,NotEmptyValidator} =require('../../validators/validator');
const {User} =require('../../models/user');
const {LoginType}=require('../../lib/enum');
const {generateToken}=require('../../../core/util');//生成token函数
const {Auth} = require('../../../middlewares/auth');
const {success} =require('../../lib/helper');

//账户密码获取token
router.post('/',async (ctx,next)=>{
    const v= await new TokenValidator().validate(ctx);
    let userlogin={};
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
            userlogin=await emailLogin(v.get('body.account'),v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new global.errors.ParameterException('没有处理程序');
    }
    global.success({
        token:userlogin.token,
        expireInSeconds:global.config.security.expiresIn,
        userId:userlogin.userId
    },ctx);
})
//验证令牌的api，打开app时需要先验证缓存中的令牌是否合法
router.post('/verify',async (ctx,next)=>{
    const v= await new NotEmptyValidator().validate(ctx);
    Auth.verifyToken(v.get('body.token'));
    success()
})

//验证账号密码,在User模型中写方法验证
async function emailLogin(account,password){
    const user= await User.verifyEmailPassword(account,password);
    return {
        token:generateToken(user.id,Auth.USER),
        userId:user.id
    }
}

module.exports=router;