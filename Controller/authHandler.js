const UserModel = require("../model/UserModel");

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  await UserModel.create({
    Firstname: firstname,
    Lastname: lastname,
    Email: email,
    Password: password,
    Is_admin: 0
  });
  res.redirect('/login');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ Email: email, Password: password });
  if (user) {
    req.session.userid=user._id;
    res.redirect('/');
  } else {
    res.redirect("/login");
  }
};
const logout = async (req, res) => {
    req.session.destroy(()=>{
    res.redirect("/");
    })
   
};

module.exports = {
  register,
  login,
  logout
};
