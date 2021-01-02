const fs = require("fs");

function checkAvailability(props) {
  const { key, path, command } = props;
  return new Promise((resolve) => {
    fs.access(path, fs.constants.R_OK, (err) => {
      let isAvailable = true;
      if (err) {
        isAvailable = false;
      }
      resolve({
        title: key,
        subtitle: path,
        arg: command,
        isAvailable,
        ...props,
      });
    });
  });
}

module.exports = checkAvailability;
