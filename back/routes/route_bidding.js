const router = require('express').Router();
const auth = require('../middleware/verifyToken');

/* Bidding */
const bidding = require('../controllers/BiddingController');
const bidding_validation = require('../validation/BiddingValidation');

router.post("/ongoing", auth.isAuth, bidding_validation.validate('retrieve'), bidding.get_list_bidding);
router.get("/bidhistory", auth.isAuth, bidding.get_list_bidhistory);
router.get("/user_bid", auth.isAuth, bidding.get_user_bid);
router.post("/products", auth.isAuth, bidding_validation.validate('retrieve'), bidding.get_list_products);
router.get("/product", auth.isAuth, bidding.get_product); 
router.post("/products/delete", auth.isAuth, bidding.delete_product);
router.post("/products/update", auth.isAuth, bidding_validation.validate('update'), bidding.update_product);
router.post("/products/create", auth.isAuth, bidding_validation.validate('create'), bidding.create_product);
router.post("/bidhistory/create", auth.isAuth, bidding_validation.validate('create_bidhistory'), bidding.create_bidhistory);

module.exports = router;
