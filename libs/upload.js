var multer = require('multer')
var path = require('path');
const mkdirp = require('mkdirp');
var adsUploadDir = path.join(__dirname, '../public/ads/');
module.exports = {
    adsUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(adsUploadDir);
                cb(null, adsUploadDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    })
}