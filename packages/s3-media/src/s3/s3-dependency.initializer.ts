import { Initializer } from "@cheeket/koa";
import { inContainerScope, interfaces } from "cheeket";
import * as AWS from "aws-sdk";

import Token from "./token";
import s3Provider from "./s3.provider";
import s3MockProvider from "./s3-mock.provider";
import s3RepositoryFactoryProvider from "./s3-repository-factory.provider";

class S3DependencyInitializer implements Initializer {
  constructor(
    private readonly configuration: Partial<AWS.S3.ClientConfiguration> & {
      useMock?: boolean;
    }
  ) {}

  private readonly s3Provider = inContainerScope(
    this.configuration.useMock
      ? s3Provider(this.configuration)
      : s3MockProvider()
  );

  private readonly s3RepositoryFactoryProvider = s3RepositoryFactoryProvider();

  initRootContainer(container: interfaces.Container): void {
    container.bind(Token.S3, this.s3Provider);
    container.bind(
      Token.S3_REPOSITORY_FACTORY,
      this.s3RepositoryFactoryProvider
    );
  }

  // eslint-disable-next-line class-methods-use-this
  initContextContainer(container: interfaces.Container): void {}
}

export default S3DependencyInitializer;
