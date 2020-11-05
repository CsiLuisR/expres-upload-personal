const { isArray } = require("lodash")

const req = {
    file : [1,2,3,4,5]
}

const identificar = (v = []) => {
    req.file.length > 1 ? console.log('es un arreglo') : console.log('es un objeto unico')
}

identificar(req.file)

app.post('/upload-multi', async (req, res) =>{
    console.log(req)
    try{
        if(!req.files){
            res.send({
                status: false,
                message: 'No File Uploaded'
            })
        }else{
            let data = []

            //loop all files 
            _.forEach(_.keysIn(req.files.file), (key) => {
                let file = req.files.file[key]

                //move files to uploads directory
                file.mv('./uploads/' + file.name)

                //push file details
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                })
            })
            
            //return response 
            res.send({
                status: true,
                message: 'Files are Uploaded',
                data: data
            })
        }
    } catch(err) {
        res.status(500).send(err)
    }
})
