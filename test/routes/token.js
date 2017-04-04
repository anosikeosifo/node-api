describe('Routes::Tokens', () => {
  const User = app.db.models.User;
  describe('POST /token', () => {
    beforeEach((done) => {
      //clear the db of users and recreate.
      User
        .destroy({ where: {} })
        .then(() => User.create({
          name: "John Doe",
          email: "johndoe@email.com",
          password: "test12345",
        }))
        .then(() => done());
    });

    describe('when valid credentials are provided', () => {
      it("should return a token for the authenticated user.", (done) => {
        request.post('/token')
          .send({
            email: "johndoe@email.com",
            password: "test12345"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token');
            done();
          });
      });
    });

    describe('when invalid credentials are provided', () => {
      describe('invalid password', () => {
        it('should return a 401 response, indicating password is incorrect', (done) => {
          request.post('/token')
            .send({
              email: "johndoe@email.com",
              password: "INCORRECT password"
            })
            .expect(401)
            .end((err, res) => {
              done(err);
            });
        });
      });

      describe('invalid email', () => {
        it("should return a 401 response, indicating email doesn't exist", (done) => {
          request.post('/token')
            .send({
              email: "invalid@email.com",
              password: "test12345"
            })
            .expect(401)
            .end((err, res) =>  done(err));
        });
      });

      describe('no email or password provided', (done) => {
        it("should return a 401 response, indicating invalida credentials", (done) => {
          request.post('/token')
            .expect(401)
            .end((err, res) => {
              done(err);
            });
        });
      });
    })
  });
});
