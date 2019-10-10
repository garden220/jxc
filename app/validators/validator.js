const {Validator,Rule}= require('../../core/validator-v2');
const {User}=require('../models/user');
const {LoginType}=require('../lib/enum');

//正整数校验
class PositiveIntegerValidator extends Validator{
    constructor(){
        super();
        this.id=[
            new Rule('isInt','需要是正整数',{min:1})
        ]
    }

}
//注册校验
class RegisterValidator extends Validator{
    constructor(){
        super();
        this.email=[
            new Rule('isEmail','不符合Email规范')
        ];
        this.password1=[
            new Rule('isLength','密码至少6个字符，最多32字符',{
                min:6,
                max:32
            }),
            new Rule('matches','密码不符合规范','')
        ];
        this.password2=this.password1;
        this.nickname=[
            new Rule('isLength','昵称不符合长度规范，至少5个字符',{
                min:5,
                max:32
            }),
        ]
    }
    //自定义校验
    validatePassword(vals){
        const psw1=vals.body.password1;
        const psw2=vals.body.password2;
        if(psw1!==psw2){
            throw new Error('两个密码必须相同');
        }
    }
    async validateEmail(vals){
        const email=vals.body.email;
        const user=await User.findOne({
            where:{
                email:email
            }
        })
        if(user){
            throw new Error('email已存在');
        }
    }
}
//Token校验
class TokenValidator extends Validator{
    constructor(){
        super();
        this.account=[
            new Rule('isLength','不符合账号规则',{
                min:5,
                max:32
            }),
        ];
        this.secret=[
            new Rule('isOptional'),
            new Rule('isLength','至少6个字符串',{
                min:6,
                max:128
            }),
        ];
    }
    validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('type是必须参数');
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
    }
}

module.exports={
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator
}