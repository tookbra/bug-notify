const storage = require('electron-json-storage');

const db = {};

db.get = (key) => {
  storage.get(key, (err, data) => {
    if (err || data === undefined) {
      console.log('Error = ' + err);
      return '';
    }
    return data;
  });
};

db.getData = (key, callback) => {
  storage.get(key, (err, data) => {
    if (err || data === undefined) {
      console.log('Error = ' + err);
    } else {
      callback(data);
    }
  });
};

db.setData = (key, value, cover) => {
  storage.set(key, value, (error) => {
    if (error) throw console.log('Error = ' + error);
  });
};

db.remove = (key) => {
  storage.remove(key, (error) => {
    if (error) {
      console.log('Error = ' + error);
    }
  });
};

db.hasKey = (key, callback) => {
  storage.has('options', (error, has) => {
    if (error) console.log(error);

    callback(has);
  });
};

export default db;
