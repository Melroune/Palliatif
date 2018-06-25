const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yolo6789",
  database: "corpalif"
});

con.connect((err) => {
  if (err) throw err
  console.log("Connected!")
})

module.exports = con


// const mysql = require("mysql2/promise");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// // connection database with a promise
// const pendingConnection = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   database: "corpalif",
//   password: "yolo6789",
//   namedPlaceholders: true
// });

// // function to execute query
// const exec = async (query, params) => {
//   const connection = await pendingConnection;
//   console.log("QUERY" + query);
//   console.log("executing", query);
// console.log("-------------------------");

//   const result = await connection.execute(query, params);
//   return result[0];
// };

// const readUsers = () => exec(`SELECT * FROM users`);

// const readUser = params => {
//   console.log("PARAMS " + params);
//   return exec(`SELECT * FROM users WHERE id=?`, [params]);
// };

// const readUserEmail = params => {
//   console.log("PARAMS " + params);
//   return exec(`SELECT * FROM users WHERE email=?`, [params]);
// };

// const createUser = params => {
//     exec(
//       `
// INSERT INTO users ( fristname, lastname, civiliter, statussocial, adresse, codepostal, ville, structure, service, fonction, email, status, tel_fix, tel_port) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
//       ` , [
// params.fristname,
// params.lastname,
// params.civiliter,
// params.statussocial,
// params.adresse,
// params.codepostal,
// params.ville,
// params.structure,
// params.service,
// params.fonction,
// params.email,
// params.status,
// params.tel_fix,
// params.tel_port
//       ]
//     );
//   };

// const updateUser = (params, id) =>
//   bcrypt.hash(params.password, saltRounds).then(hash => {
//     console.log(params);
//     exec(
//       `
//     UPDATE users SET firstName=?, lastName=?, email=?, password=? WHERE id=?`,
//       [params.firstName, params.lastName, params.email, hash, id]
//     );
//   });

// const deleteUser = params => {
//   return exec(`DELETE FROM users WHERE id=?`, [params]);
// };

// // readUser(1)
// //    .then(result => console.log(result))
// //    .catch()

// module.exports = {
//   readUsers,
//   readUser,
//   readUserEmail,
//   createUser,
//   updateUser,
//   deleteUser
// };