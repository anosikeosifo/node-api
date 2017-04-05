/**
* @api {get} /users Fetch Users
* @apiGroup Users
* @apiHeader {String} User's Authorization Token
* @apiHeaderExample {json} Header Example
* {
*   "Authorization": "JWT $3sf345fsbddtd"
* }
*
* @apiSuccess {Boolean} status success status of response
* @apiSuccess {Object[]} data List of tasks
* @apiSuccess {Number} id Task id
* @apiSuccess {String} title Task title
* @apiSuccess {String} created_at Task creation date
* @apiSuccess {String} updated_at Task last updated date
* @apiSuccess {Number} user_id Id of user to which task belongs
* @apiSuccessExample {json} Success Response
* HTTP/1.1 200 OK
*   {
*     status: true
*     data : [
*       {
*         "id": 1,
*         "name": "Anosike Osifo",
*         "email": "code.anosikeosifo@gmail.com",
*         "avatarUrl": "/test_avatar.jpg",
*         "password": "$2a$10$kUGz.yWkl.SYoS3IUG.3n.cWE/TsnEsgoo04SunqZHpVSIJDJL88O",
*         "created_at": "2017-03-27T07:14:07.000Z",
*         "updated_at": "2017-03-27T07:14:07.000Z"
*       }
*     ]
*   }
*
**/

/**
* @api {get} /user Return authenticated user's data
* @apiGroup Users
* @apiHeader {String} User's Authorization Token
* @apiHeaderExample {json} Header Example
* {
*   "Authorization": "JWT $3sf345fsbddtd"
* }
*
* @apiSuccess {Boolean} status success status of response
* @apiSuccess {Object[]} data List of tasks
* @apiSuccess {Number} id Task id
* @apiSuccess {String} title Task title
* @apiSuccess {String} created_at Task creation date
* @apiSuccess {String} updated_at Task last updated date
* @apiSuccess {Number} user_id Id of user to which task belongs
* @apiSuccessExample {json} Success Response
* HTTP/1.1 200 OK
*   {
*     status: true
*     data : {
*       "id": 1,
*       "name": "Anosike Osifo",
*       "email": "code.anosikeosifo@gmail.com",
*       "avatarUrl": "/test_avatar.jpg",
*       "password": "$2a$10$kUGz.yWkl.SYoS3IUG.3n.cWE/TsnEsgoo04SunqZHpVSIJDJL88O",
*       "created_at": "2017-03-27T07:14:07.000Z",
*       "updated_at": "2017-03-27T07:14:07.000Z"
*     }
*   }
*
**/


/**
*
* @api {post} /tasks Create User (Signup)
* @apiGroup Users
* @apiParam {String} Details for user to be created
* @apiParamExample {json} Param Example
*   {
*     "name": "Anosike Onose",
*     "email": "code.anosikeosifo@gmail.com",
*     "password": "password1234"
*   }
*
* @apiSuccess {Boolean} status A bool value to indicate success status of request
* @apiSuccess {Object} data An object holding the task information
* @apiSuccess {String} avatarUrl Url to user's avatar
* @apiSuccess {String} id User's Id
* @apiSuccess {String} name User's name
* @apiSuccess {String} email User's email
* @apiSuccess {String} password User's password
* @apiSuccess {String} created_at Task creation date
* @apiSuccess {String} updated_at Task last updated date

* @apiSuccessExample {json} Success Example
*   HTTP/1.1 200 OK
*   {
*     "status": true,
*     "data": {
*       "avatarUrl": "/test_avatar.jpg",
*       "id": 2,
*       "name": "Anosike Onose",
*       "email": "code.anosikeosifo@gmail.com",
*       "password": "$2a$10$zFs2Xi0cBHAXa.Paq3F0ceM/NtJU2zhtDDmFUBVmQToM0DMsLqTUK",
*       "updated_at": "2017-04-05T03:04:00.000Z",
*       "created_at": "2017-04-05T03:04:00.000Z"
*     }
*   }
**/

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
