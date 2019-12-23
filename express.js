const express = require('express')
const path = require('path')
const fs = require("fs")
const bodyParser = require('body-parser');
const app = express()
const textParser = bodyParser.text();
const port = 8080
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
var filePath = path.join(__dirname, '/database')


app.get('/:filename', (req, res) => {
    var filename = req.params.filename + '.txt' // default file extension is .txt 
    var currentFilePath = path.join(filePath, filename)

    if (! fs.existsSync(currentFilePath)){ // if the file does not in database
        res.sendStatus(404)
        return
    } else {
        res.send(fs.readFileSync(currentFilePath, 'utf8'))
        console.log('readFile Success')
    }
})

app.post('/:filename', textParser, (req, res) => {
    var filename = req.params.filename + '.txt'
    var currentFilePath = path.join(filePath, filename)
    var content = req.body

    if (fs.existsSync(currentFilePath)){
        res.status(500).send('Bad Request, File existed')
        return
    } else {
        fs.appendFile(currentFilePath, content, (err) => {
            if (err) throw err;
            console.log(filename + ' created')
        })
    }
    res.send('file created')
})

app.put('/:filename', textParser, (req, res) => {
    var filename = req.params.filename + '.txt'
    var currentFilePath = path.join(filePath, filename)
    var content = req.body // at the end the file

    if (! fs.existsSync(currentFilePath)){
        res.status(404).send('File does not existed')
        return
    } else {
        fs.appendFile(currentFilePath, content, (err) => {
            if (err) throw err;
            console.log(filename + ' updated')
        })
    }

    res.send('file updated');
})

app.delete('/:filename', (req, res) => {
    var filename = req.params.filename + '.txt' // default file extension is .txt 
    var currentFilePath = path.join(filePath, filename)

    if (! fs.existsSync(currentFilePath)){ // if the file does not in database
        res.status(404).send('File not Found, Can not be deleted')
        return
    } else {
        fs.unlink(currentFilePath, err => {
            if (err) throw err
        } )
        res.send('file deleted')
    }
})

app.listen(port, () => console.log(`APP started at port ${port}!`))