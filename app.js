const express=require('express');
const app=express();
const path=require('path');
const nodemailer=require('nodemailer');

if (process.env.NODE_ENV!=="production") {
    require('dotenv').config();
}


app.use(express.static(path.join(__dirname, 'public')));  //setting up public directory
app.use(express.json()) //for json parsed data
app.set('view engine', 'ejs');  //setting up ejs
app.set('views', path.join(__dirname, 'views'));  //setting up views directory




app.get('/', (req, res) => {
    res.render('main')
})

app.post('/', (req, res) => {
    // console.log(req.body)

    const transporter=nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'preetpalsingh1239@gmail.com',
            pass: process.env.APP_PASSWORD
        }
    })

    const mailOptions={
        from: req.body.email,
        to: 'preetpalsingh1239@gmail.com',
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            // console.log('Email sent: '+info.response);
            res.send('success')
        }
    })
})



const port=3000;
app.listen(port, () => {
    console.log(`serving on port number ${port}`)
})