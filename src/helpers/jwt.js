import jwt from "jsonwebtoken";
import User from "../models/User";

// function helper to validate and re-generate expired token.
async function checkToken(token) {
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (error) {
    return false;
  }
  const user = await User.findOne({ _id: __id, isActive: true });
  if (user) {// user exists
    // token is correct
    const token = jwt.sign( // re-create token
      { _id: __id }, // user id 
      'secretkeytogeneratetokenfromredcomercialbackend', // random str
      { expiresIn: '1d' } // 1 day
    );
    return { token: token, role: user.role };
  } else {
    return false;
  }
}

export default {
  // generate token 
  encode: async (_id) => {
    const token = 
      jwt.sign(
        { _id: _id }, // user id
        'secretkeytogeneratetokenfromredcomercialbackend', // random str
        { expiresIn: '1d' } // 1 day
      );
      return token;
  },
  // validate token
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, 
        'secretkeytogeneratetokenfromredcomercialbackend');
      const user = await User.findOne({ _id: _id, isActive: true });
      if (user)
        return true;
      else 
        return false;
    } catch (error) {
      // Can be token expired, so we re-generate the token.
      const newToken = await checkToken(token);
      return newToken;
    }
  }

}