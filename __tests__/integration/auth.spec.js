const request = require('supertest');

const app = require('../../src/config/server');

const userModel = require('../../src/models/user');

describe('Testing Auth routes', () => {
  const user = {
    _id: '1',
    __v: 0,
    email: 'testing@test.com',
    password: '111',
    notes: [],
  };

  after(async () => {
    await userModel.remove({ email: user.email });
  });

  it('POST /auth/register should add a user and return the user and token', (done) => {
    request(app)
      .post('/auth/register')
      .send(user)
      .expect((res) => {
        if (res.body.error) throw Error(res.body.error);
        else {
          res.body.user._id = '1';
          res.body.user.password = '111';
          res.body.token = 'token';
        }
      })
      .expect(200, {
        user,
        token: 'token',
      })
      .end(done);
  });

  it('POST /auth/authenticate should return the token', (done) => {
    request(app)
      .post('/auth/authenticate')
      .send(user)
      .expect((res) => {
        if (!res.body.user || !res.body.token) {
          if (res.body.error) {
            throw Error(res.body.error);
          } else {
            throw Error('error on auth');
          }
        }
      })
      .expect(200)
      .end(done);
  });
});
