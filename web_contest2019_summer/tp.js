'use strict';
// 参考：https://www.sejuku.net/blog/92667

const subject = document.getElementById('subject');
const ans = document.getElementById('ans');
const form = document.forms.typing;
const timer = document.getElementById('timer');
var p = document.getElementById('text');
var des = document.getElementById('des');

let count = 0;    //  正解数のカウント
let missCount = 0;    //  不正解数のカウント
let TIME = 60;    //  制限時間
let state = true;

var textList_Q = [    //  問題集
  '否定の演算子を入力せよ(JS)',
  '論理和の演算子を入力せよ(JS)',
  '論理積の演算子を入力せよ(JS)',
  '論理演算子を用いて表現せよ(JS)：真 または 真',
  '論理演算子を用いて表現せよ(JS)：偽 または 真',
  '論理演算子を用いて表現せよ(JS)：真 かつ 偽',
  '論理演算子を用いて表現せよ(JS)：偽 かつ 偽',
  "配列のA組をConsoleLogに出力せよvar classes = ['A組', 'B組', 'C組', 'D組'];",
  "配列のD組をConsoleLogに出力せよvar classes = ['A組', 'B組', 'C組', 'D組'];",
  'ハードウェアの一覧を表示するLinuxコマンドを入力せよ',
  '現在のディレクトリの表示するLinuxコマンドを入力せよ',
  'ファイル・ディレクトリの一覧の表示するLinuxコマンドを入力せよ',
  '現在のディレクトリの変更するLinuxコマンドを入力せよ',
  'ディレクトリの作成するLinuxコマンドを入力せよ',
  'ファイルやディレクトリの削除するLinuxコマンドを入力せよ',
  'ファイルやディレクトリのコピーするLinuxコマンドを入力せよ',
  'ファイル・ディレクトリの検索するLinuxコマンドを入力せよ',
  'Ubuntuのシャットダウンコマンドを入力せよ',
  'Vagrantのシャットダウンコマンドを入力せよ',
  'catコマンドで「fileA」ファイルの中身を出力せよ',
  'catコマンドで「fileA」ファイルの中身を「fileB」に上書きせよ',
  'catコマンドで「fileA」ファイルの中身を「fileB」に追加せよ',
  'catコマンドで「fileA」「fileB」「fileC」を結合せよ',
  '「fileA」ファイルの内容をページ送りで表示するLinuxコマンドを入力せよ',
  'ファイルや標準入力の中から特定の単語を検索するLinuxコマンドを入力せよ',
  'Vimで開いたファイルを閉じる(編集破棄)コマンドを入力せよ',
  'ファイル作成またはそのファイルやディレクトリの日時を最新にするLinuxコマンドを入力せよ',
  'ファイル権限を変更するLinuxコマンドを入力せよ',
  '第一引数で与えられた変数に、標準入力された文字を代入するLinuxコマンドを入力せよ',
  'パケットの内容を見るためのLinuxコマンドを入力せよ',
  'パケットを発行し、応答時間の調査ができるLinuxコマンドを入力せよ',
  '第一引数に指定された URL にアクセスして、コンテンツを取得する。',
  '1つのコンソールで複数のコンソールを操作したりコンソールの状態を維持したままにすることができる仮想端末ソフトウェアの名前を答えよ',
  'tmuxのデタッチ（離れる）コマンド、？に入るキーを入力せよ。Ctrl + b →　?',
  'tmuxのウィンドウ作成コマンド、？に入るキーを入力せよ。Ctrl + b →　?',
  'tmuxのウィンドウを閉じるコマンド、？に入るキーを入力せよ。Ctrl + b →　?',
  'プログラムを自動実行するスケジュールを設定するLinuxコマンドを入力せよ',
];

var textList_A = [    //  答え
  '!',
  '||',
  '&&',
  'true || true',
  'false || true',
  'true && false',
  'false && false',
  'console.log(classes[0]);',
  'console.log(classes[3]);',
  'lshw',
  'pwd',
  'ls',
  'cd',
  'mkdir',
  'rm',
  'cp',
  'find',
  'exit',
  'vagrant halt',
  'cat fileA',
  'cat fileA > fileB',
  'cat fileA >> fileB',
  'cat fileA fileB fileC',
  'less fileA',
  'grep',
  ':q!',
  'touch',
  'chmod',
  'read',
  'tcpdump',
  'ping',
  'curl',
  'tmux',
  'd',
  'c',
  'x',
  'crontab',
];

description();

function description (){
  subject.style.display="none";
  des.innerHTML = "startと入力してEnterでゲーム開始";
}

form.btn.addEventListener('click', function(e){    //  正解・不正解判定
  if(!state) return;
  if(form.input.value === ans.textContent){    //  正解数カウント
      count++;
    init();
    }else if(form.input.value === "start"){
      subject.textContent = 'スタート！';
      setTimeout(function(){ init() },1000)
    }else{
      subject.textContent = 'ミス！';    //  不正解数カウント
      setTimeout(function(){ init() },1000)
      missCount++;
      if(missCount > 10){    //  10回以上ミスでリロード
      location.reload();
      alert("不正解が10問超えたのでリセットしますね(^^)/");
      }
  }
});

init();

function init() {    //  制限時間・問題・答えの表示
  const rnd = Math.floor(Math.random() * textList_Q.length);
  timer.textContent = '制限時間：' + TIME + '秒';
  subject.textContent = textList_Q[rnd];
  ans.textContent = textList_A[rnd];
  form.input.value = '';
  form.input.focus();
}

const start = document.getElementById('start');

form.onkeydown = (event) => {    //  startと入力しEnter押すとゲーム開始
  if(event.key === "Enter" && form.input.value === "start") {
    start.onclick();
  }
}

const result = document.getElementById('result');
start.onclick = function(){    //  制限時間の減少
  subject.style.display="block";
  des.style.display="none";
  const countdown = setInterval(function(){ // 時間経過
    timer.textContent = '制限時間：' + --TIME + '秒';
    if(TIME <= 0) finish();
  }, 1000);
  function finish(){    //  時間が0になったら終了・成績結果の表示
    clearInterval(countdown);
    subject.innerHTML = '正解は ' + count + '個<br>' + '不正解は ' + missCount + ' 個でした!';
    if(count <= 4){
      result.innerHTML =  'もうすこし頑張りましょう！<br> <img src="img/character_program_shock.png">';
      var resultTweet ="結果：" + "正解数は"+ count + "個！もうすこし頑張りましょう！";
    }else if(count <= 8){
      result.innerHTML = 'よくがんばりました！<br> <img src="img/character_program_smart.png">';
      var resultTweet ="結果：" + "正解数は"+ count + "個！よくがんばりました！";
    }else{
      result.innerHTML = '素晴らしい！完璧！<br> <img src="img/character_program_happy.png">';
      var resultTweet ="結果：" + "正解数は"+ count + "個！素晴らしい！完璧！";
    }
    state = false;
    
    // --------------- ツイートエリアの作成 ---------------
    const tweetDivided = document.getElementById('tweet-area');
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURI('N予備校第１・２章チェックテスト')
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', resultTweet);
    anchor.innerText = 'Tweet #N予備校第１・２章の確認テストの結果';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
    // --------------- ↑ツイートエリアの作成↑ ---------------
  }
};

    // --------------- ↓難易度変更↓ ---------------
const modeEasy = document.getElementById('modeEasy');
modeEasy.onclick = function(){
  ans.classList.add('easy');
};
const modeNomal = document.getElementById('modeNomal');
modeNomal.onclick = function(){
  ans.classList.remove('easy');
};




