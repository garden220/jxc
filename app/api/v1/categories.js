//货物分类
const Router=require('koa-router');
const router=new Router({
    prefix:'/v1/categories',//配置路由前缀
});
const {CategoriesValidator} =require('../../validators/validator');
const {Categories} =require('../../models/categories');
const {Auth} = require('../../../middlewares/auth')

//添加
router.post('/add',new Auth(3).auth,async (ctx,next)=>{
    await new CategoriesValidator().validate(ctx);
    const count=await Categories.create({...ctx.request.body});
    global.success({count},ctx);
})
//删除
router.delete('/delete',new Auth(3).auth,async (ctx,next)=>{
     const categories= await Categories.search(ctx.request.body.id);
    if(categories){
        const count=await Categories.delete(ctx.request.body.id);
        global.success({count},ctx);
    }
})
//更新
router.put('/update',new Auth(3).auth,async (ctx,next)=>{
    await new CategoriesValidator().validate(ctx);
    const categories= await Categories.search(id);
   if(categories){
       await Categories.updateRows({...ctx.request.body});
       global.success('更新成功',ctx);
   }
})
//获取
router.get('/all',new Auth(3).auth,async (ctx,next)=>{
    const query=ctx.request.query;
    const categories= await Categories.all(query);
    if(categories){
        global.success({...categories},ctx);
   }
})

module.exports=router;