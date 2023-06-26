import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const bucketName = 'ph-skup';
const objectKey = 'data.jpeg';

const params = {
  Bucket: bucketName,
  Key: objectKey,
  Expires: 300, // Expiration time in seconds
};

s3.getSignedUrl('putObject', params, (err, url) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('presigned URL:', url);
});