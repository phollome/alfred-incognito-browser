const exec = require("child_process").exec;
const fs = require("fs");
const alfy = require("alfy");

const browserList = require("./browserList.json");

async function main() {
  if (alfy.input) {
    const { command } = browserList.find(
      (item) => item.key === alfy.input || item.command === alfy.input
    );
    exec(command);
  } else {
    const checkedList = await Promise.all(
      browserList.map((item) => checkAvailability(item))
    );
    const filteredList = checkedList
      .filter((item) => item.isAvailable)
      .sort((a, b) => a.key.localeCompare(b.key));
    alfy.output(filteredList);
  }
}

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

main();
