const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour restreindre l'accès aux heures de travail
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 (dimanche) - 6 (samedi)
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('<h1>Site inaccessible. Revenez pendant les heures de travail (Lundi - Vendredi, 9h-17h).</h1>');
    }
};

app.use(checkWorkingHours);

// Routes pour les pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
