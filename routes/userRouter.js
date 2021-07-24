const router = require("express").Router();
const userController = require("../controllers/userController.js");
const authenticate = require('../middleware/authenticate.js');
const admin = require('../middleware/admin.js');
const checkMail = require('../middleware/checkMail.js');


//CRUD user
//Get All users.
router.get('/', admin, async (req, res) => {
    try {
        res.json(await userController.alluser());
    }catch (err) {
        return res.status(500).json({
        message: err.message
        });
    }
});


//Find user by ID
router.post('/id', admin, async (req, res)=> {             
    try {
        let id = req.body.userId;
        res.json(await userController.userId(id));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Find user by email
router.post('/email', admin, async (req, res)=> {             
    try {
        let email = req.body.email;
        res.json(await userController.mailuser(email));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Find user by dni
router.post('/dni', admin, async (req, res)=> {             
    try {
        let dni = req.body.dni;
        res.json(await userController.dniuser(dni));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Find user by name
router.post('/name', authenticate, async (req, res)=> {          
    try {
        let name = req.body.name;
        res.json(await userController.nameuser(name));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Add a new user
router.post('/', checkMail, async (req, res)=> {
    try {
        const body = req.body;
        res.json(await userController.newUser(body));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Modify a user
router.post('/update', authenticate, async (req, res)=> {
    try {
        let attributes = req.body;
        res.json(await userController.modifyuser(attributes));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Delete a user
router.post('/modify', admin, async (req, res) =>{
    try {        
        res.json(await userController.modifyuser(req.body));        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    }
});


//Activa la cuenta del usuario a través del token enviado en el email.
router.get("/confirm/:confirmationCode", async (req, res) => {
    try {
      token = req.params.confirmationCode;
      res.json(await userController.updateActive(token));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

module.exports = router;