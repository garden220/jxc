//货物
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/goods',//配置路由前缀
});
const {GoodsValidator} =require('../../validators/validator');
const {Goods} =require('../../models/goods');
const {Auth} = require('../../../middlewares/auth')

//添加
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    const v= await new GoodsValidator().validate(ctx);
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
    const count=await Goods.create(goods);
    global.success({count});
})
//删除
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const goods= await Goods.search({id:ctx.request.body.id});
    if(goods){
        const count=await Goods.delete({id:ctx.request.body.id});
        global.success({count});
    }
    
})
//更新
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    const v= await new GoodsValidator().validate(ctx);
    const {id,name,number,unit_price,total_price,categories_id,shop_id,unit_id,img_url,remark}=ctx.request.body;
    const goods= await Goods.search({id});
   if(goods){
        await Goods.updateRows({id,name,number,unit_price,total_price,categories_id,shop_id,unit_id,img_url,remark});
        global.success('更新成功');
   }
})
//查询，精确查询
router.get('/search',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const goods= await Goods.search(query);
   if(goods){
    global.success({...goods});
   }
   
})
//获取
router.get('/all',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const goods= await Goods.all(query);
    if(goods){
        global.success({...goods});
    }
   
})

module.exports=router;