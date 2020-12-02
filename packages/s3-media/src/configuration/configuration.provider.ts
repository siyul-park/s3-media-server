import Configuration from "./configuration";

function configurationProvider(): Configuration {
  return {
    apiVersion: process.env.AWS_S3_API_VERSION,
    bucketName: process.env.AWS_S3_BUCKET_NAME ?? "test/assets",
    region: process.env.AWS_S3_REGION,
    useMock: Boolean(process.env.AWS_S3_USE_MOCK ?? true),
  };
}
export default configurationProvider;
