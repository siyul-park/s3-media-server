import supertest from "supertest";

import bootstrap from "../src/bootstrap";

async function createRequest(): Promise<supertest.SuperTest<supertest.Test>> {
  const server = await bootstrap();
  return supertest(server);
}

export default createRequest;
