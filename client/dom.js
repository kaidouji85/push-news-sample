/**
 * 最新ニュースの内容を画面に表示する
 *
 * @param {News[]} news 最新ニュース
 */
export function updateLatestNews(news) {
  document.querySelectorAll('.latest-news').forEach(element => {
    element.innerHTML = '';
    news.forEach(v => {
      const node = document.createElement('div');
      node.textContent = `${v.date.toString()} ${v.title}: ${v.summary}`;
      element.appendChild(node);
    });
  })
}

/**
 * サブスクリプションの内容を画面に表示する
 *
 * @param {string} subscription サブスクリプションをJSON文字列にしたもの
 */
export function updateSubscription(subscription) {
  document.querySelectorAll('.subscription-json').forEach(v => {
    v.textContent = subscription;
  });
}
