const router = require('express').Router();

/* Auth */
const auth = require('../controllers/AuthController');
const auth_validation = require('../validation/AuthValidation');

router.post("/sign-in", auth_validation.validate('login'), auth.do_login);
router.post("/sign-up", auth_validation.validate('register'), auth.do_register);
router.post("/update-balance", auth_validation.validate('update'), auth.do_update_balance);
router.post("/sign-out", auth.do_logout);

module.exports = router;
