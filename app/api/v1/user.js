//用户
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/user',//配置路由前缀
});
const {RegisterValidator} =require('../../validators/validator');
const {User} =require('../../models/user');
const {success} =require('../../lib/helper');

//注册
router.post('/register',async (ctx,next)=>{
    await new RegisterValidator().validate(ctx);
    await User.create({...ctx.request.body});
    success();
})
module.exports=router;