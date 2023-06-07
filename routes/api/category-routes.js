const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const specificCateg = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    specificCateg
    ? res.status(200).json(specificCateg)
    : res.status(404).json({ message: "Try Another Id" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCateg = await Category.create(req.body);
    res.status(200).json(newCateg);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateCateg = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    updateCateg
    ? res.status(200).json(updateCateg)
    : res.status(404).json({ message: "Try Another Id" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delCateg = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    delCateg
      ? res.status(200).json(delCateg)
      : res.status(404).json({ message: "Try Another Id." });
  } catch (err) {
    res.send(500).json(err);
  }
});

module.exports = router;