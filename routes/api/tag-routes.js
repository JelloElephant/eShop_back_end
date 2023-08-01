const router = require('express').Router();
const { model } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    Tag.findAll({ include: { model: Product}}).then((tags) => {
      res.status(200).json(tags)
      res.json(tags)
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, { include: [{model: Product}] })
    if (!tagId) {
      res.status(404).json({ message: "No tags could be found with the given ID."})
    }
    res.status(200).json(tagId)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const upTag = await Tag.update({ 
      tag_name: req.body.tag_name
    }, 
    { 
      where: {id: req.params.id}
    })
    if (!upTag) {
      res.status(404).json({ message: "No tag was found with given ID, no action can be taken."})
    }
    res.status(200).json(upTag)
    res.json(upTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: { id: req.params.id}
    })
    if (!delTag) {
      res.status(404).json({ message: "No tag was found with the given ID, no deletion can be completed."})
    }
    res.status(200).json(delTag)
    res.json(delTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
