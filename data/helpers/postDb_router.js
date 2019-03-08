const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
 try {
   const posts = await Posts.get(req.query);
   res.status(200).json(posts);
 } catch (error) {
   console.log(error);
   res.status(500).json({
     message: 'Error retrieving the posts',
   });
 }
});

router.post('/', async (req, res) => {
  try {
    const newPost = { ...req.body, user_id: req.params.id };
    const message = await Posts.insert(newPost);
    res.status(201).json(message);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the post."
    }); 
  }
});

// COMPLETE
router.delete('/:id', async (req, res) => {
 try {
   const count = await Posts.remove(req.params.id);

   if (count > 0) {
     res.status(200).json({ message: 'The post has been nuked' });
   } else {
     res.status(404).json({ message: 'The id could not be found' });
   }
 } catch (error) {
   console.log(error);
   res.status(500).json({
     message: 'Error removing the user',
   });
 }
});

router.put('/:id', async (req, res) => {
   try {
     const post = await Posts.update(req.params.id, req.body)
     
     if(post) {
       res.status(200).json(post);
     }
     else{
       res.status(404).json({
         message: "The post could not be found."
       })
     }
   } 
   catch(error) {
     res.status(500).json({message: "Error updating the post."});
   }
});

// COMPLETE
router.get('/:id', async (req, res) => {
 try {
   const post = await Posts.getById(req.params.id);

   if(post) {
     res.status(200).json(post);
   } else {
     res.status(404).json({message: 'Post not found'});
   }
 } catch(error) {
   res.status(500).json({error: "The post could not be retrieved"});
 }
});


module.exports = router;