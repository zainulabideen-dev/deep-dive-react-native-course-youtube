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
export function insertDataInSqliteTable(query, list) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        list,
        (tx, results) => {
          console.log('results', results);
          if (results.rowsAffected > 0) {
            console.log('Data inserted successfully');
            resolve({success: true});
          } else {
            resolve({success: false});
            console.log('Data insert failed');
          }
        },
        error => {
          console.log('SQL Error:', error);
        },
      );
    });
  });
}
