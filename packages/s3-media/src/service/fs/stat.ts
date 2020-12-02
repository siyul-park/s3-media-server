import util from "util";
import * as fs from "fs";

const stat = util.promisify(fs.stat);

export default stat;
