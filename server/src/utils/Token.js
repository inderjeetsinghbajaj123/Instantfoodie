import jwt from "jsonwebtoken";

const Token = (email, id, role) => {
  return jwt.sign(
    { email: email, _id: id, role: role },
    process.env.JWT_SECRET,
  );
};

export default Token;
