oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->

* [Usage](#usage)
* [Commands](#commands)

<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @aetheria/cli
$ aetheria COMMAND
running command...
$ aetheria (--version)
@aetheria/cli/0.0.0 linux-x64 node-v20.2.0
$ aetheria --help [COMMAND]
USAGE
  $ aetheria COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

* [`aetheria hello PERSON`](#aetheria-hello-person)
* [`aetheria hello world`](#aetheria-hello-world)
* [`aetheria help [COMMANDS]`](#aetheria-help-commands)
* [`aetheria plugins`](#aetheria-plugins)
* [`aetheria plugins:install PLUGIN...`](#aetheria-pluginsinstall-plugin)
* [`aetheria plugins:inspect PLUGIN...`](#aetheria-pluginsinspect-plugin)
* [`aetheria plugins:install PLUGIN...`](#aetheria-pluginsinstall-plugin-1)
* [`aetheria plugins:link PLUGIN`](#aetheria-pluginslink-plugin)
* [`aetheria plugins:uninstall PLUGIN...`](#aetheria-pluginsuninstall-plugin)
* [`aetheria plugins:uninstall PLUGIN...`](#aetheria-pluginsuninstall-plugin-1)
* [`aetheria plugins:uninstall PLUGIN...`](#aetheria-pluginsuninstall-plugin-2)
* [`aetheria plugins update`](#aetheria-plugins-update)

## `aetheria hello PERSON`

Say hello

```
USAGE
  $ aetheria hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See
code: [dist/commands/hello/index.ts](https://github.com/override-sh/aetheria-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `aetheria hello world`

Say hello world

```
USAGE
  $ aetheria hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ aetheria hello world
  hello world! (./src/commands/hello/world.ts)
```

## `aetheria help [COMMANDS]`

Display help for aetheria.

```
USAGE
  $ aetheria help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for aetheria.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.10/src/commands/help.ts)_

## `aetheria plugins`

List installed plugins.

```
USAGE
  $ aetheria plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ aetheria plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `aetheria plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ aetheria plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ aetheria plugins add

EXAMPLES
  $ aetheria plugins:install myplugin 

  $ aetheria plugins:install https://github.com/someuser/someplugin

  $ aetheria plugins:install someuser/someplugin
```

## `aetheria plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ aetheria plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ aetheria plugins:inspect myplugin
```

## `aetheria plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ aetheria plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ aetheria plugins add

EXAMPLES
  $ aetheria plugins:install myplugin 

  $ aetheria plugins:install https://github.com/someuser/someplugin

  $ aetheria plugins:install someuser/someplugin
```

## `aetheria plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ aetheria plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ aetheria plugins:link myplugin
```

## `aetheria plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ aetheria plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aetheria plugins unlink
  $ aetheria plugins remove
```

## `aetheria plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ aetheria plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aetheria plugins unlink
  $ aetheria plugins remove
```

## `aetheria plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ aetheria plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aetheria plugins unlink
  $ aetheria plugins remove
```

## `aetheria plugins update`

Update installed plugins.

```
USAGE
  $ aetheria plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

<!-- commandsstop -->
