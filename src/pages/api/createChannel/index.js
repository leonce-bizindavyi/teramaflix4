import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import * as z from"zod";
import fs from "fs-extra";
import formidable from "formidable";
import path from 'path';
import executeQuery from "@/Config/db4";

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveChannel=z.object({
    pageName:z
    .string()
    .min(3,{
      message:'le nom  doit être supérieur ou égal à 3 caractères'
    })
    .max(15,{
      message:'le nom ne doit pas être supérieur à 15 caractères'
    }),
    descriptio:z
    .string()
    .min(3,{
      message:'la description  doit être supérieur ou égal à 3 caractères'
    })
    .max(500,{
      message:'la description ne doit pas être supérieur à 500 caractères'
    })
})
export default async function handler(req, res) {
    if(req.method==="POST"){
        const secret="N33U8477474473"
        const form= new formidable.IncomingForm();
       // Créez un répertoire "uploads" s'il n'existe pas déjà
        await fs.ensureDir('./public/Thumbnails');
        // Parsez la requête
        form.parse(req, async (err, fields, files) => {
          if (err) {
           return res.status(500).json({err,fields,files, error: "Error parsing form data",message:"Error" });
         }
         const images = [files.image]
         try {
          
           const {descriptio,pageName}=fields
           const verifyChannelFields=saveChannel.parse({pageName,descriptio})
          const movePromises = await Promise.all(images.map( async (image) => {
          const user = await moveImage(image,fields);
          return user
        }));
         
          const user = movePromises[0]
          
          const token = sign(
            {
              exp: 60 * 60 * 24 * 30,
              User:user.ID,
              ID:user.pageId,
              uniid: user.uniid,
              PageName: user.PageName, 
              description:user.Description,
              categorie:user.Categorie,             
              Photo: user.Photo,
              Mail: user.Mail,
              Active: user.Actif,
              Admin: user.Admin,
            },
            secret
          );
          const serialised = serialize('Cookie',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
         //  return serialised 
           res.setHeader('Set-Cookie', serialised);
           res.status(200).json({token,data:user,message: 'Success' })
          } catch (error) {
          res.status(400).json({message:"Error",error})
          }
       
          })
      }
        else {
          res.setHeader('Allow', 'POST');
          res.status(405).end('Méthode non autorisée');
        }
      }
      async function moveImage(image,fields) {
        const oldPath = image.filepath;
        const extension = path.extname(image.originalFilename);
        const newFilename = image.newFilename+extension;
        const newPath = path.join(process.cwd(), './public/Thumbnails', newFilename);
        await fs.ensureDir(path.dirname(newPath));
        await fs.move(oldPath, newPath);
        const user =  await insertImage(newFilename, fields); 
        return user;
      }   
      async function insertImage(photo,fields) {
        try{
          const {pageName,descriptio,category,userId} = fields
          
              // Exécuter la requête SQL pour récupérer les videos
              const result = await executeQuery( `CALL createChannel(?,?,?,?,?,?)`, [uuidv4(),userId,pageName,descriptio,photo,category]);
  
              if(result[0]!=" "){
               const user = result[0];
               return user[0]         
            }             
              else
              res.status(500).json({ error: "Error inserting post into database",message: 'Not inserted' });
        } catch (error) {
          console.log(error);
        }
      }   
   