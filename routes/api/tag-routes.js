const router = require('express').Router();
const { model } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const ans = Tag.findAll({ include: { model: Product}})
    res.status(200).json(ans)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const ans = Tag.findByPK(req.params.id, { include: [{model: Product}] })
    if (!ans) {
      res.status(404).json({ message: "No tags could be found with the given ID."})
    }
    res.status(200).json(ans)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const ans = Tag.create(req.body)
    res.status(200).json(ans)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    const ans = Tag.update({ 
      tag_name: req.body.tag_name
    }, 
    { returning: true, 
      where: {id: req.params.id}
    })

    if (!ans) {
      res.status(404).json({ message: "No tag was found with given ID, no action can be taken."})
    }

    res.status(200).json(ans)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const ans = Tag.destroy({
      where: { id: req.params.id}
    })
    if (!ans) {
      res.status(404).json({ message: "No tag was found with the given ID, no deletion can be completed."})
    }
    res.status(200).json(ans)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
