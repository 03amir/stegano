const User = require("../models/userModel");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);

exports.addUser = async (req, res) => {
  try {

    const { userDetails } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: userDetails,
        audience: process.env.CLIENT_ID,
      });

    const payload = ticket.getPayload();

    const userEmail = payload.email;

    const userPresent = await User.find({ email: userEmail });

    if (userPresent.length > 0) {
      // login
      res
        .status(200)
        .json({ success: true, data: userPresent[0], token: userDetails });
    } else {

      // sign up
      const newUser = new User({
        name: payload.name,
        email: payload.email,
        userImage: payload.picture,
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
    });
  }
};

exports.updateUser = async (req, res) => {

  const logedUser = req.user;

  const { name, mobile, collegeName } = req.body;

  try {
 

    const user = await User.findOne({email:logedUser.email});

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = name || user.name;
    user.mobile = mobile || user.mobile;
    user.collegeName = collegeName || user.collegeName;

    const updatedUser = await user.save();

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.checkAuth = async (req, res) => {

  try {

    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header missing',
      });
    }

    const userToken = authorization.slice(7);

    const ticket = await client.verifyIdToken({
      idToken: userToken,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const userdata = await User.findOne({ email: payload.email });
   

    if (userdata) {
      return res.status(200).json({
        success: true,
        user: userdata
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
