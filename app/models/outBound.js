const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//商店模型
class OutBound extends Model{
}
OutBound.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    outbound_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    out_time:{
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
    out_price:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    remark:Sequelize.STRING,
},{sequelize,tableName:'outBound'});
modelInit(OutBound);
module.exports={OutBound};