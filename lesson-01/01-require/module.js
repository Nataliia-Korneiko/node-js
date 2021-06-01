const info = (msg) => {
  console.log(`Info: ${msg}`);
};

const log = (msg) => {
  console.log(a);
  console.log(`Log: ${msg}`);
};

// Не использовать, так как ссылка затирается:
// exports.info = info;
// exports.log = log;

module.exports = {
  info,
  log,
};
