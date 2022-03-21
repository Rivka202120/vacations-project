const { sql } = require('../dbconfig')
const { onlyAdmin } = require('../middleWhere/onlyAdmin')
const { promises: Fs } = require('fs')
const fileUpload = require('express-fileupload')
const router = require('express').Router()
const path = require('path')
const { onlyLoggedUsers } = require('../middleWhere/onlyLoggedUsers')

router.use(fileUpload())

router.get('/',onlyLoggedUsers, async (req, res) => {

    try {

        const vacations = await sql(`select * from vacations`)
        res.send(vacations)

    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }
})

router.get('/image/:imageName', async (req, res) => {
    try {
        const imageName = req.params.imageName;
        const myPath = process.cwd().split(path.sep).join('/') + '/uploads/'
        console.log(myPath + imageName)
        res.sendFile(myPath + imageName)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try {

        const image = req.files.myPicture

        const myPath = process.cwd().split(path.sep).join('/') + '/uploads/'

        image.mv(myPath + image.name, err => {
            if (err) console.log(err)
        })

        const { description, target, from_date, until_date, price } = req.body

        if (!description || !target || !from_date || !until_date || !price) {
            return res.send({ err: "Details are missing!!!!!" })
        }

        await sql(`insert into vacations(description, target, from_date, until_date, image, price) values('${description}',
        '${target}', '${from_date}', '${until_date}', '${image.name}', ${price} ) `)

        res.send({ msg: 'new vacation created' })

    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }
})

router.put('/:id_vacation', async (req, res) => {

    try {
        console.log(req.body);
        console.log(req.params.id_vacation);
        const { id_vacation } = req.params

        let image;

        if (req.files) {

            image = req.files.myPicture

            const myPath = process.cwd().split(path.sep).join('/') + '/uploads/'

            image.mv(myPath + image.name, err => {
                if (err) console.log(err)
            })
        }
        if (!req.files) {
            image = req.body.myPicture;
        }

        const { description, target, from_date, until_date, price } = req.body


        if (!description || !target || !from_date || !until_date || !price) {
            return res.send({ err: "Details are missing!!!!!" })
        }


        await sql(`update vacations set target = '${target}' , description = '${description}',
        from_date =  '${from_date}', until_date = '${until_date}', image = '${typeof (image) === 'string' ? image : image.name}' ,
        price = ${price}  where id = ${id_vacation} `)

        res.send({ msg: 'edit vacation' })

    } catch (err) {

        console.log(err);
        res.sendStatus(500)

    }

})

router.delete('/:id_vacation', onlyAdmin, async (req, res) => {

    console.log("req.session.is_admin", req.session.is_admin);

    try {
        const { id_vacation } = req.params

        await sql(`delete from follow where id_vacation = ${id_vacation}`)

        await sql(`delete from vacations where id = ${id_vacation}`)

        res.send({ msg: "vacation deleted" })

    } catch (err) {

        console.log(err);
        res.sendStatus(500)
    }
})

module.exports = router