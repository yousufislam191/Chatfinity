const { uploader } = require("../utilities/singleUploader");

// for profile picture upload
const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/HEIC"],
    10000000,
    "Only .jpg, .jpeg, .png, .heic or .HEIC formats allowed!"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
