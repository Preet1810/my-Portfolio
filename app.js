const express=require('express');
const app=express();
const path=require('path');


app.get('/', (req, res) => {
    res.render('main')
})

app.use(express.static(path.join(__dirname, 'public')));  //setting up public directory

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  //setting up views directory

const port=3000;
app.listen(port, () => {
    console.log(`serving on port number ${port}`)
})