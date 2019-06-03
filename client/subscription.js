/**
 * PUSH通知を購読する
 *
 * @param {ServiceWorkerRegistration} serviceWorker サービスワーカー
 * @param {String} publicKey 公開鍵
 * @returns {Promise<PushSubscription>} サブスクリプション
 */
export async function subscribe(serviceWorker, publicKey) {
  try {
    const applicationServerKey = urlB64ToUint8Array(publicKey);
    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    });

    return subscription;
  } catch (e) {
    throw e;
  }
}

/**
 * 公開鍵からPush通知サーバーキーを生成する
 *
 * @param {string} base64String 公開鍵
 * @returns {Uint8Array} サーバーキー
 */
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
