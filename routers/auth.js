const {Router} =  require('express')
const router = Router();
const auth_Controller = require('../controllers/auth')

router.get("/signup" , auth_Controller.signup_get)
router.post("/signup" , auth_Controller.signup_post)
router.get("/login" , auth_Controller.login_get)
router.post("/login" , auth_Controller.login_post)
router.get("/logout", auth_Controller.logout)
module.exports = router;