const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/goods',//配置路由前缀
});
const {AddGoodsValidator} =require('../../validators/validator');
const {Goods} =require('../../models/goods');
const {success} =require('../../lib/helper');

//添加货物
router.post('/add',async (ctx,next)=>{
    const v= await new AddGoodsValidator().validate(ctx);
    const goods={
        name:v.get('body.name'),
        number:v.get('body.number'),
        unit_price:v.get('body.unit_price'),
        total_price:v.get('body.total_price'),
        categories_id:v.get('body.categories_id'),
        shop_id:v.get('body.shop_id'),
        unit_id:v.get('body.unit_id'),
        img_url:v.get('body.img_url'),
        remark:v.get('body.remark'),
    };
    await Goods.create(goods);
    success();
})
//删除货物
router.delete('/delete',async (ctx,next)=>{
     const goods= await Goods.search(ctx.request.body.id);
    // if(goods){
    //     await Goods.delete(ctx.request.body.id);
    // }
    success();
})

module.exports=router;