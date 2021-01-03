const fs = require("fs");

const TEST_PATH = "./tmp";

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

function enhanceBrowserList(list, basePath) {
  const enhancedList = list.map((item) => {
    const { path, iconPath, ...otherProps } = item;
    return {
      path: `${basePath}/${path}`,
      icon: { path: `${basePath}/${path}/${iconPath}` },
      ...otherProps,
    };
  });
  return enhancedList;
}

module.exports = {
  checkAvailability,
  enhanceBrowserList,
  mkdir,
  rmdir,
  TEST_PATH,
};
