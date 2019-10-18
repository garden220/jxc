const {Validator,Rule}= require('../../core/validator-v2');
const {User}=require('../models/user');
const {Categories}=require('../models/categories');
const {Unit}=require('../models/unit');
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
            new Rule('isOptional'),
            new Rule('isEmail','不符合Email规范')
        ];
        this.password=[
            new Rule('isLength','密码至少6个字符，最多32字符',{
                min:6,
                max:32
            }),
            new Rule('matches','密码不符合规范','')
        ];
        this.name=[
            new Rule('isLength','昵称不符合长度规范，至少5个字符',{
                min:5,
                max:32
            }),
        ];
        this.phone=[
            new Rule('isMobilePhone','请填入正确手机号','zh-CN'),
            new Rule('isLength','手机号需要11位数字',{
                min:11,
                max:11
            }),
        ],
        this.head_url=[
            new Rule('isOptional')
        ];
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
//货物新建、更新验证
class GoodsValidator extends Validator{
    constructor(){
        super();
        this.number=[
            new Rule('isInt','数量必须是数字',{
                min:0,
                max:32
            })
        ];
        this.name=[
            new Rule('isLength','名称不能为空',{
                min:1,
                max:32
            }),
        ];
    }
}
class CategoriesValidator extends Validator{
    constructor(){
        super();
        this.name=[
            new Rule('isLength','名称不能为空',{
                min:1,
                max:32
            }),
        ];
    }
    async validateName(vals){
        const name=vals.body.name;
        const _name=await Categories.findOne({
            where:{
                name
            }
        })
        if(_name){
            throw new Error('name已存在');
        }
    }
}
class UnitValidator extends Validator{
    constructor(){
        super();
        this.name=[
            new Rule('isLength','名称不能为空',{
                min:1,
                max:32
            }),
        ];
    }
    async validateName(vals){
        const name=vals.body.name;
        const _name=await Unit.findOne({
            where:{
                name
            }
        })
        if(_name){
            throw new Error('name已存在');
        }
    }
}
//商店新建、更新验证
// class ShopValidator extends Validator{
//     constructor(){
//         super();
//         this.name=[
//             new Rule('isInt','数量必须是数字',{
//                 min:0,
//                 max:32
//             })
//         ];
//         this.name=[
//             new Rule('isLength','名称不能为空',{
//                 min:1,
//                 max:32
//             }),
//         ];
//     }
// }
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
//非空验证
class NotEmptyValidator extends Validator{
    constructor(){
        super();
        this.token=[
            new Rule('isLength','不允许为空',{min:1}),
        ];
    }
}

module.exports={
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    GoodsValidator,
    CategoriesValidator,
    UnitValidator
}