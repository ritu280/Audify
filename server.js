const express = require('express');
const multer = require('multer');
const ffmpeg = require('ffmpeg');

const app = express();

// Set up Multer for file upload
const upload = multer({
  dest: 'upload/' // This specifies the directory where uploaded files will be stored
});

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  
  // Perform any necessary processing or validation on the uploaded file
  
  res.status(200).json({ message: 'File uploaded successfully.' });
});

// Route for file conversion
app.get('/convert', (req, res) => {
  // Perform the conversion logic using FFmpeg library
  // Replace this with your actual conversion code
  
  try {
    const process = new ffmpeg('/upload');
    process.then((video) => {
      video
        .setAudioCodec('libmp3lame')
        .save('/upload', (error, file) => {
          if (!error) {
            console.log('Audio file converted successfully.');
            res.sendFile(file);
          } else {
            console.log('Error converting audio file:', error);
            res.status(500).send('Error converting audio file.');
          }
        });
    }, (error) => {
      console.log('Error opening input video:', error);
      res.status(500).send('Error opening input video.');
    });
  } catch (error) {
    console.log('FFmpeg error:', error);
    res.status(500).send('FFmpeg error.');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 3000.');
});
