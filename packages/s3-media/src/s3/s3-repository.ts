import AWS, {S3} from "aws-sdk";

class S3Repository {
  constructor(public readonly s3: AWS.S3, public readonly bucketName: string) {}

  async deleteObject(
    params: Omit<S3.Types.DeleteObjectRequest, "Bucket">
  ): Promise<S3.DeleteObjectOutput> {
    return this.s3
      .deleteObject({
        Bucket: this.bucketName,
        ...params,
      })
      .promise();
  }

  async getObject(
    params: Omit<S3.Types.GetObjectRequest, "Bucket">
  ): Promise<S3.GetObjectOutput> {
    try {
      return await this.s3
        .getObject({
          Bucket: this.bucketName,
          ...params,
        })
        .promise();
    } catch (e) {
      return {};
    }
  }

  async copyObject(
    params: Omit<S3.Types.CopyObjectRequest, "Bucket">
  ): Promise<S3.CopyObjectOutput> {
    return this.s3
      .copyObject({
        Bucket: this.bucketName,
        ...params,
      })
      .promise();
  }

  async headObject(
    params: Omit<S3.Types.HeadObjectRequest, "Bucket">
  ): Promise<S3.HeadObjectOutput> {
    return this.s3
      .headObject({
        Bucket: this.bucketName,
        ...params,
      })
      .promise();
  }

  async upload(
    params: Omit<S3.Types.PutObjectRequest, "Bucket">
  ): Promise<S3.ManagedUpload.SendData> {
    return this.s3
      .upload({
        Bucket: this.bucketName,
        ...params,
      })
      .promise();
  }
}

export default S3Repository;
