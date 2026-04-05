const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 회원가입
exports.signup = async ({ email, password, name }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("이미 존재하는 이메일");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name,
  });

  await user.save();
  return user;
};

// 로그인
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("유저 없음");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("비밀번호 틀림");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const userData = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  return { user: userData, token };
};

// 회원탈퇴
exports.deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};
