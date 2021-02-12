const {GraphQLUpload} = require('graphql-upload')
async function Upload(this,GraphQLUpload)

async function uploadImage(root, { name, file }){
    const { filename, mimetype, createReadStream } = await file;
    const stream = createReadStream();
    // Promisify the stream and store the file, then ...
    return true;
  }

module.exports = {
    Upload,
    uploadImage
  }