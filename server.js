const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port  = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use( (req, res, next) => res.render('maintenance.hbs') );

app.use(express.static(__dirname+'/public'));

app.use(
    (req, res, next) => {
        let now = new Date().toString();
        let log = `${now}: ${req.method} ${req.url}`;
        fs.appendFile('server.log', log+'\n', 
            err => console.log('Can\'t Save file, because following error occurred: \n', err)
        );
        next();
    }
)



hbs.registerHelper(
    'getCurrentYear',
    () => new Date().getFullYear()
)

hbs.registerHelper(
    'screamIt',
    text => text.toUpperCase()
)


app.get(
    '/',
    (req, res) => {
        //res.send('<h1>Hello Express!</h1>');
        res.render(
            'index.hbs',
            {
                pageTitle: 'Home Page',
                welcomeMessage: 'Hey Welcome to my brand new site!',
                currentYear: new Date().getFullYear()
            }
        )
    }
)


app.get(
    '/about',
    (req, res) => {
        res.render(
            'about.hbs',
            {
                pageTitle: 'About Page',
                currentYear: new Date().getFullYear()
            }
        );
    }
)

app.get(
    '/bad',
    (req, res) => {
        res.send(
            {
                errorMessage: 'Unable to handle request!'
            }
        );
    }
)

app.listen(
    port,
    () =>{
        console.log(`Server up is up in port ${port}`);
    }
);