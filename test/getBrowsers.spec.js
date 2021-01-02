const fs = require("fs");
const checkAvailability = require("../src/checkAvailability");

const tmpPath = "test/tmp";

const browserList = [
  {
    key: "Test Browser",
    path: `${tmpPath}/Test Browser`,
  },
  { key: "Not installed Browser", path: `${tmpPath}/Not installed Browser` },
];

function mkdir(props) {
  const { path } = props;
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function rmdir(props) {
  const { path } = props;
  return new Promise((resolve, reject) => {
    fs.rmdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

beforeAll(async () => {
  await mkdir({ path: tmpPath });
  await mkdir(browserList[0]);
});

afterAll(async () => {
  await rmdir({ path: tmpPath });
});

test("get list of available browsers", async () => {
  const list = await Promise.all(browserList.map(checkAvailability));
  const availableBrowsers = list.filter((item) => item.isAvailable);
  expect(availableBrowsers.length).toBe(1);
  expect(availableBrowsers[0].key).toBe(browserList[0].key);
});
