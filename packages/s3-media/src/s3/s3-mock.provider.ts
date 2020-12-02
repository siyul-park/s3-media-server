import { interfaces } from "cheeket";
import AWSMock from "mock-aws-s3";
import * as AWS from "aws-sdk";

function s3MockProvider(): interfaces.Provider<AWS.S3> {
  return () => {
    const s3Mock = new AWSMock.S3();

    s3Mock.getSignedUrlPromise = (operation, params) => {
      const result = s3Mock.getSignedUrl(operation, params) as unknown;
      return (result as any).promise();
    };

    return s3Mock;
  };
}

export default s3MockProvider;
