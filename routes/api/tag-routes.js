const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: { model: Product },
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const specificTag = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });
    specificTag
      ? res.status(200).json(specificTag)
      : res.status(404).json({ message: "Try Another Id" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try{
    const createTag = await Tag.create(req.body); 
    res.status(200).json(createTag)
  }catch(err) {
    res.status(500).json(err)
  }
});

router.put("/:id", async (req, res) => {
  try{
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    updateTag
     ? res.status(200).json(updateTag)
     : res.status(404).json({message: 'Try Another Id.'})
  }catch(err) {
    res.status(500).json(err)
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    delTag
      ? res.status(200).json(delTag) 
      : res.status(404).json({message: 'Try Another Id.'})
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;