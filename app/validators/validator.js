const {Validator,Rule}= require('../../core/validator');

class PositiveIntegerValidator extends Validator{
    constructor(){
        super();
        this.id=[
            new Rule('isInt','需要是正整数',{min:1})
        ]
    }

}
module.exports={
    PositiveIntegerValidator
}