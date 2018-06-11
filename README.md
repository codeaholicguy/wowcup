wowcup
======

The finest Worldcup 2018 CLI.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/wowcup.svg)](https://npmjs.org/package/wowcup)
[![CircleCI](https://circleci.com/gh/codeaholicguy/wowcup/tree/master.svg?style=shield)](https://circleci.com/gh/codeaholicguy/wowcup/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/codeaholicguy/wowcup?branch=master&svg=true)](https://ci.appveyor.com/project/codeaholicguy/wowcup/branch/master)
[![Codecov](https://codecov.io/gh/codeaholicguy/wowcup/branch/master/graph/badge.svg)](https://codecov.io/gh/codeaholicguy/wowcup)
[![Downloads/week](https://img.shields.io/npm/dw/wowcup.svg)](https://npmjs.org/package/wowcup)
[![License](https://img.shields.io/npm/l/wowcup.svg)](https://github.com/codeaholicguy/wowcup/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wowcup
$ wowcup COMMAND
running command...
$ wowcup (-v|--version|version)
wowcup/0.0.0 darwin-x64 node-v10.3.0
$ wowcup --help [COMMAND]
USAGE
  $ wowcup COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wowcup help [COMMAND]`](#wowcup-help-command)
* [`wowcup standings`](#wowcup-standings)

## `wowcup help [COMMAND]`

display help for wowcup

```
USAGE
  $ wowcup help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.0.5/src/commands/help.ts)_

## `wowcup standings`

get worldcup standings

```
USAGE
  $ wowcup standings

OPTIONS
  -h, --help         show CLI help
  -t, --table=table  get standings by table

EXAMPLES
  $ wowcup standings
  $ wowcup standings -t a
```

_See code: [src/commands/standings.ts](https://github.com/codeaholicguy/wowcup/blob/v0.0.0/src/commands/standings.ts)_
<!-- commandsstop -->
