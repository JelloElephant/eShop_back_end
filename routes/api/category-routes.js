const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const response = Category.findAll({
    include: [{  model: Product}]
  })
    res.status(200).json(response)
  }catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await Category.findByPK(req.params.id, {
    include: [{ model: Product }]
    })
    if (!response) {
    res.status(404).json({ message: "There are no categories with the given ID."})
    }
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((product) => {
      res.json(200).json(product)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    const response = Category.update({
      category_name: req.body.category_name
    },
    {
      returning: true,
      where: { id: req.params.id }
    })
    if (!response) {
      res.status(404).json({ message: "No Category ID existing at given ID, no action taken." })
      return
    }
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const response = Category.destroy({ where: { id: req.params.id } })
    if (!response) {
      res.status(404).json({ message: "No Category found with matching ID to delete, no action taken."})
    }
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
