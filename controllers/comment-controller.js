const { User, Comment } = require('../models');

const commentController = {
    getAllComments(req, res) {
        Comment.find({})
        .populate({
            path: 'reactions',
            select: '-_v'
        })
        .select('-_v')
        .sort({ _id: -1 })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getCommentById({ params }, res) {
        Comment.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-_v'
        })
        .select('-_v')
        .sort({ _id: -1 })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comments found with this id'});
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createComment({ body }, res) {
        Comment.create(body)
        .then(( dbCommentData => res.json(dbCommentData)))
        .catch(err => res.json(err));
    },

    updateComment({ params, body }, res) {
        Comment.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comments found with that id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => res.json(err));
    },

    deleteComment({ params}, res) {
        Comment.findOneAndDelete({ _id: params.id })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with that id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => res.json(err));
    },

    createDiscussion({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.getCommentById },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .populate({ path: 'reactions', select: '-_v' })
        .select('-_v')
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with that id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => res.status(400).json(err));
    },

    removeDiscussion({ params }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'Not able to remove' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;