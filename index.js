// index.js

// CONFIG: Express
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})
const exphbs = require('express-handlebars')

// CONFIG: PostgreSQL
const pg = require('pg')
const conString = 'postgres://node_hero:4rfv_Oreh@localhost/node_hero'
// const conString = 'postgres://harold:9ol._Yfit@localhost/node_hero'

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

const users = []


app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
})

app.post('/users', urlencodedParser, function (req, res, next) {
  const user = req.body

  console.log("Body: " + req.body.name)

  pg.connect(conString, function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done()

      if (err) {
        return next(err)
      }

      res.sendStatus(200)
    })
  })
})

app.get('/users', function(req, res, next) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) {
      done()

      if (err) {
        return next(err)
      }
      res.json(result.rows)
    })
  })
})

app.get('/populate', function (req, res, next) {
  const user = req.body

  pg.connect(conString, function (err, client, done) {
    if (err) {
      return next(err)
    }
    for (var i = 0; i < 10; i++) {
      client.query('INSERT INTO users (name, age) VALUES ($1, $2);', ["Jimmy " + i, i], function (err, result) {

        done()

        if (err) {
          return next(err)
        }
      })
    }
    res.sendStatus(200)
  })
})




app.listen(3000)
