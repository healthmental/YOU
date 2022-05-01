const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'devsalem',
    api_key: '691764569123386',
    api_secret: 'Dc9Oeuy3i2V8el8EccN8oLTRurI'
});

exports.uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({ url: result.url, id: result.public_id })
        }, { resource_type: "auto" })
    })
}