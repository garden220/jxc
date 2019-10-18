//分店
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/shop',//配置路由前缀
});
const {GoodsValidator} =require('../../validators/validator');
const {Shop} =require('../../models/shop');
const {Auth} = require('../../../middlewares/auth')

//添加
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    const {name,address,user_id,phone,img_url,remark}=ctx.request.body;
    const shop={name,address,user_id,phone,img_url,remark}
    const count=await Shop.create(shop);
    global.success({count});
})
//删除
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const shop= await Goods.search(ctx.request.body.id);
    if(shop){
        const count=await Shop.delete(ctx.request.body.id);
        global.success({count});
    }
})
//更新
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    const v= await new GoodsValidator().validate(ctx);
    const {id,name,number,unit_price,total_price,categories_id,shop_id,unit_id,img_url,remark}=ctx.request.body;
    const shop= await Shop.search(id);
   if(shop){
       await Shop.updateRows({id,name,number,unit_price,total_price,categories_id,shop_id,unit_id,img_url,remark});
       global.success('更新成功');
   }
})
//获取
router.get('/all',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const shop= await Shop.all(query);
    if(shop){
        global.success({...shop});
   }
   
})

module.exports=router;