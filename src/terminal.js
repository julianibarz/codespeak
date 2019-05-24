import 'xterm/dist/xterm.css'
import {
  Terminal
} from 'xterm';

export function createTerminal() {
  var term = new Terminal({cursorBlink: true, rows: 40});
  term.open(document.getElementById('terminal'));

  term.prompt = () => {
      term.write('\r\n$ ');
  };

  term.writeln('Welcome to xterm.js');
  term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
  term.writeln('Type some keys and commands to play around.');
  term.writeln('');
  term.prompt();

  term.on('key', function(key, ev) {
      const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
          term.prompt();
      } else if (ev.keyCode === 8) {
          // Do not delete the prompt
          if (term._core.buffer.x > 2) {
              term.write('\b \b');
          }
      } else if (printable) {
          term.write(key);
      }
  });

  term.on('paste', function(data) {
      term.write(data);
  });
  return term;
}