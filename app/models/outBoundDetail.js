const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//商店模型
class OutBoundDetail extends Model{
}
OutBoundDetail.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    outbound_id:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    goods_id:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    number:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    unit_price:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    total_price:{
        type:Sequelize.BIGINT(11),
        allowNull:false
    },
    out_type:{
        type:Sequelize.STRING,
        allowNull:false
    },
},{sequelize,tableName:'outBoundDetail'});
modelInit(OutBoundDetail);
module.exports={OutBoundDetail};