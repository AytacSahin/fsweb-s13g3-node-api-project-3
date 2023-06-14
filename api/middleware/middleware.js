const userModel = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${new Date().toLocaleString()} - req created as = ${req.method} - URL: ${req.originalUrl}`
  );
  next();
}

// 🟢 "id" doğrulama:
async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const existUser = await userModel.getById(req.params.id);
    if (existUser) {
      req.user = existUser;
      next()
    }
    else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    next(error);
  }
}

// 🟢 "name" doğrulama:
function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "gerekli name alanı eksik" })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

// 🟢 "post" doğrulama:
function validatePost(req, res, next) {
  try {
    let { text } = req.body;
    if (!text) {
      res.status(400).json({ message: "gerekli text alanı eksik" })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}