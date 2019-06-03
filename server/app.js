const VAPID_KEYS = require('./vapid-keys.json');
const webpush = require('web-push');
const {Subscription} = require('./subscription');

/**
 * ブラウザにPUSH通知をする
 *
 * @param {PushSubscription} pushSubscription 通知先ブラウザのサブスクリプション
 * @returns {Promise<void>}
 */
async function pushMessage(pushSubscription) {
  try {
    const payload = [
      {
        date: new Date(),
        title: `ニュース1 ${new Date().toString()}`,
        summary: 'サマリー1',
      },
      {
        date: new Date(),
        title: `ニュース2 ${new Date().toString()}`,
        summary: 'サマリー2',
      },
    ];
    const options = {
      vapidDetails: {
        subject: 'mailto:kaidouji85@gmail.com',
        publicKey: VAPID_KEYS.publicKey,
        privateKey: VAPID_KEYS.privateKey,
      },
      TTL: 60 * 60
    };

    const result = await webpush.sendNotification(pushSubscription, JSON.stringify(payload), options);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

pushMessage(Subscription)
  .catch(e => {
    console.error(e.stack);
  });
