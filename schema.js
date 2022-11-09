const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({

    listname: String, 
    id: String, 

});

listSchema.statics.isList = async function (listname) {

    if(!listname) throw new Error ('Error 404');

    try{

        const list = await this.findOne({listname});

        if(list){
            return false;
        }
        else{
            return true;
        }
        
    } catch (error) {

        console.log("There is an Error");
        console.log(error.message);
        return false;
    }

}

module.exports = mongoose.model('list', listSchema);