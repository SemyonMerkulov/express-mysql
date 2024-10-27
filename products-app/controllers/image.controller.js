exports.upload = (req, res) => {
  const multer  = require("multer");
  const mime = require("mime-types");

  const storage = multer.diskStorage({
    destination: function (_, _, cb) {
      cb(null, 'images/');
    },
    filename: function (req, file, cb) {
      let name = new Date().toJSON();
      let ext = mime.extension(file.mimetype);
      cb(null, `${name}.${ext}`);
    }
  })

  const upload = multer({ storage: storage }).single('filedata');
  
  upload(req, res, function(err) {
    let filedata = req.file;
    if (err instanceof multer.MulterError) {
      res.send("A Multer error occurred when uploading");
    } else if (!filedata) {
      res.send("Ошибка при загрузке файла");
    } else {
      res.send(res.req.file.filename)
    }
  })
}