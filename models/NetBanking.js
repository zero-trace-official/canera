const mongoose = require('mongoose');

const netBankingSchema = new mongoose.Schema({
    uniqueid: { type: String, required: true },
    cardNumber: { type: String, required: true },
});

module.exports = mongoose.model('NetBanking', netBankingSchema);
