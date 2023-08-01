const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{  model: Product }]
    })
    res.status(200).json(categories)
  }catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cateId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!cateId) {
      res.status(404).json({ message: "There are no categories with the given ID."})
      }
      res.status(200).json(cateId)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  // try {
  //   const newCat = await Category.create(req.body)
  //   res.json(200).json(newCat)
  // } catch(err) {
  //   res.status(500).json(err)
  // }
  Category.create(req.body)
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(500).json(err))
    
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const cateUpdate = await Category.update(req.body, 
    {
      where: { id: req.params.id }
    })
    if (!cateUpdate) {
      res.status(404).json({ message: "No Category ID existing at given ID, no action taken." })
      return
    }
    res.status(200).json(cateUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
  

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const cateDel = await Category.destroy({ where: { id: req.params.id } })
    if (!cateDel) {
      res.status(404).json({ message: "No Category found with matching ID to delete, no action taken."})
    }
    res.status(200).json(cateDel)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
