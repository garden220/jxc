const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//商店模型
class StockTaking extends Model{
}
StockTaking.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    st_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    remark:Sequelize.STRING,
},{sequelize,tableName:'stockTaking'});
modelInit(StockTaking);
module.exports={StockTaking};