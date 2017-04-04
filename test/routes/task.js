import jwt from 'jwt-simple';

describe('Route::Tasks', () => {
  const User = app.db.models.User;
  const Task = app.db.models.Task;
  const jwtSecret = app.config.jwtSecret;

  let token;
  let fakeTask;

  beforeEach((done) => {
    User.destroy({ where: {} })
      .then(() => User.create({
        name: "John Doe",
        email: "johndoe@email.com",
        password: "pass1234"
      }))
      .then((user) => {
        Task.destroy({ where: {} })
          .then(() => {
            Task.bulkCreate([
              {
                id: 1,
                title: "work",
                status: 0,
                user_id: user.id
              },
              {
                id: 2,
                title: "eat",
                status: 0,
                user_id: user.id
              }
            ])
            .then((tasks) => {
              fakeTask = tasks[0];
              token = jwt.encode({ id: user.id }, jwtSecret);
              done();
            });
          });
      });
  });

  describe("GET /tasks", () => {
    describe('status 200', () => {
      it('returns a list of tasks', (done) => {
        request.get('/tasks')
          .set("Authorization", `JWT ${ token }`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data).to.have.length(2);
            expect(res.body.data[0].title).to.eql('work');
            expect(res.body.data[1].title).to.eql('eat');
            done(err);
          });
      });
    });
  });

  describe('POST /tasks/', () => {
    describe('status 200', () => {
      it('creates a new task', (done) => {
        request.post('/tasks')
          .set('Authorization', `JWT ${ token }`)
          .send({ title: "Jog", status: 0 })
          .expect(200)
          .end((err, res) => {
            expect(res.body.data.title).to.eql('Jog');
            expect(res.body.data.status).to.eql(0);
            done(err);
          });
      });
    });
  });

  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns a task with id equal to params id', (done) => {
        request.get(`/tasks/${ fakeTask.id }`)
          .set('Authorization', `JWT ${ token }`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('work');
            expect(res.body.status).to.eql(0);
            done(err);
          });
      });
    });

    describe('status 404', () => {
      it('returns a not-found response when an invalid id is passed', (done) => {
        request.get(`/tasks/${ fakeTask.id + 12 }`)
          .set('Authorization', `JWT ${ token }`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });

  describe('PUT /tasks/:id', () => {
    describe('status 204', () => {
      it('updates the task with the id', (done) => {
        request.put(`/tasks/${ fakeTask.id }`)
          .set('Authorization', `JWT ${ token }`)
          .send({ title: 'Buy camry 2010' })
          .expect(204)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    describe('status 204', () => {
      it('deletes the task with the id', (done) => {
        request.delete(`/tasks/${ fakeTask.id }`)
        .set('Authorization', `JWT ${ token }`)
        .expect(204)
        .end((err, res) => {
          done(err);
        });
      });
    });
  });
});
