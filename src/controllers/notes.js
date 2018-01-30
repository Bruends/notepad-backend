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

  if (!title) {
    return res.status(400).send({ error: 'Insert the Title' });
  }

  try {
    const { notes } = await userModel.findOne({ email });
    notes.push({ title, text });
    await userModel.findOne({ email }).update({ $set: { notes } });
    return res.send(notes);
  } catch (err) {
    return res.status(400).send({ error: 'Error on adding message' });
  }
});


router.put('/', async (req, res) => {
  const { email } = req;
  const { id, title, text } = req.body;

  if (!title) {
    return res.status(400).send({ error: 'Insert the Title' });
  }

  try {
    const { notes } = await userModel.findOne({ email });

    const newNotes = notes.map((note) => {
      if (note._id == id) {
        return {
          _id: note._id,
          title,
          text,
        };
      }
      return note;
    });

    await userModel.findOne({ email }).update({ $set: { notes: newNotes } });
    return res.send(newNotes);
  } catch (err) {
    return res.status(400).send({ error: 'Error on updating message' });
  }
});


router.delete('/', async (req, res) => {
  const { email } = req;
  const { id } = req.body;
  try {
    const { notes } = await userModel.findOne({ email });

    const newNotes = notes.filter(note => note._id != id);

    await userModel.findOne({ email }).update({ $set: { notes: newNotes } });
    return res.send(newNotes);
  } catch (err) {
    return res.status(400).send({ error: 'Error on deleting message' });
  }
});

module.exports = router;
