/**
* @api {get} /tasks Fetch Tasks
* @apiGroup Tasks
* @apiHeader {String} Authorization Token of authenticated user
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
*     data : [
*       {
*         "id": 1,
*         "title": "get some fuel",
*         "status": 0,
*         "created_at": "2017-03-27T07:16:01.000Z",
*         "updated_at": "2017-03-27T07:16:01.000Z",
*         "user_id": 1
*       }
*     ]
*   }
*
**/

/**
* @api {get} /tasks/:id Fetch Specific Task
* @apiGroup Tasks
* @apiHeader {String} Authorization Token of authenticated user
* @apiHeaderExample {json} Header Example
* {
*   "Authorization": "JWT $3sf345fsbddtd"
* }
*
* @apiSuccess {Boolean} status success status of response
* @apiSuccess {Number} id Task id
* @apiSuccess {String} title Task title
* @apiSuccess {String} created_at Task creation date
* @apiSuccess {String} updated_at Task last updated date
* @apiSuccess {Number} user_id Id of user to which task belongs
* @apiSuccessExample {json} Success Response
*   HTTP/1.1 200 OK
*   "status" :true,
*   "data": {
*     "id": 1,
*     "title": "get some fuel",
*     "status": 0,
*     "created_at": "2017-03-27T07:16:01.000Z",
*     "updated_at": "2017-03-27T07:16:01.000Z",
*     "user_id": 1
*   }
*
**/


/**
*
* @api {post} /tasks Create Task
* @apiGroup Tasks
* @apiHeader {String} Authorization Token of authenticated user
* @apiHeaderExample {json} Header Example
*   {
*     "Authorization" : "JWT art#453#%^$%#dgdgd"
*   }
*
* @apiSuccess {Boolean} status A bool value to indicate success status of request
* @apiSuccess {Object} data An object holding the task information
* @apiSuccess {String} id Task Id
* @apiSuccess {String} title Task title
* @apiSuccess {String} status Task status
* @apiSuccess {String} user_id Task Id
* @apiSuccess {Number} id Id of user to which task belongs
* @apiSuccess {String} created_at Task creation date
* @apiSuccess {String} updated_at Task last updated date

* @apiSuccessExample {json} Success Example
*   HTTP/1.1 200 OK
*   {
*     "status": true,
*     "data": {
*       "id": 2,
*       "title": "complete Node API book",
*       "status": 0,
*       "user_id": 1,
*       "updated_at": "2017-04-05T02:31:49.000Z",
*       "created_at": "2017-04-05T02:31:49.000Z"
*     }
*   }
**/


module.exports = app => {
  const Task = app.db.models.Task;
  app.route('/tasks')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Task.findAll({ where: { user_id: req.user.id } })
        .then((data) => {
          res.json({ success: true, data });
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
        .then(data => {
          if(data) {
            res.json({ success: true, data })
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
