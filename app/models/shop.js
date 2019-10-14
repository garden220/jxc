const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
//商店模型
class Shop extends Model{
    //验证账号密码是否正确
    // static async verifyEmailPassword(email,plainPassword){
    //     const user=await User.findOne({
    //         where:{
    //             email
    //         }
    //     });
    //     if(!user){
    //         throw new global.errors.AuthFailed('账号不存在');
    //     }
    //     if(!plainPassword){
    //         throw new global.errors.AuthFailed('密码不能为空');
    //     }
    //     const correct=bcrypt.compareSync(plainPassword,user.password)
    //     if(!correct){
    //         throw new global.errors.AuthFailed('密码不正确');
    //     }
    //     return user;
    // }
}

Shop.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    user_id:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    phone:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    img_url:Sequelize.STRING,
    remark:Sequelize.STRING,
},{sequelize,tableName:'shop'});

module.exports={Shop};