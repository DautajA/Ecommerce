import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
slug:{
    type:String,
    required:true,
    unique: true,
},
description:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
    min:0,
},
category:{
    type:mongoose.ObjectId,
    ref: 'Category',
    required: true,
},
quantity:{
    type:Number,
    required:true,
    min:0,
},
photo:{
    data:Buffer,
    contentType:String,
},
shipping:{
    type:Boolean,
    default: false,
},
}, {timestamps: true});

export default mongoose.model('Product', productSchema);