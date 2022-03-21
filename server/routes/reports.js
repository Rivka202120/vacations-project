const victory = require('victory')
const { sql } = require('../dbconfig')
const { onlyAdmin } = require('../middleWhere/onlyAdmin')
const router = require('express').Router()



router.get('/', async (req, res) => {

    try {

        const vacations = await sql(`select distinct vacations.id, vacations.amount
        from follow inner join vacations
        on follow.id_vacation = vacations.id`)
        res.send(vacations)

    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }
})







module.exports = router