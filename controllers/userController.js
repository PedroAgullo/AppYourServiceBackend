const { User } = require('../models'); //No necesita indicarle el archivo, solo la carpeta, ya que lo desestructura desde index.js
const bcrypt = require('bcrypt');
const nodemailer = require('../config/nodemailerConfig.js');



class Client {

    async allUser(){

        return User.findAll();

    }


    // async nameUser(name){
    //     return User.findOne({
    //         where: {name}
    //     })
    // }

    async mailUser(email){
        console.log("email de user: ", email);
         let resultado = await User.findOne({
            where: {email}
        })
        return resultado;
    }

    async dniUser(dni){
        return User.findOne({
            where: {dni}
        })
    }

    async userId(id){

        return User.findByPk(id);
    }

    async newUser(user) {
    
        user.password = await bcrypt.hash(user.password, 10);
        
        //Creamos una token que enviamos por mail para activar
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }
        user = {
          name : user.name,
          lastName1: user.lastName1,
          lastName2: user.lastName2,
          email: user.email,
          password: user.password,
          birthday: user.birthday,
          address: user.address,
          country: user.country,
          city: user.city,
          dni: user.dni,
          telephone: user.phone,
          subscription: user.subscription,
          token: token
        }

        let usuario = await User.create(user);
    
        //Llamamos a la funcion para enviar el correo al usuario.
        
        await nodemailer.sendConfirmationEmail(user.name, user.email, token);
    
        return usuario;
      }
    
      //Encuentra el archivo al que pertenece el token dado por el email para activarle la cuenta.
      async findByToken(token) {
        return User.findAll({where:{ token: token }});
      }

      //Activa la cuenta del usuario buscando la token dada por el parámetro.
      async updateActive(token) {

        let user = await User.findOne({where:{token}});

        let usuario = await User.update(
            {
                isActive: true,
              },

              {where: {id: user.id}}

        );
    
        let resultado = "La cuenta se ha activado correctamente. Por favor, ve a la web de xSmileFitness para entrar en tu área de usuario.";
    
        return resultado;
      }


    async deleteUser(id){
        return User.destroy({
            where: {id}
        })
    }

    //Actualiza los datosd el usuario.
    async modifyUser(attributes){
        console.log(attributes);
       await  User.update(
            //Datos que cambiamos
            {phone: attributes.phone, address: attributes.address, city: attributes.city, postalcode: attributes.postalcode},
            //Donde..
            {where: {id: attributes.id}}
        )

        let resultado = this.customerId(attributes.id);

        return resultado;
    }



    }

let userController = new Client();
module.exports = userController;