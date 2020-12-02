import util from "util";
import * as fs from "fs";

const unlink = util.promisify(fs.unlink);

export default unlink;
