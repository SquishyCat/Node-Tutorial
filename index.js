// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((request, response, next) => {
  request.chance = 0
  next()
})

app.use((request, response, next) => {
  request.chance = 1
  next()
})


app.get('/', (request, response) => {
  response.render('home', {
    name: 'John',
    chance: request.chance
  })
})

app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(3000)
