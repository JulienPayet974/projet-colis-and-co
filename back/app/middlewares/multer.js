/**
 * Middleware for handling file uploads using multer.
 * @module uploadMiddleware
 */
// Pour gérer les requetes HTTP pour envoi d'images

// import de Multer
const multer = require('multer');

/** MIME types of images */
// Dictionnaire MIME TYPE : types d'extension acceptés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

/** Storage configuration for multer */
// Creates an object that specifies where to save the file and how to name it
// la destination du fichier
const storage = multer.diskStorage({
  // destination
  // The file is saved to the images directory
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // its name is a combination of the original file name, the current date, and its extension
  filename: (req, file, callback) => {
    // Supprimer les espaces dans le nom du fichier
    const name = file.originalname.split(' ').join('_');
    // definir l'extension
    const extension = MIME_TYPES[file.mimetype];
    // renvoie le nom défnitif du fichier en ajoutant la date
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

/** Export the middleware for handling file uploads */
// The single method specifies that this middleware will only handle a single file upload with the name 'image'
module.exports = multer({ storage }).single('image');
