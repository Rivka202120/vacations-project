const { sql } = require('../dbconfig')
const { onlyLoggedUsers } = require('../middleWhere/onlyLoggedUsers')

const router = require('express').Router()


router.get('/', async (req, res) => {
    try {
        const users = await sql(`select * from users`)

        console.log(users);
        res.send(users)

    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }
})

router.post('/register',async (req, res) => {

    
    try {
        const { fname, lname, username, password }  = req.body;

        if (!fname || !lname || !username || !password) {
            return res.send({ err: "Details are missing" })
        }

        const users = await sql(`select * from users where username = '${username}' `)
       
        const user = users[0]

        if (user) {
            return res.send({ err: "username already taken" })
        }

        sql(`insert into users(fname_user, lname_user, username, password) values('${fname}',
           '${lname}', '${username}', '${password}') `)

           res.send({ msg: 'new user created' })

    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }
})


router.post('/login', async (req, res) => {

    
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.send({ err: "Details are missing" })
        }

        const users = await sql(`select * from users where username = '${username}' && password = '${password}'`)
        const user = users[0]
        if (!user) {
            return res.status(400).send({ err: "wrong username and/or password" })
        }

        console.log("user", user);

        req.session.username = username
        req.session.password = password
        req.session.id_user = user.id
        req.session.is_admin = user.is_admin
        req.session.fname_user = user.fname_user 

        const is_admin = user.is_admin
        const fname_user = user.fname_user

        console.log("session:", onlyLoggedUsers, req.session.username, req.session.password, req.session.fname_user, req.session.is_admin);
        
        res.send({ msg: "user looged in, welcome " + username, username ,fname_user, is_admin})
 
    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }

})

// not async
router.delete('/logout',onlyLoggedUsers, (req, res) => {

    try {
        console.log("session:", req.session.username, req.session.password, req.session.fname);
        req.session.destroy()
        res.send({ msg: "bye bye! it was nice to see you again" })

    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }
})

module.exports = router