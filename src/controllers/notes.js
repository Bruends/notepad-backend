const router = require('express').Router();
const userModel = require('../models/user');

router.get('/', async (req, res) => {
  const { email } = req;
  const { notes } = await userModel.findOne({ email });
  return res.send({ notes });
});

router.post('/', async (req, res) => {
  const { email } = req;
  const { title, text } = req.body;
  try {
    const user = await userModel.findOne({ email });
    user.notes.push({ title, text });
    await userModel.findOne({ email }).update(user);
    return res.send(user.notes);
  } catch (err) {
    return res.status(400).send({ error: 'Error on adding message' });
  }
});

module.exports = router;
