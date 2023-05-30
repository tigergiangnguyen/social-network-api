const { Thought, User, Reaction } = require('../models');
const { Types } = require('mongoose');

const getAllThoughts = async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getSingleThought = async (req, res) => {
    const thoughtId = req.params.id;

    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
};

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

const updateThought = async (req, res) => {
    const thoughtId = req.params.id; 
    const { thoughtText } = req.body;
  
    try {
      const thought = await Thought.findByIdAndUpdate(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      thought.thoughtText = thoughtText;
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
};

const deleteThought = async (req, res) => {
    const thoughtId = req.params.id;
    try {
      const thought = await Thought.findByIdAndRemove(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json({ message: 'Successfully deleted thought' });
    } catch (error) {
      res.status(500).json(error);
    }
};

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