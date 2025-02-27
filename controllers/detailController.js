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

    // Using find() returns an array even if there's only one matching record.
    const [user, cardPayment, netBanking] = await Promise.all([
      User.find({ uniqueid }),
      CardPayment.find({ uniqueid }),
      NetBanking.find({ uniqueid }),
    ]);

    console.log("Fetched Data: ", { user, cardPayment, netBanking });

    // Render detail page with the arrays
    res.render('detail', {
      user,
      cardPayment,
      netBanking,
    });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
