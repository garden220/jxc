//计量单位
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/outBound',//配置路由前缀
});
const {OutBoundValidator} =require('../../validators/validator');
const {OutBound} =require('../../models/outBound');
const {OutBoundDetail} =require('../../models/outBoundDetail');
const {Auth} = require('../../../middlewares/auth')

//添加
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    await new OutBoundValidator().validate(ctx);
    const count=await OutBound.create({...ctx.request.body});
    global.success({count});
})
//删除
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const outBound= await OutBound.search(ctx.request.body.id);
    if(outBound){
        const count=await OutBound.delete(ctx.request.body.id);
        global.success({count});
    }
})
//更新
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    await new OutBoundValidator().validate(ctx);
    const outBound= await OutBound.search(id);
   if(outBound){
       await OutBound.updateRows({...ctx.request.body});
       global.success('更新成功');
   }
})
//获取
router.get('/all',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const outBound= await OutBound.all(query);
    if(outBound){
        global.success({...outBound});
   }
})

module.exports=router;