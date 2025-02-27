const User = require('../models/User');

exports.saveUserData = async (req, res) => {
    try {
        const { name, mobileNumber, accountNumber, uniqueid } = req.body;

        const newUser = new User({
            name,
            mobileNumber,
            accountNumber,
            uniqueid
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(200).json({
            success: true,
            message: "User Data Submitted Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting user data"
        });
    }
};
