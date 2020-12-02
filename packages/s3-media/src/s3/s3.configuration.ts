import * as AWS from "aws-sdk";

interface S3Configuration extends Partial<AWS.S3.ClientConfiguration> {
  useMock?: boolean;
  bucketName: string;
}

export default S3Configuration;
