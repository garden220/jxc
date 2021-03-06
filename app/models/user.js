const {Sequelize,Model} = require('sequelize');
const bcrypt=require('bcryptjs');
const {sequelize}=require('../../core/db');
const {modelInit}=require('../../core/util');
//用户模型
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
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull: true
    },
    phone:{
        type:Sequelize.BIGINT(11),
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
    shop_id:Sequelize.BIGINT(11),
    role:Sequelize.STRING,
    head_url:Sequelize.STRING,
    register_time:Sequelize.STRING,
    login_time:Sequelize.STRING
},{sequelize,tableName:'user'});
modelInit(User);
module.exports={User};