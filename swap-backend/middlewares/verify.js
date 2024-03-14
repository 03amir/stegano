const User = require("../models/userModel");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(req, res, next) {
  try {
    
    const { authorization } = req.headers;


    if (!authorization) {
      return res.status(400).send("You have to log in first");
    }

    const userToken = authorization.slice(7);

    const ticket = await client.verifyIdToken({
      idToken: userToken,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const userdata = await User.findOne({ email: payload.email });

    if (userdata) {
      
      req.user = userdata;

      next();

    } else {

      res.json({

        success: false,
        data: "User not authorized",
        
      });

    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal server error.."
    });
  }
}

module.exports = verify;
