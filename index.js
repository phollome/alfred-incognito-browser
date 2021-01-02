const exec = require("child_process").exec;
const alfy = require("alfy");

const browserList = require("./browserList.json");
const checkAvailability = require("./src/checkAvailability");

async function main() {
  if (alfy.input) {
    const { key, path, command } = browserList.find(
      (item) => item.key === alfy.input || item.command === alfy.input
    );
    const { isAvailable } = await checkAvailability({ path });
    if (isAvailable) {
      exec(command);
    } else {
      alfy.output([{ title: `${key} not available` }]);
    }
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

main();
