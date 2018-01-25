const router = require('express').Router();
const userController = require('../controllers/user')();


router.post('/register', async (req, res) => {
  await userController.register(req, res);
});

module.exports = router;
