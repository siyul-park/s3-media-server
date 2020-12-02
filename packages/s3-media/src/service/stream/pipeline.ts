import util from "util";
import * as stream from "stream";

const pipeline = util.promisify(stream.pipeline);

export default pipeline;
