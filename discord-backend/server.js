import express from 'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import mongoData from './mongoData.js';
import Pusher from 'pusher';

//app configruration
const app = express();
const port = process.env.PORT || 8002;

const pusher = new Pusher({
  appId: "2079719",
  key: "29690bd659134b21c0fb",
  secret: "6a0e07dbd10ea958641e",
  cluster: "us2",
  useTLS: true
});

// middlewares
app.use(express.json());  // ✅ correct
app.use(cors());


// db config
const mongoURI = 'mongodb+srv://lzr710459698_db_user:a43KyiifEo2p7n9p@felixl.keauic0.mongodb.net/?appName=FelixL'

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

mongoose.connection.once('open', () => {
    console.log('DB connected');
    const changeStream = mongoose.connection.collection('conversations').watch();

    changeStream.on('change', (change) => {
        console.log('A change occurred:');
        if (change.operationType === 'insert') {
            console.log('Triggering Pusher for new channel');
            pusher.trigger('channels', 'newChannel', {
                'change': change
            });
        } else if (change.operationType === 'update') {
            console.log('Triggering Pusher for new message');
            pusher.trigger('conversation', 'newMessage', {
                'change': change
            });
        } else {
            console.log('Error triggering Pusher');
        }       

});
});

// api routes
app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.post('/new/channel', async (req, res) => {
    try {
        const dbData = req.body;
        const data = await mongoData.create(dbData);  // ✅ promise-based
        res.status(201).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/get/channelList', async (req, res) => {
    try {
        const data = await mongoData.find();  // ✅ promise-based

        const channels = data.map((channelData) => ({
            id: channelData._id,
            name: channelData.channelName,
        }));

        res.status(200).send(channels);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post('/new/message', async (req, res) => {
    try {
        const id = req.query.id;          // channel id from URL
        const newMessage = req.body;      // message object

        // Update the channel document and push new message into conversation array
        const updatedChannel = await mongoData.findByIdAndUpdate(
            id,
            { $push: { conversation: newMessage } },  // 👈 make sure this matches your schema
            { new: true }                             // return updated document
        );

        if (!updatedChannel) {
            return res.status(404).send({ error: 'Channel not found' });
        }

        res.status(201).send(updatedChannel);
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).send(err);
    }
});

app.get('/get/data', async (req, res) => {
    try {
        const data = await mongoData.find();   // ✅ promise-based
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/get/conversation', async (req, res) => {
    try {
        const id = req.query.id;  // channel ID
        const data = await mongoData.findById(id);  // ✅ promise-based (no callback)

        if (!data) {
            return res.status(404).send({ error: "Channel not found" });
        }

        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


// listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
