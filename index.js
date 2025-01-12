const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
dotenv.config();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 5000;
// const port = 5000


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
});

app.use(cors());

const orderRouter = require('./routes/orderRoute');

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self' vercel.com *.vercel.com *.vercel.sh vercel.live *.stripe.com twitter.com *.twitter.com *.github.com *.codesandbox.io https://risk.clearbit.com wss://*.vercel.com localhost:* chrome-extension://*; script-src 'self' 'unsafe-eval' 'unsafe-inline' www.google.com www.google-analytics.com www.googleadservices.com www.gstatic.com *.youtube.com *.youtube-nocookie.com *.ytimg.com *.twimg.com cdn.ampproject.org www.googletagmanager.com *.googleapis.com *.heapanalytics.com heapanalytics.com *.fides-cdn.ethyca.com *.ethyca.com cdn.ethyca.com cdn.vercel-insights.com va.vercel-scripts.com vercel.com *.vercel.com *.vercel.sh vercel.live *.stripe.com twitter.com *.twitter.com *.github.com *.codesandbox.io https://risk.clearbit.com wss://*.vercel.com localhost:* chrome-extension://*; child-src *.youtube.com *.youtube-nocookie.com *.stripe.com www.google.com td.doubleclick.net github.com calendly.com *.vusercontent.net vercel.com *.vercel.com *.vercel.sh vercel.live *.stripe.com twitter.com *.twitter.com *.github.com *.codesandbox.io https://risk.clearbit.com wss://*.vercel.com localhost:* chrome-extension://*; style-src 'self' 'unsafe-inline' *.googleapis.com heapanalytics.com vercel.com *.vercel.com *.vercel.sh vercel.live *.stripe.com twitter.com *.twitter.com *.github.com *.codesandbox .io https://risk.clearbit.com wss://*.vercel.com localhost:* chrome-extension://*; img-src * blob: data:; media-src 'self' videos.ctfassets.net user-images.githubusercontent.com replicate.delivery blob: data: vercel.com *.vercel.com *.vercel.sh vercel.live *.stripe.com twitter.com *.twitter.com *.github.com *.codesandbox.io https://risk.clearbit.com wss://*.vercel.com localhost:* chrome-extension://*; connect-src wss://ws-us3.pusher.com data: *; font-src 'self' *.vercel.com *.gstatic.com vercel.live; worker-src 'self' *.vercel.com blob:");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/orders', orderRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});