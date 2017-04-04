module.exports = app => {
  const Task = app.db.models.Task;

  app.route('/tasks')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Task.findAll({ where: { user_id: req.user.id } })
        .then((data) => {
          res.json({ data });
        })
        .catch((error) => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        });
    })
    .post((req, res) => {
      req.body.user_id = req.user.id;

      Task.create(req.body)
        .then((data) => {
          res.status(200)
            .json({ success: true, data });
        })
        .catch(error => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        });
    });


  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Task.findOne({ where: {
          id: req.params.id,
          user_id: req.user.id
        }})
        .then(result => {
          if(result) {
            res.json(result)
          } else {
            res.sendStatus(404)
          }
        })
        .catch(error => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        });
    })
    .put((req, res) => {
      Task.update(req.body, { where: {
          id: req.params.id,
          user_id: req.user.id
        }})
        .then((result) => {
          res.sendStatus(204);
        })
        .catch(error => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        });
    })
    .delete((req, res) => {
      Task.destroy({ where: {
          id: req.params.id,
          user_id: req.user.id
        }})
        .then((result) => {
          res.sendStatus(204)
        })
        .catch(error => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        })
    });
}
