wowcup
======

The finest Worldcup 2018 CLI. Inspired by [nba-go](https://github.com/xxhomey19/nba-go).

`wowcup` is a node command line application written in TypeScript using [oclif](https://github.com/oclif/oclif) (a Node.JS Open CLI Framework).

This is still in its early stages of development, so do expect bugs and errors. Your contributions are very welcome!

All data comes from [api.football-data.org](https://api.football-data.org) APIs.

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
wowcup/0.0.2 darwin-x64 node-v10.3.0
$ wowcup --help [COMMAND]
USAGE
  $ wowcup COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wowcup fixtures`](#wowcup-fixtures)
* [`wowcup help [COMMAND]`](#wowcup-help-command)
* [`wowcup standings`](#wowcup-standings)

## `wowcup fixtures`

get worldcup fixtures

![](https://i.gyazo.com/a562d442af729c3b59f34110008d5ed0.gif)

```
USAGE
  $ wowcup fixtures

OPTIONS
  -h, --help  show CLI help
  -l, --last  get last recent fixtures
  -n, --next  get next recent fixtures

EXAMPLES
  $ wowcup fixtures
  $ wowcup fixtures -n
```

_See code: [src/commands/fixtures.ts](https://github.com/codeaholicguy/wowcup/blob/v0.0.2/src/commands/fixtures.ts)_

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

![](https://i.gyazo.com/19a5a39b69613baa4154f892a0a8d9b8.gif)

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

_See code: [src/commands/standings.ts](https://github.com/codeaholicguy/wowcup/blob/v0.0.2/src/commands/standings.ts)_
<!-- commandsstop -->
