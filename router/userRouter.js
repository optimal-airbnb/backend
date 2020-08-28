const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const Properties = require('../PropertyRouter/property-model.js')

router.get("/", (req, res) => {
  Users.find()
    .then((user) => {
      res.status(200).json({user: user});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Invalid user" }, err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "Could not find users for given user" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

router.post("/", (req, res) => {
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

router.post('/property', (req, res) => {
  const houseData = req.body;
    Properties.add(houseData)
    .then(house => {
      console.log(house)
      res.status(201).json(house);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new property' });
    });
})

router.put("/:id", (req, res) => {
  const credentials = req.body;
  const id = req.params.id;
    
      if (credentials) {
        const rounds = process.env.HASH_ROUNDS || 8; // 8  is the number of rounds as 2 ^ 8
        const hash = bcrypt.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.update(credentials).then((updateUser) => {
          res.status(200).json(updateUser, id);
        });
      } else {
        res.status(404).json({ message: "Can not update the user" });
      }
  
   
});

router.delete("/:id", validateUser, (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ removed: id });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

function validate(req, res, next) {
  if (req.decodedToken) {
    next();
  } else {
    res.status(403).json({ you: "can not change this data!" });
  }
}

function validateUser(req, res, next) {
  // do your magic!
  Users.findBy(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else if (!user) {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Err while get Id",
      });
    });
}

module.exports = router;
