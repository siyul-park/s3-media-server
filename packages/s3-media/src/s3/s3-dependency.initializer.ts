import { Initializer } from "@cheeket/koa";
import { inContainerScope, interfaces } from "cheeket";

import Token from "./token";
import s3Provider from "./s3.provider";
import s3MockProvider from "./s3-mock.provider";
import s3RepositoryFactoryProvider from "./s3-repository-factory.provider";
import s3RepositoryProvider from "./s3-repository.provider";
import S3Configuration from "./s3.configuration";

class S3DependencyInitializer implements Initializer {
  constructor(private readonly configuration: S3Configuration) {}

  private readonly s3Provider = inContainerScope(
    this.configuration.useMock
      ? s3MockProvider()
      : s3Provider(this.configuration)
  );

  private readonly s3RepositoryFactoryProvider = inContainerScope(
    s3RepositoryFactoryProvider()
  );

  private readonly s3Repository = inContainerScope(
    s3RepositoryProvider(this.configuration.bucketName)
  );

  initRootContainer(container: interfaces.Container): void {
    container.bind(Token.S3, this.s3Provider);
    container.bind(
      Token.S3_REPOSITORY_FACTORY,
      this.s3RepositoryFactoryProvider
    );
    container.bind(Token.S3_REPOSITORY, this.s3Repository);
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  initContextContainer(container: interfaces.Container): void {}
}

export default S3DependencyInitializer;
