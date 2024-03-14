
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const bucketname = process.env.BUCKET_NAME;
const bucketregion = process.env.BUCKET_REGION;
const acceskey = process.env.AWS_ROLE_ACCES_KEY;
const secretkey = process.env.AWS_ROLE_SECRET_KEY;


const client = new S3Client({
    credentials: {
        accessKeyId: acceskey,
        secretAccessKey: secretkey
    },
    region: bucketregion
});

async function uploadtos3( imagebuffer , imageName ){
   
    const params = {
      Bucket: bucketname,
      Body: imagebuffer,
      Key: imageName
    }

    const command = new PutObjectCommand(params);

    const s3res = await client.send(command);

}


async function getImagesofProduct(products) {

    console.log(typeof products, products.length);

    for (let i = 0; i < products.length; i++) {
        
        const product = products[i];

        const params = {
            Bucket: bucketname,
            Key: product.productImage,
        };

        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(client, command, { expiresIn: 3600 });

        product.productImage = url;
    }

}


async function deleteFromS3(imageKey){
    
    const params = {
        Bucket: bucketname,
        Key: imageKey,
    };

    const deleteObjectCommand = new DeleteObjectCommand(params);

    await client.send(deleteObjectCommand);
}


module.exports = { getImagesofProduct, uploadtos3 , deleteFromS3};