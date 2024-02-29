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
  window.console.log = function (...args) {
    oldLog("Console log running")
    if (args.length > 0) {
      const fullLog = handleSubstitutions(...args);
      parent.postMessage({ type: "log", message: fullLog }, "*");
    }
    oldLog.apply(console, args);
  };

  const oldError = console.error;
  window.console.error = function (...args) {
    if (args.length > 0) {
      const fullError = handleSubstitutions(...args);
      parent.postMessage({ type: "error", message: fullError }, "*");
    }
    oldError.apply(console, args);
  };

  const oldWarn = console.warn;
  window.console.warn = function (...args) {
    if (args.length > 0) {
      const fullWarn = handleSubstitutions(...args);
      parent.postMessage({ type: "warn", message: fullWarn }, "*");
    }
    oldWarn.apply(console, args);
  };
}`;
