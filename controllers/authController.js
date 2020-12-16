const User = require("../models/User");
const jwt = require('jsonwebtoken')

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {email: '', password: ''};

  // Incorrect email
  if(err.message === "incorrect email"){
    errors.email = 'that email is not registered'
  }

  if(err.message === "incorrect password"){
    errors.password = 'that password is incorrect'
  }

  // Duplicated email
  if(err.code === 11000){
    errors.email = "That email is already registered";
    return errors;
  }

  // Validate errors
  if(err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(err => {
      errors[err.properties.path] = err.properties.message;
    })
  }

  return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SecretKey, {
    expiresIn: maxAge,
  });
}

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name:name, email: email, password: password, role: "Admin", group: 0});
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000
    });
    res.status(201).json({user: user._id, success: true})
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors})
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000
    });
    res.status(200).json({ user: user.name, token: token })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).json({ errors });
    console.log(e);
  }
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1,
    httpOnly: true
  })
  res.redirect("/")
}