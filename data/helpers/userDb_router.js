const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

// Custom Middleware
function allCaps(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

router.get('/', async (req, res) => {
 try {
   const users = await Users.get(req.query);
   res.status(200).json(users);
 } 
 catch (error) {
   console.log(error);
   res.status(500).json({
     message: 'Error retrieving users',
   });
 }
});

router.post('/', allCaps, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the user."
    }); 
  }
});

router.get('/:id', async (req, res) => {
 try {
   const user = await Users.getById(req.params.id);

   if(user) {
     res.status(200).json(user);
   } else {
     res.status(404).json({message: 'User not found'});
   }
 } catch(error) {
   res.status(500).json({error: "The user could not be retrieved"});
 }
});

router.delete('/:id', async (req, res) => {
 try {
   const count = await Users.remove(req.params.id);

   if (count > 0) {
     res.status(200).json({ message: 'The user has been removed' });
   } else {
     res.status(404).json({ message: 'The id could not be found' });
   }
 } catch (error) {
   // log error to database
   console.log(error);
   res.status(500).json({
     message: 'Error removing the user',
   });
 }
});

router.put("/:id", allCaps, async (req, res) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "The User could not be found" });
    }
  } 
  catch (error) {
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } 
  catch (error) {
    res.status(500).json({
      message: "Error getting the posts for the user"
    });
  }
});

module.exports = router;