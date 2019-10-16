const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/shop',//配置路由前缀
});
const {GoodsValidator} =require('../../validators/validator');
const {Shop} =require('../../models/shop');
const {success} =require('../../lib/helper');
const {Auth} = require('../../../middlewares/auth')

//添加货物
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    const {name,address,user_id,phone,img_url,remark}=ctx.request.body;
    const shop={name,address,user_id,phone,img_url,remark}
    await Shop.create(shop);
    success();
})
//删除货物
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const goods= await Goods.search(ctx.request.body.id);
    if(goods){
        await Goods.delete(ctx.request.body.id);
    }
    success();
})
//更新货物
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    const v= await new GoodsValidator().validate(ctx);
    const {id,name,number,unit_price,total_price,categories_id,shop_id,unit_id,img_url,remark}=ctx.request.body;
    const goods= await Goods.search(id);
   if(goods){
       await Goods.updateRows({id,name,number,unit_price,total_price,categories_id,shop_id,unit_id,img_url,remark});
   }
   success();
})

module.exports=router;