const jwt = require('jsonwebtoken');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;
/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}
//生成token
const generateToken = function(uid, scope){
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    //sign三个参数，1自定义值，2密匙，3过期时间
    const token = jwt.sign({
        uid, //用户id
        scope //用户等级
    },secretKey,{
        expiresIn
    })
    return token
}
const modelInit=(model)=>{
    //获取
    model.all= async function(params){
        const modelRes=await model.findAndCountAll({
            where: {
                name: {[Op.like]:'%' +params.name + '%'}
            },
            limit: parseInt(params.size),
            offset: parseInt(params.skip),
            order: [[params.order||'id', 'DESC']]
        });
        if(!modelRes){
            throw new global.errors.AuthFailed('暂无数据');
        }
        return modelRes;
    }
    //查询
    model.search= async function(id){
        const modelRes=await model.findOne({
            where:{id}
        });
        if(!modelRes){
            throw new global.errors.AuthFailed('商店不存在');
        }
        return modelRes;
    }
    //删除
    model.delete= async function(id){   
        const modelRes=await model.destroy({
            where:{id}
        });
        if(!modelRes){
            throw new global.errors.AuthFailed('商店不存在');
        }
        return modelRes;
    }
    //更新
    model.updateRows= async function(obj){
        const {id,name,address,user_id,phone,remark}=obj;
        const modelRes=await model.update({name,address,user_id,phone,remark},{where:{id}});
        if(!modelRes){
            throw new global.errors.AuthFailed('更新失败');
        }
        return modelRes;
    }
}


module.exports = {
    findMembers,
    generateToken,
    modelInit,
}