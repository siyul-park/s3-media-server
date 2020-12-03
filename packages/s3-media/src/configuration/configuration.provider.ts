import Configuration from "./configuration";

function configurationProvider(): Configuration {
  return {
    // TODO(환경 변수 사용하게 수정)
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_S3_ENDPOINT,
    apiVersion: process.env.AWS_S3_API_VERSION,
    bucketName: process.env.AWS_S3_BUCKET_NAME ?? "test/assets",
    region: process.env.AWS_S3_REGION,
    s3ForcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE
      ? process.env.AWS_S3_FORCE_PATH_STYLE === "true"
      : undefined,
    useMock: process.env.AWS_S3_USE_MOCK
      ? process.env.AWS_S3_USE_MOCK === "true"
      : true,
    signatureVersion: process.env.AWS_S3_SIGNATURE_VERSION,
  };
}
export default configurationProvider;
