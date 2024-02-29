export default `import objectInspect from "https://cdn.jsdelivr.net/npm/object-inspect@1.13.1/+esm";
window.onerror = (message, source, lineNumber, colNumber, error) => {
  parent.postMessage(
    {
      type: "error",
      message,
      source,
      lineNumber,
      colNumber,
      error,
    },
    "*"
  );
};
{
  const stringify = (obj) => {
    if (typeof obj === "string") return obj;
    if (typeof obj === "function") return Function.prototype.toString.call(obj);
    return objectInspect(obj, { depth: 5, indent: 2 });
  };

  const handleSubstitutions = (...args) => {
    if (args.length === 0) return "";
    if (typeof args[0] !== "string") {
      return args.map(stringify).join(" ");
    }

    let currReplacer = 1;
    let res = "";
    const baseArg = args[0];
    for (let i = 0; i < baseArg.length; i++) {
      if (currReplacer >= args.length) {
        res += baseArg.slice(i);
        break;
      }
      if (baseArg[i] !== "%") {
        res += baseArg[i];
        continue;
      }
      i++;
      if (baseArg[i] === "%") {
        res += baseArg[i];
      } else if (baseArg[i] === "o" || baseArg[i] === "O") {
        if (typeof args[currReplacer] === "string") {
          res += \`"\${args[currReplacer]}"\`;
        } else {
          res += stringify(args[currReplacer]);
        }
      } else if (baseArg[i] === "d" || baseArg[i] === "i") {
        res += parseInt(args[currReplacer]);
      } else if (baseArg[i] === "s") {
        res += stringify(currReplacer);
      } else if (baseArg[i] === "f") {
        res += parseFloat(args[currReplacer]);
      } else if (baseArg[i] === ".") {
        i++;
        let num = "";
        while (i < baseArg.length && baseArg[i] >= "0" && baseArg[i] <= "9") {
          // Character must be a digit
          num += baseArg[i];
          i++;
        }
        if (baseArg[i] === "d" || baseArg[i] === "i") {
          res += parseInt(args[currReplacer]).toLocaleString("en-US", {
            minimumIntegerDigits: +num,
            useGrouping: false,
          });
        } else if (baseArg[i] === "f") {
          res += parseFloat(args[currReplacer]).toFixed(+num);
        } else {
          // Add original substring back
          res += "%." + num + baseArg[i];
        }
      }

      currReplacer++;
    }
    return res + " " + args.slice(currReplacer).map(stringify).join(" ");
  };

  const oldLog = console.log;
  window.console.log = function(...args) {
    if (args.length > 0) {
      const fullLog = handleSubstitutions(...args);
      parent.postMessage({ type: "log", message: fullLog }, "*");
    }
    oldLog.apply(console, args);
  };

  const oldError = console.error;
  window.console.error = function(...args) {
    if (args.length > 0) {
      const fullError = handleSubstitutions(...args);
      parent.postMessage({ type: "error", message: fullError }, "*");
    }
    oldError.apply(console, args);
  };

  const oldWarn = console.warn;
  window.console.warn = function(...args) {
    if (args.length > 0) {
      const fullWarn = handleSubstitutions(...args);
      parent.postMessage({ type: "warn", message: fullWarn }, "*");
    }
    oldWarn.apply(console, args);
  };

  const oldAssert = console.assert;
  window.console.assert = function(...args) {
    if (args.length > 0) {
      if (!args[0]) {
        const fullAssert = handleSubstitutions(...args.slice(1));
        parent.postMessage({ type: "error", message: "Assertion failed: " + fullAssert }, "*");
      }
    }
    oldAssert.apply(console, args);
  };

  const oldClear = console.clear;
  window.console.clear = function() {
    parent.postMessage({ type: "clear"}, "*");
    oldClear.apply(console);
  };

  const counts = {}
  const oldCount = console.count;
  window.console.count = function(label = "default") {
    if (label === undefined) return;
    const stringifiedLabel = String(label);
    counts[label] = (counts[label] ?? 0) + 1;
    parent.postMessage({type: "log", message: label + ": " + counts[label]}, "*")
    oldCount.call(console, label);
  }
  
  const oldCountReset = console.countReset;
  window.console.countReset = function(label = "default") {
    const stringifiedLabel = String(label);
    counts[stringifiedLabel] = 0;
    parent.postMessage({type: "log", message: stringifiedLabel + ": " + counts[stringifiedLabel]}, "*")
    oldCountReset.call(console, stringifiedLabel);
  }

  // Essentially a copy of log
  const oldDebug = console.debug;
  window.console.debug = function(...args) {
    if (args.length > 0) {
      const fullDebug = handleSubstitutions(...args);
      parent.postMessage({ type: "log", message: fullDebug }, "*");
    }
    oldDebug.apply(console, args);
  };

  // Essentially a copy of log
  const oldDir = console.dir;
  window.console.dir = function(...args) {
    if (args.length > 0) {
      const fullDir = handleSubstitutions(...args);
      parent.postMessage({ type: "log", message: fullDir }, "*");
    }
    oldDir.apply(console, args);
  };

  const oldInfo = console.info;
  window.console.info = function(...args) {
    if (args.length > 0) {
      const fullInfo = handleSubstitutions(...args);
      parent.postMessage({type: "log", message: "Info: " + fullInfo}, "*");
    }
  }

  const times = {};
  const oldTime = console.time;
  window.console.time = function(label = "default") {
    const stringifiedLabel = String(label);
    if (times[stringifiedLabel] !== undefined) {
      parent.postMessage({
        type: "warn", 
        message: \`Timer "\${stringifiedLabel}" is already in use\` 
      }, "*")
    } else {
      times[stringifiedLabel] = performance.now();
      parent.postMessage({
        type: "log", 
        message: \`"\${stringifiedLabel}": timer started\` 
      }, "*")
    }
    oldTime.call(console, label);
  }

  const oldTimeLog = console.timeLog;
  window.console.timeLog = function(label = "default") {
    const stringifiedLabel = String(label);
    if (times[stringifiedLabel] === undefined) {
      parent.postMessage({
        type: "warn", 
        message: \`Timer "\${stringifiedLabel}" does not exist\` 
      }, "*")
    } else {
      const elapsedTime = performance.now() - times[stringifiedLabel];
      parent.postMessage({
        type: "log", 
        message: \`"\${stringifiedLabel}": \${elapsedTime}ms\` 
      }, "*")
    }
    oldTimeLog.call(console, label);
  }

  const oldTimeEnd = console.timeEnd;
  window.console.timeEnd = function(label = "default") {
    const stringifiedLabel = String(label);
    if (times[stringifiedLabel] === undefined) {
      parent.postMessage({
        type: "warn", 
        message: \`Timer "\${stringifiedLabel}" does not exist\` 
      }, "*")
    } else {
      const elapsedTime = performance.now() - times[stringifiedLabel];
      parent.postMessage({
        type: "log", 
        message: \`"\${stringifiedLabel}": \${elapsedTime}ms - timer ended\` 
      }, "*")
      delete times[stringifiedLabel];
    }
    oldTimeEnd.call(console, label);
  }


}`;
