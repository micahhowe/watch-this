const bcrypt = require('bcryptjs')

module.exports = {
    findUser: async(req,res) => {
        const db = req.app.get('db')
        const {userQuery} = req.params
        const user = await db.find_email([email])
        if (user == userQuery) {
            return res.status(400).send({ message: 'User Exists' })
          }
          else{
            return res.status(400).send({ message: 'User Does Not Exist' })  
          }
    },
  register: async (req, res) => {
    const db = req.app.get('db')
    const { email, password, username } = req.body
    req.session.user_id = req.body.username
    //? not sure if i did the line above correctly
    const user = await db.find_email([email])
    if (user.length > 0) {
      return res.status(400).send({ message: 'Email in use.' })
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = await db.insert_user_info({ username, email })
    db.insert_hash({ hash, user_id: newUser[0].user_id })
      .then(() => {
        //   This will come back from massive as an array unless specified, so i need the first one with [0]
        req.session.user = newUser[0]
        res
          .status(200)
          .send({
            message: 'Logged in',
            user: req.session.user,
            loggedIn: true
          })
      })
      .catch(err => {
        res.status(500).send({message: 'Failed to register'})
      })
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    req.session.user_id = req.body.username
    const user = await db.find_email_and_hash([email])
    if (user.length === 0) {
      return res.status(400).send({message: 'Email not found'})
    }
    const result = bcrypt.compareSync(password, user[0].hash)
    if (result) {
      delete user[0].hash
      req.session.user = user[0]
      return res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
    }
  },
  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send({message: 'Logged out', loggedIn: false})
  },
  loadFlix: async (req, res) => {
    const db = req.app.get('db')
    const loadFlix = await db.load_flix()
    return res.status(200).send(loadFlix)
  },
  //Might not need
//   findFlix: async (req, res) => {
//     const db = req.app.get('db')
//     const allFlix = await db.find_flix(`%${req.query.flix_title}%`)
//     return res.status(200).send(allFlix)
//     },
    // loadFlix: async (req, res) => {
    //     const db = req.app.get("db");
    //     const flix = await db.load_flix();
    //     res.status(200).send(flix);
    // },
    addFlix: async(req, res, next) => {
        const { flix_title, flix_image, flix_content } = req.body
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const flixToAdd = await db.create_flix([user_id, flix_title, flix_image, flix_content])
        res.status(200).send(flixToAdd)
    },
    sessionInfo: async (req, res) => {
        return res.status(200).send({message: 'session info internalized', user: req.session.user, loggedIn: true})
    },
}