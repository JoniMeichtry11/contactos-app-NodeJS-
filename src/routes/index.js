const {Router} = require('express');
const router = Router();
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://revisitas-cc029-default-rtdb.firebaseio.com/'
});

const db = admin.database();

router.get('/', (req, res) => {
    db.ref('revisitas').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index.hbs', { revisitas: data });
    });
});

router.post('/new-rev', (req, res) => {
    console.log(req.body);
    const newRev = {
        nombre: req.body.firstname,
        numero: req.body.phone,
        comentario: req.body.comentario
    };
    db.ref('revisitas').push(newRev);
    console.log(newRev);
     res.redirect('/');
});

router.get('/delete-revisita/:id', (req, res) => {
    db.ref('/revisitas/' + req.params.id).remove();
     res.redirect('/');
});

module.exports = router;