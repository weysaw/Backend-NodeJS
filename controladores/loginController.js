const jwt = require('jsonwebtoken');
const User = require('../models').User;
const llave = require('../auth/llave');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).json({ msg: `Formato incorrecto: ${JSON.stringify(req.body)}` });
        return;
    }
    //Busca el usuario
    const user = await User.findOne({where: {username: username}});
    if (!user || user.password !== password) {
        res.status(401).json({type: "Error", msg: `Datos no encontrados` });
        return;
    }
    //Firma el token
    const token = jwt.sign({ id: user.id }, llave);
    res.json({type: 'Exito', msg: `Ingreso exitoso`, token: token })
}