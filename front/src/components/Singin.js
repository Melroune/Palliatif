import React from 'react'
import axios from "axios"
import Button from './Button'

const registerPost = e => { 
  e.preventDefault()  
  console.log(e.target) 
  console.log(e.target.lastname.value); 
  console.log(e.target.fristname.value);  
  console.log("register") 
  axios
    .post("http://localhost:3030/auth/Register", {
      email: e.target.email.value,
      civilite: e.target.civilite.value,
      fristname: e.target.fristname.value,
      lastname: e.target.lastname.value,
      Adresse: e.target.Adresse.value,
      codePostal: e.target.codePostal.value,
      ville: e.target.ville.value,
      telFix: e.target.telFix.value,
      telMob: e.target.telMob.value,
      structure: e.target.structure.value,
      service: e.target.service.value,
      fonction: e.target.fonction.value
    })
    .then(res => {
      if (res.data.err) {
        console.log("err", res.data.err);
        if (res.data.err[0] == "civilite") {
          console.log("err sur le chant civilite");
        }
        console.log("err formuailre");
      }
      console.log(res);
    });
}

const register = () => {
  return <form onSubmit={registerPost}>
      <input type="email" name="email" placeholder="email" value="email@mail.com" />
      <input type="text" name="civilite" placeholder="civilite" value='m' />
      <input type="text" name="fristname" placeholder="fristname" value="fristname" />
      <input type="text" name="lastname" placeholder="lastname" value="lastname" />
      <input type="text" name="Adresse" placeholder="Adresse" value="Adresse" />
      <input type="text" name="codePostal" placeholder="codePostal" value="75018" />
      <input type="text" name="ville" placeholder="ville" value="paris" />
      <input type="text" name="telFix" placeholder="telFix" value="0" />
      <input type="text" name="telMob" placeholder="telMob" value="0" />
      <input type="text" name="structure" placeholder="structure" value="structure" />
      <input type="text" name="service" placeholder="service" value="service" />
      <input type="text" name="fonction" placeholder="fonction" value="fonction" />
      <Button type="submit">register</Button>
    </form>;
}

export default register