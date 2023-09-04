import bcrypt from 'bcryptjs/dist/bcrypt';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import * as z from 'zod';
import executeQuery from "@/Config/db4";

const loginValidator=z.object({
  mail:z
  .string()
  .email({
    message:'saisissez un email valide'
  }),
  password:z
  .string()
  .min(7,{
    message:'le mot de passe doit être supérieur ou égal à 7 caractères'
  })
  .max(15,{
    message:'le mot de passe ne doit pas être supérieur à 15 caractères'
  })
 })

export default async function handler(req, res) {
  try {
    const secret="N33U8477474473"
    const [mail,password] = req.query.loginInfos
    const validatedData = loginValidator.parse({mail,password});   
    const [results] = await executeQuery('CALL login(?)',[mail])
  // Vérifier les informations d'identification de l'utilisateur
  if (results.length === 0) {
    return res.status(404).json({ message: 'Email introuvable' });
  }
  const isMatch=await bcrypt.compare(password,results[0].Password)
   if(!isMatch){
    return res.status(404).json({ message: 'Password incorrect' });
   }
   const active=results[0].Actif
   if(active===0)
   return res.status(404).json({ message: 'Le compte n\'est pas Activé verifier dans ta boîte d\'Email le message qu\'on vous a envoyé pour l\'activer' });
   
          // Générer un jeton JWT pour l'utilisateur
          const user=results[0];
          const token = sign(
            {
              exp: 60 * 60 * 24 * 30,
              User:user.ID,
              ID: user.Page,
              uniid: user.uniid,
              PageName: user.PageName,
              description: user.Description,
              Photo: user.Photo,
              Mail: user.Mail,
              Active: user.Actif,
              Admin: user.Admin,
              Cover: user.Cover,
              Categorie: user.Categorie
            },
            secret
          );
          const serialised = serialize('Cookie', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
          res.setHeader('Set-Cookie', serialised);
          res.status(201).json({token, message: 'Success' });
  }catch(error){
    res.status(401).json({error,message:'validationError'});
  }

  
  
}