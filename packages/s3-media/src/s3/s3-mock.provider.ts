import { interfaces } from "cheeket";
import AWSMock from "mock-aws-s3";
import * as AWS from "aws-sdk";

function s3MockProvider(): interfaces.Provider<AWS.S3> {
  return () => {
    return new AWSMock.S3();
  };
}

export default s3MockProvider;
