const { User } = require('../models');

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
};

const getSingleUser = async (req, res) => {
    const userId = req.params.userId
  
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
    try {
      const newUser = User.create(req.body);
      if (newUser) {
        res.json({ message: 'Successfully created user' });
      }
      res.json(newUser);
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
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId || req.params.friendId} },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
};

const removeFriend = async ({ params }, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const friendIndex = !user.friends.includes(params.friendId);
  
      if (friendIndex) {
        res.json({ message: "Successfully removed friend", user})
      } else { 
      res.json(user);
      }
    } catch (error) {
      res.status(400).json(error);
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