const User = require("../models/User");
const authService = require("../services/authService");

// 회원가입
exports.signup = async (req, res) => {
  try {
    console.log("[회원가입 요청]", req.body);

    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("err: 이미 존재하는 유저:", email);
      return res.status(400).json({ message: "이미 가입된 이메일" });
    }

    const user = await authService.signup(req.body);

    console.log("DB 저장 성공:", user);

    return res.status(201).json({
      message: "회원가입 성공",
      user,
    });
  } catch (err) {
    console.error("err: DB 저장 실패:", err.message);

    return res.status(500).json({
      message: err.message,
    });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
    console.log("로그인 접속", data);
  } catch (err) {
    console.log("err:", err.message);

    res.status(400).json({ message: err.message });
  }
};

// 회원탈퇴
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    await authService.deleteUser(req.user.userId);

    res.json({ message: "회원탈퇴 완료" });

    console.log("회원탈퇴 성공:", userId);
  } catch (err) {
    console.log("회원탈퇴 실패:", err.message);

    res.status(400).json({ message: err.message });
  }
};
