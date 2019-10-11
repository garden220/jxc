const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/classic'
});
const {Auth} = require('../../../middlewares/auth')


router.get('/latest',new Auth(3).auth,async (ctx,next)=>{
    ctx.body=ctx.auth.uid
})

module.exports=router;
