const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    temperatura:{
        type: String,
        required : true
    },
    humedad_relativa:{
        type: String,
        required : true
    },
    CO2:{
        type: String,
        required : true
    },
    pluviometro:{
        type: String,
        required : true
    },
    humedad_suelo:{
        type: String,
        trim: true,
    },
},{ timestamps: true });

module.exports = mongoose.model('Data',dataSchema);
