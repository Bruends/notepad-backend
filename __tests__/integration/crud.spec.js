const request = require('supertest');

const app = require('../../src/config/server');
const userModel = require('../../src/models/user');

describe.only('Test crud routes', () => {
  const user = { email: 'testingCRUD@test.com', password: '111' };
  let key;
  const testNote = { title: 'test', text: 'test' };

  // add user and get token
  before((done) => {
    try {
      request(app)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          key = res.body.token;
          done();
        });
    } catch (err) {
      throw err;
    }
  });

  // clear notes
  beforeEach(async () => {
    try {
      await userModel.findOne({ email: user.email })
        .update({ $set: { notes: [testNote] } });
    } catch (err) {
      throw err;
    }
  });

  // remove user
  after(async () => {
    try {
      await userModel.remove({ email: user.email });
    } catch (err) {
      throw err;
    }
  });

  it('GET /notes should return an array of notes', (done) => {
    try {
      // testing
      request(app)
        .get('/notes')
        .set('Authorization', `Bearer ${key}`)
        .expect(200, [
          testNote,
        ]);

      done();
    } catch (err) {
      throw err;
    }
  });

  it('POST /notes should add a new note', (done) => {
    try {
      request(app)
        .post('/notes')
        .set('Authorization', `Bearer ${key}`)
        .send({ title: 'test', text: 'test' })
        .expect(200, testNote);

      done();
    } catch (err) {
      throw err;
    }
  });

  it('PUT /notes should update a note', (done) => {
    // getting note
    const getPromise = request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${key}`);

    // resolving promise to pick note id
    getPromise
      .then((res) => {
        const { _id } = res.body.notes[0];
        const newNote = { _id, title: 'updated', text: 'updated' };
        // testing update
        request(app)
          .put('/notes')
          .set('Authorization', `Bearer ${key}`)
          .send(newNote)
          .expect(200, newNote)
          .end(done);
      })
      .catch((err) => {
        throw Error(err);
      });
  });

  it('DELETE /notes should delete a note', (done) => {
    // getting note
    const getPromise = request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${key}`);

    // resolving promise to pick note id
    getPromise
      .then((res) => {
        const { _id } = res.body.notes[0];
        // testing delete
        request(app)
          .delete(`/notes/${_id}`)
          .set('Authorization', `Bearer ${key}`)
          .expect(200, { msg: 'Success on deleting note' })
          .end(done);
      })
      .catch((err) => {
        throw Error(err);
      });
  });
});
