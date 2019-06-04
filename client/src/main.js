import {subscribe} from "./subscription/subscription";
import {PUBLIC_KEY} from "../public-key";
import {updateLatestNews, updateSubscription} from "./dom/dom";
import {getLatestNews} from "./database/databases";

/** メイン関数 */
window.onload = async () => {
  try {
    const isPublicKeyBlank = PUBLIC_KEY === '';
    if (isPublicKeyBlank) {
      console.error('公開鍵に正しい値をセットしてください。');
      return;
    }

    const hasServiceWorker = 'serviceWorker' in navigator;
    const hasPushManager = 'PushManager' in window;
    if (!hasServiceWorker || !hasPushManager) {
      consoloe.log('このブラウザではPush通知がサポートされていません');
      return;
    }

    const news = await getLatestNews();
    if (news) {
      updateLatestNews(news);
    }

    const serviceWorker = await navigator.serviceWorker.register('sw.js');
    const existingSubscription = await serviceWorker.pushManager.getSubscription();
    if (existingSubscription) {
      updateSubscription(JSON.stringify(existingSubscription));
    }

    document.querySelectorAll('.notification-subscribe').forEach(v => {
      v.addEventListener('click', event => {
        onSubscriptionClick(serviceWorker, PUBLIC_KEY).catch(error => {
          console.error(error);
        })
      });
    });

    document.querySelectorAll('.notification-unsubscribe').forEach(v => {
      v.addEventListener('click', event => {
        onUnsubscriptionClick(serviceWorker).catch(error => {
          console.error(error);
        })
      });
    });
  } catch (e) {
    throw e;
  }
};

/**
 * subscribeがクリックされた際のイベント
 *
 * @param {ServiceWorkerRegistration} serviceWorker サービスワーカー
 * @param {Event} event clickイベント
 * @returns {Promise<void>}
 */
async function onSubscriptionClick(serviceWorker, event) {
  try {
    const existingSubscription = await serviceWorker.pushManager.getSubscription();
    if (existingSubscription) {
      console.log('already subscribe.\r\nif you refresh client-key, please push "unsubscribe" button.');
      return;
    }

    const subscription = await subscribe(serviceWorker, PUBLIC_KEY);
    console.log('success subscribe.');
    updateSubscription(JSON.stringify(subscription));
  } catch (e) {
    throw e;
  }
}

/**
 * unsubscribeがクリックされた際のイベント
 *
 * @param {ServiceWorkerRegistration} serviceWorker サービスワーカー
 * @param {Event} event clickイベント
 * @returns {Promise<void>}
 */
async function onUnsubscriptionClick(serviceWorker, event) {
  try {
    const existingSubscription = await serviceWorker.pushManager.getSubscription();
    if (!existingSubscription) {
      console.log('no subscription');
      return;
    }

    await existingSubscription.unsubscribe();
    updateSubscription('');
    console.log('success unsubscribe.');
  } catch (e) {
    throw e;
  }
}
