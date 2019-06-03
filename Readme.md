# PWAニュースアプリサンプル

## はじめに
日〇PWA、ス〇ートニュースのようなPWAのサンプルです。

## 使い方

準備(git clone直後に1回だけ実行する)
```
############################################
# 通知サーバの初期化
############################################
cd server
npm install
npm run generate-keys

############################################
# クライアントの初期化
############################################
cd ../client
npm install
cp public-key-template.js public-key.js
# PUBLIC_KEYにserver/vapid-keys.jsonのpublicKeyをセットする
vi public-key.js

############################################
# サブスクリプション登録
############################################
npm start
# Webブラウザでlocalhost:8080を開く
# subscribeボタンをクリックする
# 通知の許可を求めらたら、「許可する」に設定
# 画面にsubscriptionが表示される

############################################
# サブスクリプションをPushサーバに保存する
############################################
cd ../server
cp subscription-template.js subscription.js
# module.exports.Subscriptionにブラウザに表示されたsubscriptionをセットする
vi subscription.js
```

Push通知
```
cd server
npm start

# 画面にPush通知が表示される
# 次に開いた時に、ニュース内容が最新になっている
```
