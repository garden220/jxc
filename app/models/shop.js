const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const {Goods}=require('./goods');
//商店模型
class Shop extends Model{
    //查询
    static async search(id){
        const shop=await Shop.findOne({
            where:{id}
        });
        if(!shop){
            throw new global.errors.AuthFailed('商店不存在');
        }
        return shop;
    }
    //删除
    static async delete(id){   
        const shop=await Shop.destroy({
            where:{id}
        });
        if(!shop){
            throw new global.errors.AuthFailed('商店不存在');
        }
        return shop;
    }
    //更新
    static async updateRows(obj){
        const {id,name,address,user_id,phone,remark}=obj;
        const shop=await Shop.update({name,address,user_id,phone,remark},{where:{id}});
        if(!shop){
            throw new global.errors.AuthFailed('更新失败');
        }
        return shop;
    }
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
module.exports={Shop};