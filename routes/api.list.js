const router = new require("express").Router();
const ListModel = require("./../models/List");

router.get("/", async (req, res, next) => {
  try {
    const lists = await ListModel.find().limit(10);
    res.json(lists);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const list = await ListModel.findById(req.params.id);
    res.json(list);
  } catch (err) {
    next(err);
  }
});


module.exports = router;