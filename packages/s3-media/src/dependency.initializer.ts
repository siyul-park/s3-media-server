import { Initializer } from "@cheeket/koa";
import { interfaces } from "cheeket";
import S3DependencyInitializer from "./s3/s3-dependency.initializer";
import ServiceDependencyInitializer from "./service/service-dependency.initializer";

class DependencyInitializer implements Initializer {
  private readonly s3DependencyInitializer = new S3DependencyInitializer({
    useMock: true,
    bucketName: "test/assets",
  });

  private readonly serviceDependencyInitializer = new ServiceDependencyInitializer();

  initRootContainer(container: interfaces.Container): void {
    this.s3DependencyInitializer.initRootContainer(container);
    this.serviceDependencyInitializer.initRootContainer(container);
  }

  initContextContainer(container: interfaces.Container): void {
    this.s3DependencyInitializer.initContextContainer(container);
    this.serviceDependencyInitializer.initContextContainer(container);
  }
}

export default DependencyInitializer;
