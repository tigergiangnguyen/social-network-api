const { Thought } = require('../models');

// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
};

// Get thought by id
const getSingleThought = async (req, res) => {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtId});
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
};

// Create new thought
const createThought = async (req, res) => {
    const { thoughtText, username, userId } = req.body;
  
    try {
      const newThought = new Thought({
        thoughtText,
        username,
        userId
      });
      const createdThought = await newThought.save();
      res.status(201).json(createdThought);
    } catch (error) {
      res.status(500).json(error);
    }
};

// Update thought
const updateThought = async (req, res) => { 
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {new: true});
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete thought by id
const deleteThought = async (req, res) => {
    const thoughtId = {_id:req.params.thoughtId};
    try {
      const thought = await Thought.findByIdAndDelete(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json({ message: 'Successfully deleted thought' });
    } catch (error) {
      res.status(500).json(error);
    }
};

// Create new reaction for thought
const createReaction = async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
          {_id:req.params.thoughtId},
          {$addToSet: {reactions: req.body}},
          {runValidators: true, new: true}
      );
      thought ? res.json(thought) : res.status(404).json({message: notFound});
    } catch (error) {
      res.status(500).json(error);
    }
};

// Delete reaction from thought by id
const deleteReaction = async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          {$pull: {reactions: {reactionId: req.params.reactionId}}},
          {runValidators: true, new: true}
      );
      thought ? res.json(thought) : res.status(404).json({message: notFound});
    } catch (error) {
      res.status(500).json(error);
    }
}

module.exports = {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
};