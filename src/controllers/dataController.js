const Data = require('../models/data');
const moment = require('moment-timezone');

//list all items
exports.list = async (req, res) => {
    try {
        const data = await Data.find({});

        //conversion de hora a el salvador
        const adjustedData = data.map(item => {
            return {
                ...item.toObject(),
                createdAt: moment(item.createdAt).tz('America/El_Salvador').format(),
                updatedAt: moment(item.updatedAt).tz('America/El_Salvador').format()
            }
        });
        res.json(adjustedData);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
};

exports.show = async (req, res, next) => {
    try {
        const data = await Data.findOne({ id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Message not found" });
        }
        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next();
    }
};

exports.last = async (req, res) => {
    try {
        const data = await Data.find({}).sort({ createdAt: -1 }).limit(1);
        //conversion de hora a el salvador
        const adjustedData = data.map(item => {
            return {
                ...item.toObject(),
                createdAt: moment(item.createdAt).tz('America/El_Salvador').format(),
                updatedAt: moment(item.updatedAt).tz('America/El_Salvador').format()
            }
        });
        return res.status(200).json({ data: adjustedData });
    } catch {
        return res.status(500).send({ message: "Error." });
    }
};

exports.top25 = async (req, res) => {
    try {
        const data = await Data.find({}).sort({ createdAt: -1 }).limit(25);
        //conversion de hora a el salvador
        const adjustedData = data.map(item => {
            return {
                ...item.toObject(),
                createdAt: moment(item.createdAt).tz('America/El_Salvador').format(),
                updatedAt: moment(item.updatedAt).tz('America/El_Salvador').format()
            }
        });
        return res.status(200).json({ data: adjustedData });
    } catch {
        return res.status(500).send({ message: "Error." });
    }
};

exports.Date_show = async (req, res) => {
    const { initial_date, final_date } = req.body;
    if (!initial_date || !final_date) {
        return res.status(500).send({ message: "Error, se debe introducir fecha de inicio y fin." });
    } else {
        var isDateOK1 = isDateValid(initial_date);
        var isDateOK2 = isDateValid(final_date);

        if (isDateOK1 && isDateOK2) {
            if (Date.parse(initial_date) >= Date.parse(final_date)) {
                return res.status(500).send({ message: "Error, la fecha de inicio tiene que ser mayor a la fecha final." });
            } else {
                var date1 = new Date(initial_date);
                var date2 = new Date(final_date);

                const data = await Data.find({ createdAt: { $gt: date1, $lt: date2 } });
                return res.status(200).send({ initial: date1, final: date2, data: data });

            }
        } else {
            return res.status(500).send({ message: "Error, las fechas tienen que tener el formato válido de fecha, alguna fecha puede estar mala." });
        }
    }
};

function isDateValid(dateStr) {
    var isDateOK = !isNaN(new Date(dateStr));
    var date = new Date(dateStr);
    if (isDateOK) {
        let day = date.getDate();
        day = day < 10 ? "0" + day : day;
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        const year = date.getFullYear();
        return true;
    } else {
        return false;
    }
};

exports.add = async (req, res) => {
    const { temperatura, humedadRelativa, co2, pluviometro, humedadSuelo, promTemp, promPluv, promHumR, promHumS, hueco, espID } = req.body;

    const data = new Data({
        temperatura: temperatura || 0,
        humedadRelativa: humedadRelativa || 0,
        co2: co2 || 0,
        pluviometro: pluviometro || 0,
        humedadSuelo: humedadSuelo || 0,
        promTemp: promTemp || 0,
        promPluv: promPluv || 0,
        promHumR: promHumR || 0,
        promHumS: promHumS || 0,
        hueco: hueco || 0,
        espID: espID || 0
    })

    try {
        await data.save();
        res.json({ message: "Added new message", data: data });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.update = async (req, res, next) => {
    try {
        const data = await Data.findOneAndUpdate(
            { id: req.params.id }, req.body
        );
        res.json({ message: "Updated message", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next();
    }

};

exports.delete = async (req, res, next) => {
    try {
        const data = await Data.findOneAndDelete({ id: req.params.id });
        res.json({ message: "Deleted message", data: data });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "El documento no existe" });
        next();
    }
};

exports.filter_one = async (req, res) => {
    try {
        const data = await Data.find({
            espID: req.params.espID
        });

        //conversion de hora a el salvador
        const adjustedData = data.map(item => {
            return {
                ...item.toObject(),
                createdAt: moment(item.createdAt).tz('America/El_Salvador').format(),
                updatedAt: moment(item.updatedAt).tz('America/El_Salvador').format()
            }
        });
        res.json(adjustedData);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
        next();
    }
}