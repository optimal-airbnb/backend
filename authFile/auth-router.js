const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../router/users-model.js");
const secrets = require("../secretToken.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (credentials) {
    const rounds = process.env.HASH_ROUNDS || 8; // 8  is the number of rounds as 2 ^ 8
    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((users) => {
        console.log(users);
        res.status(200).json({ data: "Register succesful" });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ error: err.message, message: "That user already exists" })
      );
  } else {
    res
      .status(400)
      .json({ message: "Please provide a name, username, and password" });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username: username })
  .then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createToken(user);

      res.status(200).json({ token, hello: user.username });
    } else {
      res.status(401).json({ error: " You shall not pass!" });
    }
  })
  .catch((error) => {
    res.status(500).json({ error: error.message });
  });
});

router.get("/logout", (req, res) => {
  if (req.headers.authorization) {
    req.destroy(req.headers.authorization, (err) => {
      if (err) {
        res.status(500).json({ error: "Could not logout, please try again" });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(200).json({ message: "Already logged out" });
  }
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
