const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

exports.addUser = async (req, res, next) => {
  try {
    
    const { userDetails } = req.body;

    const decodedUser = jwt_decode(userDetails);

    const email = decodedUser.email;

    const userPresent = await User.find({ email: email });

    if (userPresent.length > 0) {
      // login
      res
        .status(200)
        .json({ success: true, data: userPresent[0], token: userDetails });
    } else {

      // sign up
      const newUser = new User({
        name: decodedUser.name,
        email: decodedUser.email,
        userImage: decodedUser.picture,
        googleSub: decodedUser.sub,
      });

      const signedUpUser = await newUser.save();

      res.status(200).json({
        success: true,
        data: signedUpUser,
        token: userDetails,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      data: error,
      user:jwt_decode(req.body.userDetails)
    });
  }
};

exports.allUser = async (req, res) => {
  const allUser = await User.find({});
  res.status(200).json({
    success: true,
    data: allUser,
  });
};

exports.deletealluser = async (req, res) => {
  const deletedall = await User.deleteMany({});
  res.send(deletedall);
};
