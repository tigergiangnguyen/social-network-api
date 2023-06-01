// Import mongoose library
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Defining fields for schema
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return new Date(timestamp).toLocaleString();
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
  
module.exports = Thought;