const axios = require('axios');

// Replace this with the base URL of your API server
const baseURL = 'http://your-api-server-url';

// Number of users you want to create
const numberOfUsers = 10;

// Function to create a new user using the API
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

// Function to make a user follow another user using the API
const addFollowing = async (userId, followId) => {
  try {
    await axios.post(`${baseURL}/addFollowing`, {
      userId: userId,
      followId: followId,
    });
  } catch (error) {
    console.error('Error adding following:', error.message);
  }
};

// Function to make a user follower another user using the API
const addFollower = async (userId, followId) => {
  try {
    await axios.post(`${baseURL}/addFollower`, {
      userId: userId,
      followId: followId,
    });
  } catch (error) {
    console.error('Error adding follower:', error.message);
  }
};

// Function to create and follow users
const createAndFollowUsers = async () => {
  try {
    const createdUsers = [];

    // Create users
    for (let i = 0; i < numberOfUsers; i++) {
      const userData = {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: 'password123', // Replace with the desired password
      };

      const newUser = await createUser(userData);
      if (newUser) {
        console.log(`User ${i + 1} created`);
        createdUsers.push(newUser);
      }
    }

    // Make each user follow every other user
    for (let i = 0; i < createdUsers.length; i++) {
      const currentUser = createdUsers[i];

      // Find users to follow (excluding the current user)
      const usersToFollow = createdUsers.filter((user) => user._id !== currentUser._id);

      for (let j = 0; j < usersToFollow.length; j++) {
        const userToFollow = usersToFollow[j];
        await addFollowing(currentUser._id, userToFollow._id);
        await addFollower(userToFollow._id, currentUser._id);
        console.log(`User ${currentUser.name} is following User ${userToFollow.name}`);
        console.log(`User ${userToFollow.name} is following User ${currentUser.name}`);
      }
    }

    console.log('All users created and following each other!');
  } catch (error) {
    console.error('Error creating and following users:', error.message);
  }
};

// Call the function to create and follow users
createAndFollowUsers();
