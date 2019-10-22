//创建数据库连接
const Sequelize = require('sequelize');
const {dbName,host,port,user,password}=require("../config/config").database;
//Sequelize接收四个参数，dbName,user,password，参数对象
const sequelize=new Sequelize(dbName,user,password,{
    dialect:'mysql',//指定数据库类型,记得安装数据库依赖
    host,
    port,
    logging:true,//是否打印操作日志
    timezone:'+08:00',//默认生成时间会有差别，必须加上8小时
    define:{//自定义配置
        timestamps:true,//是否添加时间戳(creattime updatetime,deletetime)
        paranoid:true,//假删，不从数据库中删除数据，而只是增加一个 deletedAt 标识
        underscored: true,//不使用驼峰式命令规则，这样会在使用下划线分隔,updatedAt=>updated_at
        freezeTableName: true,//禁止修改表名
    }
});
//将所有模型与数据库同步，使用`force:true`属性会首先删除表并重新创建，生成环境中使用Migrations(迁移)
sequelize.sync({ force: true });

module.exports={
    sequelize
}