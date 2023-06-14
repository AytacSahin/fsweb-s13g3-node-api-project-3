const express = require('express');
const userModel = require('./users-model');
const postModel = require('../posts/posts-model');
const middleware = require("../middleware/middleware");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

// 🟢 GET / tüm dataları al:
router.get('/', async (req, res, next) => {
  try {
    res.json(await userModel.get())
  } catch (error) {
    next(error)
  }
});

// 🟢 GET / tüm dataları al:
router.get('/:id', middleware.validateUserId, (req, res, next) => {
  try {
    res.json(req.user)
  } catch (error) {
    next(error)
  }
});

// 🟢 "POST" ile user ekleme:
router.post('/', middleware.validateUser, async (req, res, next) => {
  try {
    const user = await userModel.insert(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
});

// 🟢 "put" ilgili id'deki datayı güncelleme:
router.put('/:id', middleware.validateUserId, middleware.validateUser, async (req, res, next) => {
  try {
    const updatedUser = await userModel.update(req.params.id, req.body);
    res.status(201).json(updatedUser)
  } catch (error) {
    next(error);
  }
});

// 🟢 "DELETE" id'ye ait durumu objeden silme:
router.delete('/:id', middleware.validateUserId, async (req, res, next) => {
  try {
    await userModel.remove(req.params.id);
    res.json(req.user)
  } catch (error) {
    next(error)
  }
});

// 🟢 "GET" id'ye ait post'ları görüntüle:
router.get('/:id/posts', middleware.validateUserId, async (req, res, next) => {
  try {
    const userPosts = await userModel.getUserPosts(req.params.id);
    res.json(userPosts)
  } catch (error) {
    next(error)
  }
});

// 🟢 "POST" id'ye ait post'lara post ekleme:
router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, async (req, res, next) => {
  try {
    const newPost = await postModel.insert({user_id: req.params.id, text:req.body.text})
    res.status(201).json(newPost)
  } catch (error) {
    next(error)
  }
});

// routerı dışa aktarmayı unutmayın
module.exports = router;