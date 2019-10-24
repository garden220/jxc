//计量单位
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/inBound',//配置路由前缀
});
const {InBoundValidator} =require('../../validators/validator');
const {InBound} =require('../../models/inBound');
const {InBoundDetail} =require('../../models/inBoundDetail');
const {Auth} = require('../../../middlewares/auth')

//添加
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    await new InBoundValidator().validate(ctx);
    const count=await InBound.create({...ctx.request.body});
    global.success({count},ctx);
})
//删除
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const inBound= await InBound.search(ctx.request.body.id);
    if(inBound){
        const count=await InBound.delete(ctx.request.body.id);
        global.success({count},ctx);
    }
})
//更新
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    await new InBoundValidator().validate(ctx);
    const inBound= await InBound.search(id);
   if(inBound){
       await InBound.updateRows({...ctx.request.body});
       global.success('更新成功',ctx);
   }
})
//获取
router.get('/all',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const inBound= await InBound.all(query);
    if(inBound){
        global.success({...inBound},ctx);
   }
})

module.exports=router;