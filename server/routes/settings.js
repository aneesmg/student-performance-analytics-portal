const router = require('express').Router();
const auth = require('../middleware/auth');
const settingsController = require('../controllers/settingsController');

router.get('/', auth, settingsController.getSettings);
router.put('/', auth, settingsController.updateSettings);
router.put('/profile', auth, settingsController.updateProfile);
router.put('/change-password', auth, settingsController.changePassword);

module.exports = router;
