const router = require("express").Router();
const { subscribe, unsubscribe, getSubscribers } = require("../controllers/subscribers");

router.route("/subscribe").post(subscribe);
router.route("/unsubscribe/:email").get(unsubscribe);
router.route("/").get(getSubscribers);

module.exports = router;
