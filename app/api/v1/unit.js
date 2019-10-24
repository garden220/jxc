//计量单位
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/unit',//配置路由前缀
});
const {UnitValidator} =require('../../validators/validator');
const {Unit} =require('../../models/unit');
const {Auth} = require('../../../middlewares/auth')

//添加
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    await new UnitValidator().validate(ctx);
    const count=await Unit.create({...ctx.request.body});
    global.success({count},ctx);
})
//删除
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const unit= await Unit.search(ctx.request.body.id);
    if(unit){
        const count=await Unit.delete(ctx.request.body.id);
        global.success({count},ctx);
    }
})
//更新
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    await new UnitValidator().validate(ctx);
    const unit= await Unit.search(id);
   if(unit){
       await Unit.updateRows({...ctx.request.body});
       global.success('更新成功',ctx);
   }
})
//获取
router.get('/all',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const unit= await Unit.all(query);
    if(unit){
        global.success({...unit},ctx);
   }
})

module.exports=router;