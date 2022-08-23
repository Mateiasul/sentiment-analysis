

const axios = require('axios');
const oauth = require('axios-oauth-client');
const MonkeyLearn = require('monkeylearn')
require('dotenv').config();
const {Client} = require('twitter-api-sdk');

const twitterApiKey = process.env.TWITTER_API_KEY;
const twitterApiSecret = process.env.TWITTER_API_SECRET;
const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
const sentimentAnalysisKey = process.env.MONKEYLEARN_API_KEY;
const twitterClient = new Client(twitterBearerToken);

const twitterUrl = 'https://api.twitter.com/2/tweets?ids=1228393702244134912&tweet.fields=created_at&expansions=author_id&user.fields=created_at';


const getTweets = async () => {
  try {
    const tweetsArray = ["1550034957803954176"]
    const tweet = await twitterClient.tweets.findTweetById("1550034957803954176");
    return tweet.data.text;
    console.log(tweet);
  } catch (error) {
    console.log(error)
  }
}

const classifyTweetSentiment = async (text) => {
    const MonkeyLearn = require('monkeylearn')
    const ml = new MonkeyLearn(sentimentAnalysisKey)
    let model_id = 'cl_pi3C7JiL'
    let data = [text]
    const result = ml.classifiers.classify(model_id, data).then(value => {
      return value.body;
    });
    return result;
  }


const mainFunction = async () => {
  const breeds = await getTweets()
  const sen1ti = await classifyTweetSentiment(breeds);

  console.log(sen1ti[0]);

}

mainFunction()


