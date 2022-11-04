// Import Dependency
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // match a valid email address
        match: [/.+\@.+\..+/]
    },
    // subdocument for comments
    comments: [
        {
            type: Schema.Types.ObjectId,
            // referring to the comment document model
            ref: 'Comment'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            // referring to the user document model
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

// virtual to count friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;