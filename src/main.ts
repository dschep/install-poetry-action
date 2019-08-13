import path from 'path';

import * as core from '@actions/core';
import { exec } from '@actions/exec';

async function run() {
  try {
    const version = core.getInput('version');
    const preview = core.getInput('preview');

    await exec('curl -O -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py');

    console.log('preview', preview)
    console.log('version', version)
    const flags = preview ? '--preview' : version ? `--version=${version}`: '';
    await exec(`python get-poetry.py --yes ${flags}`)
    const home = process.env.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME;
    core.addPath(`${home}${path.sep}.poetry${path.sep}bin`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
