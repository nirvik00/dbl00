const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const GeoSchema=new Schema({
  num:{
    type:String,
    required:true
  },
  field0:{
    type:String,
    required:true
  },
  field1:{
    type:String,
    required:true
  }
});
mongoose.model('geo', GeoSchema);