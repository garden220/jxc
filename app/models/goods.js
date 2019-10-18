const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
const Op = Sequelize.Op;
//货物模型
class Goods extends Model{ 
}

Goods.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    name:Sequelize.STRING,
    number:Sequelize.BIGINT(11),
    unit_price:Sequelize.BIGINT(11),
    total_price:Sequelize.BIGINT(11),
    categories_id:Sequelize.BIGINT(11),
    shop_id:Sequelize.BIGINT(11),
    unit_id:Sequelize.BIGINT(11),
    img_url:Sequelize.STRING,
    remark:Sequelize.STRING,
},{sequelize,tableName:'goods'});
modelInit(Goods);
module.exports={Goods};