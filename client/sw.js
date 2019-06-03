importScripts('dexie.js', 'databases.js');

self.addEventListener('push', event => {
  event.waitUntil((async () => {
    try {
      console.log('[Service Worker] Push Received.');
      console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
      const data = event.data.json();
      const newsList = parseNewsList(data);
      await putLatestNews(newsList);

      const title = 'Push Codelab';
      const options = {
        body: 'Yay it works.',
      };
      await self.registration.showNotification(title, options)
    } catch(e) {
      console.error(e);
    }
  })());
});

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
