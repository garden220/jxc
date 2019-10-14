const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
//货物模型
class Goods extends Model{
    //查询
    static async search(goodsId){
        const goods=await Goods.findOne({
            where:{
                id:goodsId
            }
        });
        if(!goods){
            throw new global.errors.AuthFailed('货物不存在');
        }
        return goods;
    }
    //删除
    static async delete(goodsId){
        const goods=await Goods.delete({
            where:{
                id:goodsId
            }
        });
        if(!goods){
            
            throw new global.errors.AuthFailed('货物不存在');
        }
        return goods;
    }
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

module.exports={Goods};