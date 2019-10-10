const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/token',//配置路由前缀
});
const {TokenValidator} =require('../../validators/validator');
const {User} =require('../../models/user');
const {LoginType}=require('../../lib/enum');
const {generateToken}=require('../../../core/util');//生成token函数
const {Auth} = require('../../../middlewares/auth')


router.post('/',async (ctx,next)=>{
    const v= await new TokenValidator().validate(ctx);
    // const user={
    //     email:v.get('body.email'),
    //     password:v.get('body.password2'),
    //     nickname:v.get('body.nickname')
    // };
    // await User.create(user);
    let token='';
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
            token=await emailLogin(v.get('body.account'),v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new global.errors.ParameterException('没有处理程序');
    }
     ctx.body={
         token
     };
})
//验证账号密码,在User模型中写方法验证
async function emailLogin(account,password){
    const user= await User.verifyEmailPassword(account,password);
    return generateToken(user.id,Auth.USER);
}

module.exports=router;