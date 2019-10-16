const {Sequelize,Model} = require('sequelize');
const {sequelize}=require('../../core/db');
const Op = Sequelize.Op;
//货物模型
class Goods extends Model{
    //获取
    static async all(params){
        const goods=await Goods.findAndCountAll({
            where: {
                name: {
                    [Op.like]:'%' +params.name + '%'
                },
              },
              limit: params.size,
              offset: params.skip,
        });
        if(!goods){
            throw new global.errors.AuthFailed('货物不存在');
        }
        return goods;
    }
    //查询
    static async search(params){
        const goods=await Goods.findAndCountAll({
            where:{...params}
        });
        if(!goods){
            throw new global.errors.AuthFailed('货物不存在');
        }
        return goods;
    }
    //删除
    static async delete(params){   
        const goods=await Goods.destroy({
            where:{...params}
        });
        if(!goods){
            throw new global.errors.AuthFailed('货物不存在');
        }
        return goods;
    }
    //更新
    static async updateRows(obj){
        const {id,name,number,unit_price,total_price,categories_id,shop_id,unit_id,img_url,remark}=obj;
        const goods=await Goods.update({
            name,
            number,
            unit_price,
            total_price,
            categories_id,
            shop_id,
            unit_id,
            img_url,
            remark
        },{
            where:{
                id
            }
        });
        if(!goods){
            throw new global.errors.AuthFailed('更新失败');
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