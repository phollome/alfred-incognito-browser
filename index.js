const { exec } = require("child_process");

const alfy = require("alfy");

const browserList = require("./browserList.json");
const { checkAvailability, enhanceBrowserList } = require("./utils");

const APPLICATIONS_PATH = "/Applications";

async function main() {
  if (alfy.input) {
    const { key, path, command } = browserList.find(
      (item) => item.key === alfy.input || item.command === alfy.input
    );
    const { isAvailable } = await checkAvailability({
      path: `${APPLICATIONS_PATH}/${path}`,
    });
    if (isAvailable) {
      exec(command);
    } else {
      alfy.output([
        { title: `${key} not available`, icon: { path: alfy.icon.error } },
      ]);
    }
  } else {
    const enhancedList = enhanceBrowserList(browserList, APPLICATIONS_PATH);
    const checkedList = await Promise.all(enhancedList.map(checkAvailability));

    alfy.output(
      checkedList
        .filter((item) => item.isAvailable)
        .sort((a, b) => a.key.localeCompare(b.key))
    );
  }
}

main();
