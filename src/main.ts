import * as core from '@actions/core';
const exec = require('@actions/exec');

async function run() {
  try {
    const version = core.getInput('version');
    const preview = core.getInput('preview');

    await exec('curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py');

    const flags = preview ? '--preview' : version ? `--version=${version}`: '';
    await exec(`python get-poetry.py ${flags}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
