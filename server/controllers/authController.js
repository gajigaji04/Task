const authService = require("../services/authService");

// 회원가입
exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 회원탈퇴
exports.deleteUser = async (req, res) => {
  try {
    await authService.deleteUser(req.user.userId);
    res.json({ message: "회원탈퇴 완료" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
