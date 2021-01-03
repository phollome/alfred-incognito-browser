const {
  checkAvailability,
  enhanceBrowserList,
  mkdir,
  rmdir,
  TEST_PATH,
} = require("./utils");
const browserList = require("./browserList");

beforeAll(async () => {
  await mkdir({ path: TEST_PATH });
  const path = `${TEST_PATH}/${browserList[0].path}`;
  await mkdir({ path });
});

afterAll(async () => {
  await rmdir({ path: TEST_PATH });
});

test("show list of available browsers", async () => {
  const enhancedList = enhanceBrowserList(browserList, TEST_PATH);
  const list = await Promise.all(enhancedList.map(checkAvailability));
  const availableBrowsers = list.filter((item) => item.isAvailable);
  expect(availableBrowsers.length).toBe(1);
  expect(availableBrowsers[0].key).toBe(browserList[0].key);
});
