import {Initializer} from "@cheeket/koa";
import {inContainerScope, interfaces} from "cheeket";
import {autoInjected} from "@cheeket/injector";

import Token from "./token";
import Uploader from "./uploader";
import styleRepositoryProvider from "./style/style-repository.provider";
import Downloader from "./downloader";

class ServiceDependencyInitializer implements Initializer {
  private readonly uploaderProvider = inContainerScope(
    autoInjected(Uploader)
  );

  private readonly downloaderProvider = inContainerScope(
    autoInjected(Downloader)
  );

  private readonly styleRepositoryProvider = inContainerScope(
    styleRepositoryProvider()
  );

  initRootContainer(container: interfaces.Container): void {
    container.bind(Token.UPLOADER, this.uploaderProvider);
    container.bind(Token.DOWNLOADER, this.downloaderProvider);
    container.bind(Token.STYLE_REPOSITORY, this.styleRepositoryProvider);
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  initContextContainer(container: interfaces.Container): void {}
}

export default ServiceDependencyInitializer;
