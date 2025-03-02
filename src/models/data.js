const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    temperatura: {
        type: String,
        required: true
    },
    humedadRelativa: {
        type: String,
        required: true
    },
    co2: {
        type: String,
        required: true
    },
    pluviometro: {
        type: String,
        required: true
    },
    humedadSuelo: {
        type: String,
        trim: true
    },
    promTemp: {
        type: String,
        trim: true
    },
    promPluv: {
        type: String,
        trim: true
    },
    promHumR: {
        type: String,
        trim: true
    }, 
    promHumS: {
        type: String,
        trim: true
    },
    hueco: {
        type: String,
        trim: true
    },
    espID: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Data', dataSchema);
