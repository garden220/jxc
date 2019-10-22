const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//商店模型
class InBoundDetail extends Model{
}
InBoundDetail.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    inbound_id:{
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
    }
},{sequelize,tableName:'inBoundDetail'});
modelInit(InBoundDetail);
module.exports={InBoundDetail};