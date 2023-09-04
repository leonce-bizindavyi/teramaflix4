import fs from 'fs-extra';
import formidable from 'formidable';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import executeQuery from '@/Config/db4';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadHandler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    // Parsez la requête
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'upload des vidéos.' });
      }

      // Récupérez les informations des fichiers uploadés
      const videos = Object.values(files);
      // Déplacez chaque fichier uploadé dans le répertoire de destination et enregistrez les informations dans la base de données
      // const videoInfos = await Promise.all(videos.map(moveVideo));
      
      const videoInfos = await Promise.all(videos.map(async (video) => {
        const newPath = await moveVideo(video,fields); 
        return {
          title: video.originalFilename,
          path: newPath
        };
      }));
      
      res.status(200).json({ message: 'Upload réussi !', videos: videoInfos });
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Méthode non autorisée');
  }
}
async function moveVideo(video,fields){
  const oldPath = video.filepath;
  const extension = path.extname(video.originalFilename);
  const newFilename = uuidv4()+extension;
  const newPath = path.join(process.cwd(), './public/Videos', newFilename);
  await fs.ensureDir(path.dirname(newPath));
  await fs.move(oldPath, newPath);
  await insertVideo(video.originalFilename, newFilename, fields); 
  return newPath;
}
async function insertVideo(title, video, fields) {
  const { user } = fields
  try {
    
    // Exécutez la requête SQL pour insérer une vidéo dans la base de données
    const rows = await executeQuery('INSERT INTO posts (uniid,Title,Video,User) VALUES(?,?,?,?)', [uuidv4(), title, video, user]);

 
  } catch (error) {
    console.log(error);
  } 
}