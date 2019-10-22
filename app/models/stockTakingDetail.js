const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//商店模型
class StockTakingDetail extends Model{
}
StockTakingDetail.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    st_id:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    }
},{sequelize,tableName:'stockTakingDetail'});
modelInit(StockTakingDetail);
module.exports={StockTakingDetail};