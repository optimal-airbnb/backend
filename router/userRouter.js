const router = require("express").Router();

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

router.put("/:id", validate, (req, res) => {
  const credentials = req.body;

  const rounds = process.env.HASH_ROUNDS || 8; // 8  is the number of rounds as 2 ^ 8
  const hash = bcrypt.hashSync(credentials.password, rounds);

  credentials.password = hash;

  const id = req.params.id;

  Users.findById(id)
    .then((user) => {
      if (user) {
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
  if (req.decodedToken.id) {
    next();
  } else {
    res.status(403).json({ you: "can not change this data!" });
  }
}

module.exports = router;
