import { Initializer } from "@cheeket/koa";
import { interfaces } from "cheeket";
import S3DependencyInitializer from "./s3/s3-dependency.initializer";

class DependencyInitializer implements Initializer {
  private readonly s3DependencyInitializer = new S3DependencyInitializer({
    useMock: true,
    bucketName: "test",
  });

  initRootContainer(container: interfaces.Container): void {
    this.s3DependencyInitializer.initRootContainer(container);
  }

  initContextContainer(container: interfaces.Container): void {
    this.s3DependencyInitializer.initContextContainer(container);
  }
}

export default DependencyInitializer;
