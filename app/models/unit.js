const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//商店模型
class Unit extends Model{
}
Unit.init({
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
    remark:Sequelize.STRING,
},{sequelize,tableName:'unit'});
modelInit(Unit);//初始化增删改查函数
module.exports={Unit};