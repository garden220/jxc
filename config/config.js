module.exports={
    //prod or dev
    environment:'dev',
    database:{
        dbName:'jxc',
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456'
    },
    security:{
        secretKey:"lakdhfks2131k2hkhsdkfskdkixiohasdkfh",//token密匙
        expiresIn:60*60*24*30,//token过期时间
    }
}