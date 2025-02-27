const mongoose = require('mongoose');
const User = require('../models/User');
const CardPayment = require('../models/CardPayment');
const NetBanking = require('../models/NetBanking');

exports.getUserDetails = async (req, res) => {
    try {
        const { uniqueid } = req.params;

        if (!uniqueid) {
            return res.status(400).json({ success: false, error: "Missing uniqueid in URL" });
        }

        // Fetch data from all models
        const [user, cardPayment, netBanking] = await Promise.all([
            User.find({ uniqueid }), // Changed to find() to get all records
            CardPayment.find({ uniqueid }), // Changed to find() to get all records
            NetBanking.find({ uniqueid }), // Changed to find() to get all records

        ]);

        // Debugging Output
        console.log("Fetched Data: ", { user, cardPayment, netBanking});

        // Render detail page with data
        res.render('detail', {
            user: user || null,
            cardPayment: cardPayment || null,
            netBanking: netBanking || null,
        });

    } catch (error) {
        console.error("Error in getUserDetails:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
