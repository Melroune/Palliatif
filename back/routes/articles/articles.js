const express = require("express")
const jwt = require("jsonwebtoken")
const joiRegister = require("../../helpers/joiRegister.js");
const Joi = require("joi")
const jwtSecret = require("../../../jwtSecret")
const con = require("../../helpers/db.js")

const Router = express.Router()

//insert into Categories (name) values ('NOM_DE_LA_CATEGORIES');
//insert into sous_categories (name) values ('NOM_DE_LA_SOUS_CATEGORIES');
//insert into  Categories_souscategories (Categories_idCategories, sous_categories_idsous_categories) values (1,1);
// INSERT INTO articles ( titre, contenu, cible_status, date_create, visible ) VALUES ('corpalif bonjour','contenu contenu contenu contenu contenu contenu contenu contenu contenu contenu contenu contenu ','user','2005-04-8 2:00:00.000','1')

Router.get("/", (req, res, next) => {
  res.send("I am in GET auth YOLO")
})

//cree un JOI pour ça!!
Router.post("/addArticle", (req, res, next) => {
  console.log('REQ BODY: ',req.body)
  const sql = `INSERT INTO articles ( titre, contenu, cible_status, date_create, visible, sous_categories_idsous_categories,users_idusers ) VALUES (?,?,?,?,?,?,?)`;
  const values =[
    req.body.titre,
    req.body.contenu,
    req.body.cible_status,
    req.body.date_create,//generer la date automatiqument au format DateTime
    req.body.visible,
    req.body.sous_categoriesId,
    req.body.users_idusers    
  ]
  con.query(sql, values, (err, result) => {
    if (err) {
      console.log("[mysql error]", err)
      
    }
    console.log("Number of records inserted: " + result.affectedRows)
  })
  // console.log(values)

  return res.status(200).send({ details: "addArticle" });//renvoyer un message pour rediriger ver la page admin article 
})

Router.post("/editArticle", (req, res, next) => {
  console.log(req.body)
  res.status(200).send({ details: "editArticle" })
})
Router.post("/hidenArticle", (req, res, next) => {
  console.log(req.body)
  res.status(200).send({ details: "hidenArticle" })
})
Router.get("/getArticle/:id", (req, res, next) => {
  console.log('getArticle: ', req.params.id)
  const id = Number(req.params.id);
  const statusUsers = 'user'//data a recup du token
  const sql = `SELECT * FROM articles WHERE sous_categories_idsous_categories = '${id}' AND cible_status = '${statusUsers}'`;
  con.query(sql, (err, result) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    console.log("Number of records inserted: " + result)
    res.status(200).send( result )
  });
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