const userController = require('./userController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "Papá, y tú, ¿qué querías ser de mayor cuando eras pequeño? Y todo cambió...";



class LoginController {

    async validate(mailCheck,passwordCheck){
        console.log("mailCheck: ", mailCheck);
        console.log("Password: ", passwordCheck);
        let user = await userController.mailUser(mailCheck);  //Buscamos el email para comprobar si está registrado.
        if (user == null){
            throw new Error('Wrong user or password1');  //Si no existe devolvemos el mensaje
        }
        let password = user.password;

        let verify = await bcrypt.compare(passwordCheck, password);

        if(!verify){
            throw new Error('Wrong user or password2');
        }

        if (!user.isActive) {
            throw new Error("La cuenta no está activa. Por favor, revisa tu correo electrónico y activa tu cuenta.");
          }

        let payload = {
            idUser : user.id,
            createdAt: new Date,
            admin: user.admin,
        };


        return jwt.sign(payload, secret);
    }

}

const loginController = new LoginController();
module.exports = loginController;