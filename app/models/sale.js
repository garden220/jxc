const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//商店模型
class Sale extends Model{
}
Sale.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    sale_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    sale_time:{
        type:Sequelize.STRING,
        allowNull:false
    },
    shop_id:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    user_id:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    in_price:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    remark:Sequelize.STRING,
},{sequelize,tableName:'sale'});
modelInit(Sale);
module.exports={Sale};