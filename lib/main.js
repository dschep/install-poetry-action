"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const version = core.getInput('version');
            const preview = core.getInput('preview');
            yield exec_1.exec('curl -O -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py');
            const flags = preview ? '--preview' : version ? `--version=${version}` : '';
            yield exec_1.exec(`python get-poetry.py --yes ${flags}`);
            core.addPath(path_1.default.join(os_1.default.homedir(), '.poetry', 'bin'));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
