const authMiddle = require('../middleware/authMiddleware');
const { addFriend, getFriends, inviteFriend, dismissNotification, removeFriend} = require('../controllers/friendController');

// Friends routes
router.post('/friends/add', authMiddle, addFriend);
router.get('/friends', authMiddle, getFriends);
router.delete('/friends/:friendUserId', authMiddle, removeFriend);
router.post('/friends/invite', authMiddle, inviteFriend);
router.post('/notifications/dismiss', authMiddle, dismissNotification);

module.exports = router; 