
const router = require('express').Router();

// Import controller functions
const {
getUsers,
getUserById,
createUser,
updateUser,
removeUser,
addFriend,
unfriend
} = require('../../controllers/user-controller');

// /api/users
router
.route('/')
.get(getUsers)
.post(createUser)

// /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
.route('/:id/friends/:friendId')
.put(addFriend)
.delete(unfriend)

module.exports = router;


