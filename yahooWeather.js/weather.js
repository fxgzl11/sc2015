// RSSの読み取り
// 画面は自分で作りましょう
var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

// 出力するHTMLコードを用意する
var htmlHeader = '<!DOCTYPE html>\
<html lang="ja">\
<head>\
  <meta charset="utf-8">\
  <title>天気予報</title>\
  <link rel="stylesheet" type="text/css" href="./style.css">\
</head>\
<body>\
<div class="content">\
<h1>tenki yohou</h1>';


var htmlFooter = '</div></body></html>';

// 「<」や「>」、「&」といった文字列をエンティティに変換する
function escapeHtmlSpecialChar(html) {
  if (html === undefined) {
    return '';
  } else {
    html = html.replace(/&/g, '&amp;');
    html = html.replace(/</g, '&lt;');
    html = html.replace(/>/g, '&gt;');
    return html;
  }
};

// http.Serverオブジェクトを作成する
var server = http.createServer(onRequest);

// requestイベントハンドラを定義する
function onRequest(request, response) {
  // リクエストされたパスが「/」以外の場合、404エラーを返す
  if (request.url != '/') {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Error 404: Not Found.');
    return;
  }

  // POST以外のリクエストの場合、メインフォームを送信する
  if (request.method != 'POST') {
    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    response.write(htmlHeader);
    response.write(htmlFooter);
    response.end();
    return;
  }

// Yahoo!Japan 天気予報 RSS
var RSS = "http://rss.weather.yahoo.co.jp/rss/days/6110.xml";

// モジュールの取り込み
var parseString = require('xml2js').parseString;
var request = require('request');

// RSSダウンロード
request(RSS, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    analyzeRSS(body);
  }
});

function analyzeRSS(xml) {
  // XMLをJSのオブジェクトに変換
  parseString (xml, function (err, obj) {
    if (err) {
      console.log(err);
      return 0;
    }
    // 天気の表示
    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    response.write(htmlHeader);
    response.write(parseString);
    response.write(htmlFooter);
    response.end();
    // 変換の状況の確認用
    console.log(JSON.stringGIFy(obj));

    var items = obj.rss.channel[0].item;
    for (var i in items) {
      var item = items[i];
      console.log(item);
    }
  })
}


// 待ち受けするポートとアドレスを指定
var PORT = 8080;
var ADDRESS = '127.0.0.1';

// 指定したポートで待ち受けを開始する
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');


