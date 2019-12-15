import fs from 'fs';
import path from 'path';
import os from 'os';

import * as core from '@actions/core';
import { exec } from '@actions/exec';

async function run() {
  try {
    const version = core.getInput('version');
    const preview = core.getInput('preview');
    const create_virtualenvs = core.getInput('create_virtualenvs');

    await exec('curl -O -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py');

    const flags = preview ? '--preview' : version ? `--version=${version}`: '';
    await exec(`python get-poetry.py --yes ${flags}`)
    core.addPath(path.join(os.homedir(), '.poetry', 'bin'));
    fs.unlinkSync('get-poetry.py');
    if (!create_virtualenvs) {
      await exec('poetry config virtualenvs.create false');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
