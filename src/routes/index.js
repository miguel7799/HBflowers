const express = require('express');
const router = express.Router();
const redis = require("redis");


const Flor = require('../models/flores');
const Usuario = require('../models/usuario')

//Renderea pantalla de administrador

// router.get('/', async(req,res)=>{
//     const flores = await Flor.find();
//     console.log(flores);
//     res.render('principal', {
//         flores
//     });
// });

//Renderea pantalla de registro de usuario
router.get('/', async(req,res)=>{
    const usuarios = await Usuario.find();
    console.log(usuarios);
    // res.render('singup', {
    //     usuarios
    // });
    res.render('singin', {
        usuarios
    });
});



//----------Flores------------
//agrega flores desde administrador
router.post('/add', async (req, res) =>{
    // console.log(new Flor(req.body));
    // console.log(req.body);
    const flor = new Flor(req.body);
    await flor.save();
    // res.send('recibido');

    res.redirect('/');
});
//elimina flores desde el administrador
router.get('/delete/:id', async(req, res)=>{
    const { id }=req.params;
    await Flor.remove({_id: id});
    // console.log(req.params.id)
    // res.send('recivido');
    res.redirect('/');
    
});
//se actualizan los datos de las flores
router.post('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    await Flor.update({_id: id}, req.body);
    res.redirect('/');
})
// se muestra el resultado de nuevo
router.get('/edit/:id', async(req, res)=>{
    const { id }=req.params;
    const flor = await Flor.findById(id);
    res.render('edit',{
        flor
    });
})



//---------------USUARIOS---------------
//Registro de nuevo usuario
router.post('/adduser', async (req, res) =>{
    // console.log(new Flor(req.body));
    // console.log(req.body);
    const usuario = new Usuario(req.body);
    await usuario.save();
    // res.send('recibido');

    res.redirect('/');
});


//------------LOGIN--------------
router.post('/login', async (req, res) =>{
    // console.log(req.body)
    const{correo} = req.body.correo
    const usuario = await Usuario.findOne(correo);
    console.log(usuario);
    // const {id} = req.body;
    // const usuario = await Usuario.findById(id);
    if (req.body.contrasena === usuario.contrasena){
        // console.log("si son")
        // const client = redis.createClient();
        // await client.hmset(usuario.correo,{usuario:usuario.usuario});
        // client.expire(usuario.correo, 20);
        startSession(usuario).catch(console.error)

    }
});



//--------------REDIS---------------

async function startSession(usuario){   

    // Connect to the Redis cluster.
    const client = redis.createClient();

    try {
        // Make the appropriate DB calls
        client.hmset(usuario.correo, {username:usuario.nombre+ " " + usuario.apellido, _id:JSON.stringify(usuario._id)});
        client.expire(usuario.correo, 200);
         
    } catch (e) {
        console.error(e);
    } finally {
        await client.quit();
    }
}



module.exports = router;
