import {putLatestNews} from "./database/databases";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  new workbox.strategies.NetworkFirst()
);

workbox.precaching.precacheAndRoute([
  '/index.html'
]);

self.addEventListener('push', event => {
  event.waitUntil((async () => {
    try {
      const data = event.data.json();
      const newsList = parseLatestNews(data);
      await putLatestNews(newsList);

      const title = '新しいニュースを受信しました';
      const options = {
        body: 'Yay it works.',
      };
      await self.registration.showNotification(title, options)
    } catch (e) {
      console.error(e);
    }
  })());
});

/**
 * 最新ニュース情報にパースする
 *
 * @param {any} data
 * @returns {null|LatestNews}
 */
function parseLatestNews(data) {
  if (data === null || data === undefined) {
    return null;
  }

  const newsList = parseNewsList(data.news);
  return {
    id: 'LatestNewsId',
    date: new Date(data.date),
    news: newsList ? newsList : [],
  };
}

/**
 * PUSH通知から取得したデータを最新ニュースにパースする
 * パース不可能な場合はnullを返す
 *
 * @param {any} data PUSH通知から受け取ったデータ
 * @returns {null|News[]} 最新ニュース
 */
function parseNewsList(data) {
  if (!Array.isArray(data)) {
    return null;
  }

  return data
    .map(v => parseNews(v))
    .filter(v => v !== null);
}

/**
 * 任意データをニュースにパースする
 *
 * @param {any} data パース元
 * @returns {null|News} ニュース
 */
function parseNews(data) {
  if (data === null || data === undefined) {
    return null;
  }

  return {
    date: new Date(data.date),
    title: String(data.title),
    summary: String(data.summary)
  };
}
