import jwt from 'jwt-simple';

describe('Routes::Users', () => {
  const User = app.db.models.User;
  const jwtSecret = app.config.jwtSecret;
  let token;

  beforeEach((done) => {
    User.destroy({ where: {} })
      .then(() => {
        User.create({
          name: "John Doe",
          email: "johndoe@email.com",
          password: "pass1234"
        })
        .then((user) => {
          token = jwt.encode({ id: user.id }, jwtSecret);
          done();
        });
      });
  });


  describe('GET /users', () => {
    describe('status 200', () => {
      it('returns a list of users', (done) => {
        request.get('/users')
          .set('Authorization', `JWT ${ token }`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data).to.have.length(1);
            expect(res.body.data[0].name).to.eql('John Doe');
            done(err);
          });
      })
    })
  });

  describe('GET /user', () => {
    describe('status 200', () => {
      it('returns a user whose id matches whats passed.', (done) => {
        request.get(`/user`)
          .set('Authorization', `JWT ${ token }`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data.email).to.eql('johndoe@email.com');
            done(err);
          });
      });
    });
  });

  describe('DELETE /user', () => {
    describe('status 204', () => {
      it('delete user whose id matches whats passed.', (done) => {
        request.get(`/user`)
          .set('Authorization', `JWT ${ token }`)
          .expect(200)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });


  describe('POST /users', () => {
    describe('status 200', () => {
      it('create a new user.', (done) => {
        request.post(`/users`)
          .set('Authorization', `JWT ${ token }`)
          .send({
            name: 'Mary Janet',
            email: "maryj@email.com",
            password: "p12345"
          })
          .expect(200)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
})
