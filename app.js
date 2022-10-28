const express=require('express');
const app=express();
const path=require('path');
const nodemailer=require('nodemailer');

//security
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');

if (process.env.NODE_ENV!=="production") {
    require('dotenv').config();
}


app.use(express.static(path.join(__dirname, 'public')));  //setting up public directory
app.use(express.json()) //for json parsed data
app.set('view engine', 'ejs');  //setting up ejs
app.set('views', path.join(__dirname, 'views'));  //setting up views directory


app.use(mongoSanitize({
    replaceWith: '_'
}))

app.use(helmet());

const scriptSrcUrls=[
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com",
    "https://code.jquery.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://ajax.googleapis.com",
    "https://unpkg.com/ ",
    "https://use.fontawesome.com/",
    "https://rawgit.com"

];
const styleSrcUrls=[
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://unpkg.com/",
    "https://cdnjs.cloudflare.com"

];
const connectSrcUrls=["https://ka-f.fontawesome.com", "https://unpkg.com/",];
const fontSrcUrls=["https://ka-f.fontawesome.com", "https://unpkg.com/", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            // fontSrc: ["'self'", "'unsafe-inline'", ...fontSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dwh4llt0c/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

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