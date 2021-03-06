const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {Goods}=require('./goods');
const {modelInit}=require('../../core/util');
//商店模型
class Shop extends Model{
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
Shop.hasMany(Goods)//一对多关联
modelInit(Shop);//初始化增删改查函数
module.exports={Shop};