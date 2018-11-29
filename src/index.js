import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3535;

async function getData() {
  const pollData = await fetch('http://us-central1-kini-cloud-widget.cloudfunctions.net/widget/poll/analysis')
    .then(results => results.json())
    .catch(e => console.log('cannot fetch: ', e));

  const dataCount = pollData.data.length;
  const dataArr = pollData.data;
  pollData.data_count = dataCount;

  dataArr.forEach((e) => {
    const { total_likes, total_dislikes } = e;
    const sum_total = total_likes + total_dislikes;
    e.sum_total = sum_total;
  });

  return pollData;
}

async function sortByWid() {
  const pollData = await fetch('http://us-central1-kini-cloud-widget.cloudfunctions.net/widget/poll/analysis')
    .then(results => results.json())
    .catch(e => console.log('cannot fetch: ', e));

  const dataArr = pollData.data;
  const newData = dataArr.sort((a, b) => {
    console.log('a: ', a);
    console.log('b: ', b);
    return a.wid.replace('mkw-', '') - b.wid.replace('mkw-', '');
  });

  return newData;
}

async function sortBySumTotal() {
  const pollData = await fetch('http://us-central1-kini-cloud-widget.cloudfunctions.net/widget/poll/analysis')
    .then(results => results.json())
    .catch(e => console.log('cannot fetch: ', e));

  const dataArr = pollData.data;
  dataArr.forEach((e) => {
    const { total_likes, total_dislikes } = e;
    const sum_total = total_likes + total_dislikes;
    e.sum_total = sum_total;
  });

  const newData = dataArr.sort((a, b) => {
    console.log('a: ', a);
    console.log('b: ', b);
    return a.sum_total - b.sum_total;
  });

  return newData;
}

async function sortByTotalLikes() {
  const pollData = await fetch('http://us-central1-kini-cloud-widget.cloudfunctions.net/widget/poll/analysis')
    .then(results => results.json())
    .catch(e => console.log('cannot fetch: ', e));

  const dataArr = pollData.data;
  const newData = dataArr.sort((a, b) => {
    console.log('a: ', a);
    console.log('b: ', b);
    return a.total_likes - b.total_likes;
  });

  return newData;
}

async function sortByTotalDislikes() {
  const pollData = await fetch('http://us-central1-kini-cloud-widget.cloudfunctions.net/widget/poll/analysis')
    .then(results => results.json())
    .catch(e => console.log('cannot fetch: ', e));

  const dataArr = pollData.data;
  const newData = dataArr.sort((a, b) => {
    console.log('a: ', a);
    console.log('b: ', b);
    return a.total_dislikes - b.total_dislikes;
  });

  return newData;
}

const data = getData().then(d => d).catch(e => console.log(e));
const sortedByIdData = sortByWid().then(d => d).catch(e => console.log(e));
const sortBySumTotalData = sortBySumTotal().then(d => d).catch(e => console.log(e));
const sortByTotalData = sortByTotalLikes().then(d => d).catch(e => console.log(e));
const sortByTotalDislikesData = sortByTotalDislikes().then(d => d).catch(e => console.log(e));

app.get('/', async (req, res) => {
  const returnData = await data;
  res.status(200).json({
    data: returnData,
  });
}).listen(port, () => {
  console.log('Welcome');
});

app.get('/sort/wid', async (req, res) => {
  const returnData = await sortedByIdData;
  res.status(200).json({
    data: returnData,
  });
});


app.get('/sort/sum_total', async (req, res) => {
  const returnData = await sortBySumTotalData;
  res.status(200).json({
    data: returnData,
  });
});

app.get('/sort/total_likes', async (req, res) => {
  const returnData = await sortByTotalData;
  res.status(200).json({
    data: returnData,
  });
});

app.get('/sort/total_dislikes', async (req, res) => {
  const returnData = await sortByTotalDislikesData;
  res.status(200).json({
    data: returnData,
  });
});
