const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongodb = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb');
const { Readable } = require('stream');


// Retrieves all audio files in JSON format
router.get('/library', (req, res) => {
    const audio = req.db.collection('audiofile.files');
    audio.find().toArray((error, audiofiles) => {
        if(!audiofiles || audiofiles === 0) {
            res.json({error: 'audio file non-existent'})
        }
        res.json(audiofiles)
    });
});

// Retrieves a single audio file and its information in JSON format
router.get('/track-info/:track_id', (req, res) => {
    try {
        var track_id = new ObjectID(req.params.track_id);
    } catch(err) {
        return res.status(400).json({message: 'id non-existent'})
    }
    const audio = req.db.collection('audiofile.files');
    audio.findOne({ _id: track_id }).then((audiofile) => {
        if(!audiofile || audiofile === 0) {
            res.json({error: 'audio file non-existent'})
        }
        res.json(audiofile)
    })
});

// Retrieves a single track from database in mp3 format
router.get('/stream/:track_id', (req, res) => {
    try { var track_id = new ObjectID(req.params.track_id);
    } catch(err) {
        return res.status(400).json({message: 'id non-existent'})
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    let bucket = new mongodb.GridFSBucket(req.db, {
        bucketName: 'audiofile'
    });

    let downloadStream = bucket.openDownloadStream(track_id);

    downloadStream.on('data', (chunk) => {
        res.write(chunk)
    });

    downloadStream.on('error', () => {
        res.sendStatus(404)
    });

    downloadStream.on('end', () => {
        res.end()
    });
});

// Upload a single track with info to database 
router.post('/upload', (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage, limits: {
        fields: 8,
        fileSize: 6000000,
        files:1,
        parts: 9
    }});

    upload.single('audiofile')(req, res, (err) => {
        if(err) {
            res.status(400).json({ message: "Request has failed"});
        } else if(!req.body.title && !req.body.artist) {
            res.status(400).json({ message: 'Please insert a title and artist of song '})
        }

        let audioFiles = {
            title: req.body.title,
            artist: req.body.artist,
            description: req.body.description,
            album: req.body.album,
            album_cover: req.body.album_cover,
            release_date: req.body.release_date,
            genre: req.body.genre,
            rating: req.body.rating || 0
        }

        const audiofileStream = new Readable();
        audiofileStream.push(req.file.buffer);
        audiofileStream.push(null);

        let bucket = new mongodb.GridFSBucket(req.db, {
            bucketName: 'audiofile'
        });

        let uploadStream = bucket.openUploadStream(audioFiles)
        let id = uploadStream.id

        const { title, artist } = audioFiles;

        audiofileStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            res.status(500).json({message: 'Error uploading file'})
        });

        uploadStream.on('finish', () => {
            res.status(200).json({message:`${title} by: ${artist} has uploaded successful id:${id}`})
        });

});
});


// @Not Completed
// Deletes audio file track in database DOESN'T Delete audio chunks
router.delete('/track-info/:track_id', (req, res) => {
    try {
        var track_id = new ObjectID(req.params.track_id);
    } catch(err) {
        return res.status(400).json({message: 'id non-existent'})
    }
    const audio = req.db.collection('audiofile.files');
    audio.deleteOne({_id :track_id }).then(() => {
        res.json({ message: 'file has been deleted'})
    });
});


module.exports = router;


