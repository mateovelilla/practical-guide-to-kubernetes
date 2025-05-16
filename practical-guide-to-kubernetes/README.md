practical-guide-to-kubernetes
=================

Terminal for generating practical Kubernetes exercises with K3D


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/practical-guide-to-kubernetes.svg)](https://npmjs.org/package/practical-guide-to-kubernetes)
[![Downloads/week](https://img.shields.io/npm/dw/practical-guide-to-kubernetes.svg)](https://npmjs.org/package/practical-guide-to-kubernetes)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g practical-guide-to-kubernetes
$ pgtk COMMAND
running command...
$ pgtk (--version)
practical-guide-to-kubernetes/0.0.0 linux-x64 node-v22.15.1
$ pgtk --help [COMMAND]
USAGE
  $ pgtk COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pgtk hello PERSON`](#pgtk-hello-person)
* [`pgtk hello world`](#pgtk-hello-world)
* [`pgtk help [COMMAND]`](#pgtk-help-command)
* [`pgtk plugins`](#pgtk-plugins)
* [`pgtk plugins add PLUGIN`](#pgtk-plugins-add-plugin)
* [`pgtk plugins:inspect PLUGIN...`](#pgtk-pluginsinspect-plugin)
* [`pgtk plugins install PLUGIN`](#pgtk-plugins-install-plugin)
* [`pgtk plugins link PATH`](#pgtk-plugins-link-path)
* [`pgtk plugins remove [PLUGIN]`](#pgtk-plugins-remove-plugin)
* [`pgtk plugins reset`](#pgtk-plugins-reset)
* [`pgtk plugins uninstall [PLUGIN]`](#pgtk-plugins-uninstall-plugin)
* [`pgtk plugins unlink [PLUGIN]`](#pgtk-plugins-unlink-plugin)
* [`pgtk plugins update`](#pgtk-plugins-update)

## `pgtk hello PERSON`

Say hello

```
USAGE
  $ pgtk hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ pgtk hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/mateovelilla/practical-guide-to-kubernetes/blob/v0.0.0/src/commands/hello/index.ts)_

## `pgtk hello world`

Say hello world

```
USAGE
  $ pgtk hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ pgtk hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/mateovelilla/practical-guide-to-kubernetes/blob/v0.0.0/src/commands/hello/world.ts)_

## `pgtk help [COMMAND]`

Display help for pgtk.

```
USAGE
  $ pgtk help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pgtk.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.28/src/commands/help.ts)_

## `pgtk plugins`

List installed plugins.

```
USAGE
  $ pgtk plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ pgtk plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/index.ts)_

## `pgtk plugins add PLUGIN`

Installs a plugin into pgtk.

```
USAGE
  $ pgtk plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into pgtk.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PGTK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PGTK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ pgtk plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ pgtk plugins add myplugin

  Install a plugin from a github url.

    $ pgtk plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ pgtk plugins add someuser/someplugin
```

## `pgtk plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ pgtk plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ pgtk plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/inspect.ts)_

## `pgtk plugins install PLUGIN`

Installs a plugin into pgtk.

```
USAGE
  $ pgtk plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into pgtk.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PGTK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PGTK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ pgtk plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ pgtk plugins install myplugin

  Install a plugin from a github url.

    $ pgtk plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ pgtk plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/install.ts)_

## `pgtk plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ pgtk plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ pgtk plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/link.ts)_

## `pgtk plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ pgtk plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pgtk plugins unlink
  $ pgtk plugins remove

EXAMPLES
  $ pgtk plugins remove myplugin
```

## `pgtk plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ pgtk plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/reset.ts)_

## `pgtk plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ pgtk plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pgtk plugins unlink
  $ pgtk plugins remove

EXAMPLES
  $ pgtk plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/uninstall.ts)_

## `pgtk plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ pgtk plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pgtk plugins unlink
  $ pgtk plugins remove

EXAMPLES
  $ pgtk plugins unlink myplugin
```

## `pgtk plugins update`

Update installed plugins.

```
USAGE
  $ pgtk plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/update.ts)_
<!-- commandsstop -->
