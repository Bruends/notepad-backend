const router = require('express').Router();
const userModel = require('../models/user');

// get all notes route
router.get('/', async (req, res) => {
  const { email } = req;
  const { notes } = await userModel.findOne({ email });
  return res.send({ notes });
});

// save a note
router.post('/', async (req, res) => {
  const { email } = req;
  const { title, text } = req.body;

  // if doest have a title, return error
  if (!title) {
    return res.status(400).send({ error: 'Insert the Title' });
  }

  try {
    const { notes } = await userModel.findOne({ email });
    notes.push({ title, text });
    await userModel.findOne({ email }).update({ $set: { notes } });
    return res.send({ title, text });
  } catch (err) {
    return res.status(400).send({ error: 'Error on adding Note' });
  }
});

// update route
router.put('/', async (req, res) => {
  const { email } = req;
  const { _id, title, text } = req.body;

  if (!title) {
    return res.status(400).send({ error: 'Insert the Title' });
  }

  try {
    const { notes } = await userModel.findOne({ email });

    // create a new array with the updated note
    const newNotes = notes.map((note) => {
      const { _id: noteId } = note;
      if (noteId == _id) {
        return {
          _id: note._id,
          title,
          text,
        };
      }
      return note;
    });

    await userModel.findOne({ email }).update({ $set: { notes: newNotes } });
    return res.send({ _id, title, text });
  } catch (err) {
    return res.status(400).send({ error: 'Error on updating Note' });
  }
});

// delete route
router.delete('/:_id', async (req, res) => {
  const { email } = req;
  const { _id } = req.params;
  try {
    const { notes } = await userModel.findOne({ email });

    // create a new array without the selected note
    const newNotes = notes.filter((note) => {
      const { _id: noteId } = note;
      return noteId != _id;
    });

    await userModel.findOne({ email }).update({ $set: { notes: newNotes } });
    return res.send({ msg: 'Success on deleting note' });
  } catch (err) {
    return res.status(400).send({ error: 'Error on deleting Note' });
  }
});

module.exports = router;
