const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/user',//配置路由前缀
});
const {RegisterValidator} =require('../../validators/validator');
const {User} =require('../../models/user');
const {success} =require('../../lib/helper');

//注册
router.post('/register',async (ctx,next)=>{
    const v= await new RegisterValidator().validate(ctx);
    const user={
        email:v.get('body.email'),
        password:v.get('body.password'),
        name:v.get('body.name'),
        phone:v.get('body.phone'),
        shop_id:v.get('body.shop_id'),
        role:v.get('body.role'),
        register_time:v.get('body.register_time'),
        login_time:v.get('body.login_time')
    };
    await User.create(user);
    success();
})

module.exports=router;