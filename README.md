# Logger

A simple logger used for a CLI.

## Configuring Custom Colors
on install of this package, a file named: `logger.colors.json` will be created in the root directory of your project. it will be prepopulated with color configuration data for each of the available Logger methods.<br>
you can update this config file with different color configurations for the different methods if you prefer.<br>
(see [chalk documentation](https://www.npmjs.com/package/chalk#styles) for available color options).

__available config properties__
- TITLE
- GEN
- SUCCESS
- WARN
- ERROR
- DEBUG
- COMPLETE

## Usage
```javascript
const Logger = require('Logger');

const testObject = { x: 123, y: '456' };

Logger.title('header');
Logger.gen('some kind of body text describing something', testObject);

Logger.complete('completed successfully!');

Logger.log('i am a {{different color}}', ['bgCyan.white.bold']);
Logger.log('{{red}}, {{green}} and {{blue}}', ['red.bold', 'green', 'blue.underline']);
```

## Methods
all methods available from the Logger package (except for the .log method) uses the following structure:  
### `Logger.<method>(string, [<any...>]);`
-----
#### Logger.complete
a completion message, used when a process completes.

#### Logger.debug
a debug message, used during development to debug/troubleshoot.

#### Logger.error
an error message, used to display error information (does not replace console.error. this method only restyles console.log messages).

#### Logger.gen
a general message, used for general messages or bodies of text.

#### Logger.log - `Logger.log(<string>, [<style>...])`
used to log messages with inline colors rather than entire message being of a single color.

to use, wrap the piece of text you want to be of a different color with double curly brackets: `{{text}}`. then, as the second argument to the method, include an array of styles (following the chalk API guidelines) where each element of the array will correspond to an instance of double curly bracket wrapped text.

:heavy_exclamation_mark: __IMPORTANT:__ for every instance of double curly bracket wrapped text, there must be a corresonding style element in the array. If not, this method will throw an error.

#### Logger.success
a success message, used on success of some action.

#### Logger.title
a title message, used like a header over some other log message.

#### Logger.warn
a warning message, used to warn the user about some unexpected behavior that is not an error.







