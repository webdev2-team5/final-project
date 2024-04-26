require("dotenv").config();

// LOGGER
// Send a message to logs with proper formatting
// @param {string} msg: message to send to log
// @param {number} level: which level of debug to display message at. Default 3
//                  0 (system messages only)
//                  1 (error)
//                  2 (warn)
//                  3 (info)
//                  4 (debug)
//                  5 (print everything)

module.exports = function logger(msg, level = 3) {
  const debugLevel = process.env.DEBUG_LEVEL || 3;

  // If the debug level is set to not show this info, bail out
  if (level > debugLevel) return;

  let msgPreface = "";
  switch (level) {
    case 1:
      msgPreface = "Error";
      break;
    case 2:
      msgPreface = "Warn";
      break;
    case 3:
      msgPreface = "Info";
      break;
    case 4:
      msgPreface = "Debug";
      break;
    case 5:
      msgPreface = "SuperDetail";
      break;
    case 0:
      msgPreface = "System";
      break;
  }

  // build the string with formatting
  const logString =
    "[" + new Date().toISOString() + "] " + msgPreface + ": " + msg;

  // send to console. This can be changed to a log file later
  console.log(logString);
};
