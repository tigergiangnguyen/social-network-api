const { User } = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getSingleUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
};

const createUser = async (req, res) => {
    const { username, email } = req.body;
  
    try {
      const newUser = new User({
        username,
        email
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;
  
    try {
      const user = await User.findOneAndUpdate(userId, updates, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findOneAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'Successfully deleted user' });
    } catch (error) {
      res.status(500).json(error);
    }
};

const addFriend = async (req, res) => {
    const userId = req.params.id;
    const friendId = req.body.friendId;
  
    try {
      const user = await User.findOneAndUpdate(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.friends.push(friendId);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
};

const removeFriend = async (req, res) => {
    const userId = req.params.id;
    const friendId = req.params.friendId;
  
    try {
      const user = await User.findOneAndUpdate(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const friendIndex = user.friends.includes(friendId);
  
      if (friendIndex === -1) {
        return res.status(404).json(error);
      }
      user.friends.splice(friendIndex, 1);
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};