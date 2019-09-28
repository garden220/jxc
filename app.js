const Koa = require('koa');

const app = new Koa();

app.use(function(ctx,next){
    const abc=ctx;
    ctx.body=abc;
    console.log(123);
    next()
});
app.use(async function(){
    const axios=require('axios');
    const start=Date.now();
    const res =await axios.get('http://7yue.pro');
    const end=Date.now();
    console.log(111,end-start);
});


app.listen(3000);