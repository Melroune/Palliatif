const express = require("express")
const jwt = require("jsonwebtoken")
const joiRegister = require("../../helpers/joiRegister.js");
const Joi = require("joi")
const jwtSecret = require("../../../jwtSecret")
const con = require("../../helpers/db.js")

const Router = express.Router()


const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}


Router.get("/", (req, res, next) => {
  res.send("I am in GET auth YOLO")
})

Router.post("/signup", (req, res, next) => {
  console.log(req.body)
  if (req.body.username === "coco" && req.body.password === "channel" ) { 
    // res.send("I am in POST signup")
        user = { username: req.body.username }
         const tokenUserinfo = { username: user.username, status: 'PouletMaster' }//status: recup via la bdd
         const token = jwt.sign(tokenUserinfo, jwtSecret)
         res.header("Access-Control-Expose-Headers", "x-access-token")
         res.set("x-access-token", token)
         res.status(200).send({ details: "user connected", user })
  }
})

Router.post("/Register",  (req, res, next) => {
  console.log(req.body)
  console.log("Register")
  const {error} = Joi.validate(req.body, joiRegister,{ abortEarly: false })
  // const result = joiValidate.validate({ ...req.body })
  // console.log("validate: ", )
  // console.log("ERROR result:", result.error.data)
  if(error !== null){
    const resultError = error.details.map( value => {if(value.path) {return value.path}})
    console.log('yolo:', resultError)
    return res.status(200).send({ err: resultError})  
  }
  // const sql = `INSERT INTO users ( fristname, lastname, civiliter, statussocial, adresse, codepostal, ville, structure, service, fonction, email, password, status, fgpasword, tel_fix, tel_port) VALUES ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?`
  // const sql = `INSERT INTO users ( fristname, lastname, civiliter, statussocial, adresse, codepostal, ville, structure, service, fonction, email, status, tel_fix, tel_port) VALUES ('fristname','lastname','m','statusSocial','194 rue marc','75018','paris','structure','service','fonction','email@gmail.com','admin','0','0')`
   const sql = `INSERT INTO users ( fristname, lastname, civiliter, adresse, codepostal, ville, structure, service, fonction, email,  tel_fix, tel_port, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`

console.log('REQ BODY :' , req.body)
   
 console.log('-------------------------')

const fristname = req.body.fristname
const lastname = req.body.lastname
const civiliter = req.body.civilite
const adresse = req.body.Adresse
const codepostal = req.body.codePostal
const ville = req.body.ville
const structure = req.body.structure
const service = req.body.service
const fonction = req.body.fonction
const email = req.body.email
const tel_fix = req.body.telFix
const tel_port = req.body.telMob
const status = 'user'

const values = [
  fristname,
  lastname,
  civiliter,
  adresse,
  codepostal,
  ville,
  structure,
  service,
  fonction,
  email,
  tel_fix,
  tel_port,
  status,
]
console.log('SQL VALUES: ',values)
console.log('-------------------------------')


    // con.createUser(req.body)
      con.query(sql, values, (err, result) => {
      if (err) {
        console.log("[mysql error]", err)
      }
      console.log("Number of records inserted: " + result.affectedRows)
    })
  return res.status(200).send({ mess: "DONNER AJOUTER EN BDD" })
})

Router.post("/protected", (req, res, next) => {
  const token = getToken(req)
  const objectTests = { //data appeler par la bdd 
  test: 'ok',
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(err) {
      console.log(err)
     return res.status(200).send({mess: 'na pas acces au donnes'})
    }
    console.log('decode',decoded)
    return res.status(200).send({mess: 'Donne du user', objectTests })
  })
})


module.exports = Router 