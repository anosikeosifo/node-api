module.exports = app => {
  const User = app.db.models.User;

  app.route('/users')
    .get((req, res) => {
      User.findAll({ where: req.params })
        .then(data => {
          if(data) {
            res.json({ status: true, data })
          } else {
            res.sendStatus(404)
          }
        })
        .catch(error => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        });
    })
    .post((req, res) => {
        User.create(req.body)
          .then((data) => {
            res.status(200)
              .json({ success: true, data });
          })
          .catch(error => {
            res.status(412)
              .json({ status: false, message: `An error occurred: ${ error }` })
          });
      });

  app.route('/user')
    .all(app.auth.authenticate())
    .get((req, res) => {
      User.findById(req.user.id, {
        attributes: ["id", "name", "email"]
      })
      .then((data) => {
        res.status(200)
          .json({ status: true, data });
      })
      .catch(error => {
        res.status(412)
          .json({ status: false, message: `An error occurred: ${ error }` })
      });
    })
    .put((req, res) => {
      User.update(req.body, { where: req.params })
        .then((result) => {
          res.sendStatus(204);
        })
        .catch(error => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        });
    })
    .delete((req, res) => {
      User.destroy({where: { id: req.user.id }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412)
            .json({ status: false, message: `An error occurred: ${ error }` })
        })
    });
}
