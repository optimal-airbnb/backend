const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model");

router.get("/", (req, res) => {
  Users.find()
    .then((user) => {
      res.status(200).json(user);
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
          .json({ message: "Could not find project for given user" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

router.post("/", (req, res) => {
  const user = req.body;
  Users.add(user)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new project" });
    });
});

router.put("/:id", (req, res) => {
  const credentials = req.body;
  const id = req.params.id;

  Users.find(id)
    .then((user) => {
      if (validateUser(user)) { 
        
        const rounds = process.env.HASH_ROUNDS || 8; // 8  is the number of rounds as 2 ^ 8
        const hash = bcrypt.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.update(credentials).then((updateUser) => {
          res.status(200).json(updateUser, id);
        });
      } else {
        res.status(404).json({ message: "Can not update the user" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Have some problem while updating user" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Users.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ removed: id, body });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete project" });
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
  Users.find(req.params.id)
  .then(user => {
    if(user){
      req.user = user;
      next();
    }else if (!user){
      res.status(400).json({ message: "invalid user id" })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Err while get Id"
    })
  })
}

module.exports = router;
