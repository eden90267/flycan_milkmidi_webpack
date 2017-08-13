var message = 'hi webpack';
console.log(message);

/*
// require 
var util = require("./util/module_exports_util");
console.log("util.add", util.add(1, 1));
console.log("util.getName", util.getName());
//*/

//*
// impprt
import * as u from "./util/export_util";
console.log("sub", u.sub(5, 2));

import { multi } from "./util/export_util";
console.log("multi", multi(6, 2));
//*/