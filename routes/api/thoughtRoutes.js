const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thought/:thoughtsId
router.route('/:thoughtId').put(updateThought);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;