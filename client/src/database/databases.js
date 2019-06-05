import Dexie from 'dexie';

/**
 * News
 * @typedef {Object} News
 * @property {Date} date 日付
 * @property {string} title タイトル
 * @property {string} summary サマリー
 *
 * (例)
 * {
 *   title: 'ニュースタイトル',
 *   summary: 'ニュースのサマリがセットされます'
 * }
 */

/**
 * オブジェクトストア「最新ニュース」
 * @typeof {Object} LatestNews
 * @property {Date} date 配信日
 * @property {string} id ユニークID
 * @property {News[]} news 最新ニュースのリスト
 *
 * (例)
 * {
 *   id: 'latestNewsId',
 *   news: [
 *     {
 *       date: '2019-05-01T00:00:00',
 *       title: 'ニュースタイトル',
 *       summary: 'ニュースのサマリがセットされます'
 *     }
 *   ]
 * }
 */

/** Push Newsのデータベース */
const PushNewsDB = new Dexie('PushNews');

/** オブジェクトストア定義 */
PushNewsDB.version(1).stores({
  /** 最新ニュース */
  latest: '++id'
});

/**
 * オブジェクトストア「最新ニュース」に唯一存在するデータのID
 * 本アプリでは、「最新ニュース」には常に1レコードしかデータが存在しないように設計されている
 * そのため、ID値をこのようにハードコーディングしている
 * */
export const LatestNewsID = 'latestNewsId';

/**
 * 最新ニュースを取得する
 *
 * @returns {Promise<null|News[]>}
 */
export async function getLatestNews() {
  try {
    const result = await PushNewsDB.latest
      .where('id')
      .equals(LatestNewsID)
      .toArray();
    if (result.length !== 1) {
      return null;
    }

    // TODO resultのデータ型チェックを追加する
    return result[0].news;
  } catch(e) {
    throw e;
  }
}

/**
 * 最新ニュースを更新する
 *
 * @param {LatestNews} news 最新ニュース
 * @returns {Promise<void>}
 */
export async function putLatestNews(news) {
  try {
    const putItem = {
      ...news,
      id: LatestNewsID,
    };
    await PushNewsDB.latest.put(putItem);
  } catch (e) {
    throw e;
  }
}
