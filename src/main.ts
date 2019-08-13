import * as core from '@actions/core';
const exec = require('@actions/exec');

async function run() {
  try {
    const version = core.getInput('version');
    const pkg = version ? `pipenv==${version}` : 'pipenv';
    const sudo = process.platform !== 'win32' ? 'sudo ' : '';
    await exec(`${sudo}pip install ${pkg}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
