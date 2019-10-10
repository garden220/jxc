const {Sequelize,Model} = require('sequelize');
const bcrypt=require('bcryptjs');
const {sequelize}=require('../../core/db');

class User extends Model{
    //验证账号密码是否正确
    static async verifyEmailPassword(email,plainPassword){
        const user=await User.findOne({
            where:{
                email
            }
        });
        if(!user){
            throw new global.errors.AuthFailed('账号不存在');
        }
        if(!plainPassword){
            throw new global.errors.AuthFailed('密码不能为空');
        }
        const correct=bcrypt.compareSync(plainPassword,user.password)
        if(!correct){
            throw new global.errors.AuthFailed('密码不正确');
        }
        return user;
    }
}

User.init({
    id:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        unique:true,
        primaryKey:true,//主键
        autoIncrement:true,//数字自增
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        //model属性操作
        set(val){
            const salt=bcrypt.genSaltSync(10);//定义盐,盐是生成密码的成本
            const psw=bcrypt.hashSync(val,salt);//创建加密密码
            this.setDataValue('password',psw);//设置新值
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    },
    text:Sequelize.STRING
},{sequelize,tableName:'user'});

module.exports={User};