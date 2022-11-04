const router = require('express').Router();

// importing functions from comment controller
const {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    createDiscussion,
    removeDiscussion
} = require('../..controllers/comment-controller');

// /api/comments
router.route('/')
.get(getAllComments);

// /api/comments/:id
router.route('/:id')
.get(getCommentById)
.put(updateComment)
.delete(deleteComment);

// /api/comments/:userId
router.route('/:userID')
.post(createComment);

// /api/comments/:commentId/discussions
router.route('/:commentId/discussions')
.post(createDiscussion);

// /api/comments/:commentId/discussionId
router.route('/:commentId/discussions/:discussionId')
.delete(removeDiscussion);

module.exports = router;