const router = require('express').Router();
const userModel = require('../models/user');

// retorna todas as notas do usuário em um array de objetos
router.get('/', async (req, res) => {
  const { email } = req;
  const { notes } = await userModel.findOne({ email });
  return res.send({ notes });
});

// adiciona nova nota
router.post('/', async (req, res) => {
  const { email } = req;
  const { title, text } = req.body;

  // caso não tenha titulo
  // retorna com erro
  if (!title) {
    return res.status(400).send({ error: 'Insert the Title' });
  }

  try {
    const { notes } = await userModel.findOne({ email });
    notes.push({ title, text });
    await userModel.findOne({ email }).update({ $set: { notes } });
    return res.send(notes);
  } catch (err) {
    return res.status(400).send({ error: 'Error on adding Note' });
  }
});

// altera nota
router.put('/', async (req, res) => {
  const { email } = req;
  const { id, title, text } = req.body;

  if (!title) {
    return res.status(400).send({ error: 'Insert the Title' });
  }

  try {
    const { notes } = await userModel.findOne({ email });

    // cria novo array com as notas antigas e a nota qm questão alterada
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
    return res.status(400).send({ error: 'Error on updating Note' });
  }
});


router.delete('/:id', async (req, res) => {
  const { email } = req;
  const id = req.params.id;
  console.log(id);
  try {
    const { notes } = await userModel.findOne({ email });

    // cria novo array com todas as notas exceto a q vai ser excluida
    const newNotes = notes.filter(note => note._id != id);

    // salva novo array de notas
    await userModel.findOne({ email }).update({ $set: { notes: newNotes } });
    return res.send(newNotes);
  } catch (err) {
    return res.status(400).send({ error: 'Error on deleting Note' });
  }
});

module.exports = router;
