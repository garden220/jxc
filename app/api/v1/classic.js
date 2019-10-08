const Router=require('koa-router');
const router=new Router();
const {PositiveIntegerValidator} =require('../../validators/validator');


router.post('/v1/:id/classic/latest',(ctx,next)=>{

    // if(true){
    //     throw new global.errors.ParameterException();
    // }
    const v= new PositiveIntegerValidator().validate(ctx);
    
    ctx.body={
        key:'classic'
    }
})

module.exports=router;
