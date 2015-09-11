// RSSの読み取り
// 画面は自分で作りましょう
// require.resolve('http'); // とモジュールを指定すると，ないモジュールを指定するとエラーを吐く
var http = require('http'); // http 用のモジュールを実行

var server = http.createServer(); // Web サーバーの
// イベントハンドラーの実装
server.on('request', function(request, response) {
  // responseオブジェクトに，ステータスコード200でHTTPレスポンスヘッダを出力
  response.writeHead(200);
  // リクエストURLを出力
  response.write('URL:  ' + request.url + '\n');
  // HTTPメソッドを出力
  response.write('Method:  ' + request.method + '\n');
  // HTTPヘッダーを出力
  Object.keys(request.headers).forEach(function (key) {
    response.write(key + ':  ' + request.headers[key] + '\n');
  });
  // レスポンスの終了
  response.end();
});
// ポート番号と，Vagrantファイルで指定したipアドレスを指定
server.listen(8080, '127.0.0.1');

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
	
    // 変換の状況の確認用
    console.log(JSON.stringify(obj));

    var items = obj.rss.channel[0].item;
    for (var i in items) {
      var item = items[i];
      console.log(item);
    }
  })
}
