//计量单位
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/sale',//配置路由前缀
});
const {SaleValidator} =require('../../validators/validator');
const {Sale} =require('../../models/sale');
const {SaleDetail} =require('../../models/saleDetail');
const {Auth} = require('../../../middlewares/auth')

//添加
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    await new SaleValidator().validate(ctx);
    const count=await Sale.create({...ctx.request.body});
    global.success({count});
})
//删除
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const sale= await Sale.search(ctx.request.body.id);
    if(sale){
        const count=await Sale.delete(ctx.request.body.id);
        global.success({count});
    }
})
//更新
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    await new SaleValidator().validate(ctx);
    const sale= await Sale.search(id);
   if(sale){
       await Sale.updateRows({...ctx.request.body});
       global.success('更新成功');
   }
})
//获取
router.get('/all',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const sale= await Sale.all(query);
    if(sale){
        global.success({...sale});
   }
})

module.exports=router;