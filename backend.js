const PORT = process.env.PORT | 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/dvizhenimator', (req, res) => {
  const input = req.query.input
  const offset = req.query.offset
  const oprions = {
    url: 'https://api.giphy.com/v1/gifs/search',
    params: {q: input, lang: 'ru', offset: offset, api_key: process.env.REACT_APP_APIKEYDVIZHENIMATOR},
  }
  return axios.request(oprions)
    .then(response => res.json(response.data)).catch(err => res.json(err.response))
})

app.get('/meteometer', (req, res) => {
  const city = req.query.city
  const units = req.query.units
  const oprions = {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
    params: {q: city, lang: 'ru', units: units, appid : process.env.REACT_APP_APIKEYWEATHER},
  }
  return axios.request(oprions)
    .then(response => res.json(response.data)).catch(err => res.json(err))
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_MAIL,
    pass: process.env.REACT_APP_PASS,
  }
})

app.get('/space', (req, res) => {
  const oprions = {
    url: 'https://api.nasa.gov/planetary/apod?',
    params: { api_key: process.env.REACT_APP_APIKEYSPACE, count: 10},
  }
  return axios.request(oprions).then(response => res.json(response.data)).catch(err => res.json(err.response.status))
})

app.get('/mail', (req, res) => {
  const text = req.query.text
  const subject = req.query.subject
  const name = req.query.name
  const mail = req.query.mailAddress
  const mailOptions = {
    from: `${process.env.REACT_APP_MAIL}`,
    to: process.env.REACT_APP_MAIL,
    subject: subject,
    html: `<h1>Письмо для Академика Лебедева А.Р.</h1>
    <div style="font-size: 24px; text-decoration: 'none'">
        <p>Имя: ${name}</p>
        <p>Почта: ${mail}</p>
        <p>${text}</p>
    </div>`,
  }
  return transporter.sendMail(mailOptions).then(info => res.json(info.data))
})

app.listen(PORT, () => console.log(`Server is Running ${PORT}`))