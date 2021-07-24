const router = require('express').Router();
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');


router.post('/', async (req, res)=> {
    try {
        const mailCheck = req.body.email;
        const passwordCheck= req.body.password;
        let token = await loginController.validate(mailCheck,passwordCheck);
        let user = await userController.mailUser(mailCheck);
        res.status(200).json({token, user});
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    } 
})

module.exports = router;