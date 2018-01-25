const defaultUserModel = require('../models/user');

// return a object with the controller function
const userController = (userModel = defaultUserModel) => ({
  register: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'insert email and password' });
    }

    const newUser = {
      email,
      password,
      notes: [],
    };

    try {
      const user = await userModel.create(newUser);
      return res.send(user);
    } catch (err) {
      if (err.message === 'invalid email') {
        return res.status(400).send({ error: 'insert a valid email' });
      }

      return res.status(400).send({ error: 'error on register' });
    }
  },
});


module.exports = userController;
