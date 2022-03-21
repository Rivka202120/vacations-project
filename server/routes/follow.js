const { sql } = require('../dbconfig')
const { onlyLoggedUsers } = require('../middleWhere/onlyLoggedUsers')
const router = require('express').Router()



// Mark the vacation in the follow-up -
// Or take it down from the follow-up
router.post('/mark/:id_vacation', onlyLoggedUsers, async (req, res) => {

    const id_user = req.session.id_user
    console.log(id_user);
    
    try {

        const {  id_vacation } = req.params

        const vacations = await sql(`select * from follow where id_user = ${id_user} && id_vacation = ${id_vacation}`)
        const vacation = vacations[0]
        if (!vacation) {
            await sql(`update vacations set amount = amount + 1  where id = ${id_vacation}`)
            await sql(`insert into follow(id_user, id_vacation) values(${id_user}, ${id_vacation})`)
            res.send({ msg: "follow added" })
        } else {
            await sql(`update vacations set amount = amount - 1  where id = ${id_vacation}`)
            await sql(`delete from follow where id_user = ${id_user} && id_vacation = ${id_vacation}`)
            res.send({ msg: "follow deleted" })
        }
    } catch (err) {

        console.log(err);
        res.sendStatus(500)
    }
})

// Increase the amount of followers on this vacation
router.put('/amount/:id_vacation', async (req, res) => {
    try {

        const { id_vacation } = req.params

        await sql(`update vacations set amount = amount + 1  where id = ${id_vacation}`)

        res.send({ msg: "You're following this vacation:)" })

    } catch (err) {

        console.log(err);
        res.sendStatus(500)
    }
})

// All vacations that the specific user monitors
router.get('/', async (req, res) => {
    try {

        const id_user = req.session.id_user

        const data = await sql(`SELECT DISTINCT V.*,
       EXISTS(SELECT * FROM follow WHERE id_vacation = F.id_vacation AND id_user = ${id_user}) AS isFollow,
       COUNT(F.id_user) AS followCount
       FROM vacations as V LEFT JOIN follow as F
       ON V.id = F.id_vacation
       GROUP BY id
       ORDER BY isFollow DESC;`)

        res.send(data)

    } catch (err) {

        console.log(err);
        res.sendStatus(500)
    }
})



module.exports = router