const {Schema, model} = require('mongoose')   //schema ko mongoose se mungwaya

const CategorySchema=new Schema({
    CategoryName:{
        type:String,
        unique:true,
        required:true
    },
    CategoryImage:{
        type:String,
        required:true
    }

})

const CategoryFromModel=model('category',CategorySchema)
module.exports={CategoryFromModel}