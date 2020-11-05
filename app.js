const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const _ = require('lodash')

// create an instance of express server
const app = express()

// enable files upload
app.use(fileUpload({
    createParentPath: true
}))

// add other middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())

//Single File Upload
app.post('/upload', async (req, res) =>{

    if(!req.files){
        res.send({
            status: false,
            message: 'no file uploeaded'
        })
    } 

    let data = []

    if(!Array.isArray(req.files.file)){
        let file = req.files.file

        file.mv('./uploads/' + file.name)

        res.send({
            status: true,
            message: 'File are Upload',
            name: file.name,
            mimetype: file.mimetype,
            size: file.size
        })
    }else {
        try {
            _.forEach(_.keysIn(req.files.file), (key) =>{
                let file = req.files.file[key]
    
                file.mv('./uploads/' + file.name)
    
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size 
                })
            })
    
    
        }catch (err) { res.status(500).send(err) }
    
        res.send({
            status: true,
            message: 'Files are Uploaded',
            data: data
        })
    }
})

    

//start app
const port = process.env.PORT || 3000

app.listen(port, () =>
    console.log(`app is listening on port ${port}`)
)