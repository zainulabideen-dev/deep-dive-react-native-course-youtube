import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'geoSurvey.db', location: 'default'},
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('Error opening database', error);
  },
);

export function createTables() {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Surveys (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT);',
    );
  });
}
export function insertDataInSqliteTable(query, list = []) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        list,
        (tx, results) => {
          console.log('results', results);
          if (results.rowsAffected > 0) {
            console.log('Data inserted successfully');
            resolve({success: true, results});
          } else {
            reject({success: false});
            console.log('Data insert failed');
          }
        },
        error => {
          reject({success: false});
          console.log('SQL Error:', error);
        },
      );
    });
  });
}

export function getDataFromSqlite(query, list = []) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        list,
        (tx, results) => {
          if (results.rows.length > 0) {
            let dataList = [];
            for (let i = 0; i < results.rows.length; i++) {
              dataList.push(results.rows.item(i));
            }
            resolve({success: true, dataList});
          } else {
            reject({success: true, dataList: []});
          }
        },
        error => {
          reject({success: false, dataList: []});
          console.log('SQL Error:', error);
        },
      );
    });
  });
}

export function createNewTable(query) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (tx, results) => {
          console.log('=> createNewTable', results);
          resolve({success: true});
        },
        error => {
          reject({success: false});
          console.log('SQL Error:', error);
        },
      );
    });
  });
}

export function checkMyDb() {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table'`,
      [],
      (tx, results) => {
        console.log(results);
        if (results.rows.length > 0) {
          console.log('Table exists');
          for (let i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i));
          }
        } else {
          console.log('Table does not exist');
        }
      },
      (tx, error) => {
        console.log('Error checking table:', error);
      },
    );
  });
}
