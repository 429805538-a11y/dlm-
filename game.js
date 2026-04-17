<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>宠物对战 - 全员互通版</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:Arial,"Microsoft YaHei",sans-serif}
body{background:#1a1a2e;color:#fff;font-size:16px;line-height:1.4}
.page{display:none;padding:15px}
.page.active{display:block}
.btn{display:inline-block;padding:12px 16px;background:#4ecdc4;color:#fff;border:none;border-radius:8px;margin:5px;text-align:center;font-weight:bold;cursor:pointer}
.btn-primary{background:#4ecdc4}
.btn-secondary{background:#666}
.btn-danger{background:#ff6b6b}
.icon{font-size:1.2em;margin-right:5px}
.resource-bar{position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,0.8);display:flex;justify-content:space-around;padding:10px 0;z-index:10}
.resource-item{display:flex;align-items:center}
.camp-option{padding:15px;border:2px solid #666;border-radius:10px;margin:10px;text-align:center;cursor:pointer}
.camp-option.selected{border-color:#ffd700;background:rgba(255,215,0,0.1)}
.avatar-option{display:inline-block;width:50px;height:50px;line-height:50px;text-align:center;border:2px solid #666;border-radius:8px;margin:5px;font-size:24px;cursor:pointer}
.avatar-option.selected{border-color:#ffd700;background:rgba(255,215,0,0.1)}
.pokemon-card{background:rgba(0,0,0,0.3);border-radius:12px;padding:15px;margin:8px;text-align:center}
.pokemon-card .emoji{font-size:3em;margin-bottom:10px}
.pokemon-card .name{font-weight:bold;margin-bottom:5px}
.pokemon-card .price{position:absolute;background:#ffd700;color:#000;padding:3px 8px;border-radius:10px;font-size:0.8em;font-weight:bold}
.stat-box{background:rgba(0,0,0,0.3);padding:10px;border-radius:8px;text-align:center}
.hp-bar{height:12px;background:#333;border-radius:6px;overflow:hidden;margin:5px 0}
.hp-fill{height:100%;text-align:center;font-size:0.8em;line-height:12px;color:#000;font-weight:bold}
.hp-fill.high{background:#5cb85c}
.hp-fill.medium{background:#f0ad4e}
.hp-fill.low{background:#d9534f}
.move-btn{padding:10px;margin:5px;border-radius:8px;border:none;color:#fff;font-weight:bold}
.move-attack{background:#ff6b6b}
.move-support{background:#4ecdc4}
.battle-log{height:120px;overflow-y:auto;background:rgba(0,0,0,0.3);border-radius:8px;padding:10px;margin:10px 0;font-size:0.9em}
.battle-log .entry{margin-bottom:5px}
.battle-log .damage{color:#ff6b65;font-weight:bold}
.modal{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:none;align-items:center;justify-content:center;padding:20px}
.modal.active{display:flex}
.modal-content{background:#1a1a2e;border-radius:12px;padding:25px;width:100%;max-width:400px;text-align:center}
.modal-content .emoji{font-size:5em;margin-bottom:20px}
.reward-item{display:inline-block;margin:5px;padding:5px 10px;background:rgba(255,215,0,0.1);border:1px solid #ffd700;border-radius:20px}
#teamSelectBox{margin:15px 0}
select{padding:10px;border-radius:8px;background:#222;color:#fff;border:1px solid #666;width:100%}
input{padding:10px;border-radius:8px;background:#222;color:#fff;border:1px solid #666;width:100%;margin:5px 0}
</style>
</head>
<body>

<div class="page active" id="loginPage">
  <h1>创建角色</h1>
  <div style="margin:20px 0">
    <label>你的名字</label>
    <input id="playerName" placeholder="输入名字">
  </div>
  <div style="margin:20px 0">
    <label>选择阵营</label>
    <div class="camp-option service" onclick="selectCamp('service')">🔴 服务方</div>
    <div class="camp-option new" onclick="selectCamp('new')">🔵 新开方</div>
  </div>
  <div id="teamSelectBox" style="display:none">
    <label>选择队伍</label>
    <select id="teamSelect"></select>
  </div>
  <div style="margin:20px 0">
    <label>选择头像</label>
    <div>
      <div class="avatar-option" onclick="selectAvatar(this,'😀')">😀</div>
      <div class="avatar-option" onclick="selectAvatar(this,'🙂')">🙂</div>
      <div class="avatar-option" onclick="selectAvatar(this,'😎')">😎</div>
      <div class="avatar-option" onclick="selectAvatar(this,'🤩')">🤩</div>
      <div class="avatar-option" onclick="selectAvatar(this,'😜')">😜</div>
    </div>
  </div>
  <button class="btn btn-primary" onclick="createPlayer()">开始游戏</button>
</div>

<div class="page" id="mainMenu">
  <h1>主界面</h1>
  <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:12px;margin:15px 0">
    <div id="menuAvatar" style="font-size:2em;margin-bottom:10px"></div>
    <div id="menuName" style="font-weight:bold;font-size:1.2em"></div>
    <div id="menuCamp" style="color:#aaa;margin-top:5px"></div>
  </div>
  <button class="btn btn-primary" onclick="showShop()">🛒 宠物商店</button>
  <button class="btn btn-primary" onclick="showMyPokemons()">🐾 我的宠物</button>
  <button class="btn btn-primary" onclick="submitData()">📊 每日提交</button>
  <button class="btn btn-primary" onclick="startPersonalBattle()">⚔️ 个人PK</button>
  <button class="btn btn-primary" onclick="startTeamBattle()">🛡️ 团队战</button>
  <button class="btn btn-primary" onclick="showRanking()">🏆 排行榜</button>
  <button class="btn btn-secondary" onclick="showSettings()">⚙️ 设置</button>
</div>

<div class="page" id="shopPage">
  <h1>宠物商店</h1>
  <div id="shopList" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px"></div>
  <button class="btn btn-secondary" onclick="showPage('mainMenu')">返回</button>
</div>

<div class="page" id="pokemonPage">
  <h1>我的宠物</h1>
  <div id="myPokemonList" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px"></div>
  <button class="btn btn-secondary" onclick="showPage('mainMenu')">返回</button>
</div>

<div class="page" id="pokemonDetailPage">
  <h1>宠物详情</h1>
  <div id="pokemonDetailContent"></div>
  <button class="btn btn-secondary" onclick="showMyPokemons()">返回</button>
</div>

<div class="page" id="battleSelectPage">
  <h1>选择对手</h1>
  <div id="battleSelectContent"></div>
  <button class="btn btn-secondary" onclick="showPage('mainMenu')">返回</button>
</div>

<div class="page" id="battlePage">
  <h1>战斗中</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;text-align:center">
    <div>
      <div id="playerEmoji" style="font-size:4em"></div>
      <div id="playerName"></div>
      <div class="hp-bar"><div id="playerHpBar" class="hp-fill high"></div></div>
    </div>
    <div>
      <div id="enemyEmoji" style="font-size:4em"></div>
      <div id="enemyName"></div>
      <div class="hp-bar"><div id="enemyHpBar" class="hp-fill high"></div></div>
    </div>
  </div>
  <div id="movesGrid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:20px 0"></div>
  <div class="battle-log" id="battleLog"></div>
  <button class="btn btn-secondary" onclick="showPage('mainMenu')">逃跑</button>
</div>

<div class="page" id="rankingPage">
  <h1>排行榜</h1>
  <div id="rankingList"></div>
  <button class="btn btn-secondary" onclick="showPage('mainMenu')">返回</button>
</div>

<div class="page" id="settingsPage">
  <h1>设置</h1>
  <div style="margin:20px 0">
    <div>房间码：<span id="settingsRoomCode"></span></div>
    <button class="btn" onclick="changeRoom()">切换房间</button>
  </div>
  <div style="margin:20px 0">
    <label>分享链接</label>
    <input id="shareLinkArea" readonly>
    <button class="btn" onclick="copyShareLink()">复制链接</button>
  </div>
  <button class="btn btn-danger" onclick="resetGame()">重置游戏</button>
  <button class="btn btn-secondary" onclick="showPage('mainMenu')">返回</button>
</div>

<div class="modal" id="resultModal">
  <div class="modal-content">
    <div id="resultEmoji"></div>
    <h2 id="resultTitle"></h2>
    <p id="resultMessage"></p>
    <div id="resultRewards" style="margin:20px 0"></div>
    <button class="btn btn-primary" onclick="closeModal()">确定</button>
  </div>
</div>

<div id="resourceBar" class="resource-bar" style="display:none">
  <div class="resource-item"><span class="icon">🪙</span><span id="gold">0</span></div>
  <div class="resource-item"><span class="icon">💎</span><span id="crystal">0</span></div>
  <div class="resource-item"><span class="icon">⚡</span><span id="energy">0</span></div>
  <div class="resource-item"><span class="icon">✨</span><span id="essence">0</span></div>
</div>

<script>
// 游戏数据
const gameData = {
    player: null,
    resources: { gold: 500, crystal: 0, energy: 0, essence: 0 },
    myPokemons: [],
    selectedCamp: null,
    selectedAvatar: '🙂',
    currentBattle: null,
    lastDataSubmit: null,
    roomCode: null,
    selectedPokemon: null,
    score: 0,
    personalBattleCount: {},
    teamBattleCount: {},
    battleWins: 0,
    teamBattleWins: 0
};

// 宠物数据库
const pokemonDB = [
    { id:1,name:'小火狐',emoji:'🦊',type:'attack',camp:null,hp:90,attack:65,defense:40,speed:60,price:50,priceType:'gold',moves:[{name:'火花',power:40,pp:25},{name:'抓击',power:35,pp:35},{name:'嚎叫',power:0,pp:40},{name:'蓄能',power:0,pp:20}] },
    { id:2,name:'小水獭',emoji:'🦦',type:'defense',camp:null,hp:110,attack:45,defense:65,speed:40,price:50,priceType:'gold',moves:[{name:'水枪',power:40,pp:25},{name:'撞击',power:35,pp:35},{name:'缩壳',power:0,pp:20},{name:'治愈',power:0,pp:10}] },
    { id:3,name:'小草蛇',emoji:'🐍',type:'support',camp:null,hp:100,attack:50,defense:55,speed:50,price:50,priceType:'gold',moves:[{name:'藤鞭',power:45,pp:25},{name:'撞击',power:35,pp:35},{name:'生长',power:0,pp:20},{name:'光合作用',power:0,pp:5}] },
    { id:4,name:'小雷鼠',emoji:'🐭',type:'attack',camp:null,hp:85,attack:60,defense:35,speed:75,price:60,priceType:'gold',moves:[{name:'电击',power:45,pp:20},{name:'啃咬',power:35,pp:30},{name:'充电',power:0,pp:15},{name:'闪电',power:0,pp:10}] },
    { id:5,name:'小岩龟',emoji:'🐢',type:'defense',camp:null,hp:120,attack:40,defense:70,speed:30,price:60,priceType:'gold',moves:[{name:'岩石投掷',power:40,pp:25},{name:'撞击',power:30,pp:35},{name:'硬化',power:0,pp:20},{name:'护盾',power:0,pp:10}] },
    { id:6,name:'小风雀',emoji:'🐦',type:'support',camp:null,hp:80,attack:45,defense:40,speed:70,price:60,priceType:'gold',moves:[{name:'风刃',power:40,pp:25},{name:'啄击',power:35,pp:30},{name:'顺风',power:0,pp:15},{name:'治愈之风',power:0,pp:10}] },
    { id:7,name:'小冰熊',emoji:'🐻‍❄️',type:'defense',camp:null,hp:115,attack:50,defense:60,speed:35,price:70,priceType:'gold',moves:[{name:'冰冻拳',power:45,pp:20},{name:'撞击',power:35,pp:35},{name:'冰冻',power:0,pp:15},{name:'冬眠',power:0,pp:5}] },
    { id:8,name:'小火龙',emoji:'🐲',type:'attack',camp:null,hp:95,attack:70,defense:45,speed:55,price:70,priceType:'gold',moves:[{name:'火焰',power:50,pp:20},{name:'爪击',power:40,pp:30},{name:'怒吼',power:0,pp:15},{name:'蓄力',power:0,pp:10}] },
    { id:9,name:'小光鹿',emoji:'🦌',type:'support',camp:null,hp:90,attack:45,defense:50,speed:60,price:80,priceType:'gold',moves:[{name:'光之角',power:45,pp:20},{name:'撞击',power:35,pp:35},{name:'闪光',power:0,pp:15},{name:'治愈之光',power:0,pp:10}] },
    { id:10,name:'小影猫',emoji:'🐱',type:'attack',camp:null,hp:88,attack:68,defense:38,speed:72,price:80,priceType:'gold',moves:[{name:'暗影爪',power:50,pp:20},{name:'撕咬',power:40,pp:30},{name:'潜行',power:0,pp:15},{name:'突袭',power:0,pp:10}] },
    { id:11,name:'业绩战狼',emoji:'🐺',type:'attack',camp:'service',hp:100,attack:80,defense:50,speed:70,price:15,priceType:'crystal',moves:[{name:'业绩冲刺',power:55,pp:20},{name:'客户撕咬',power:45,pp:25},{name:'业绩咆哮',power:0,pp:15},{name:'狼群战术',power:0,pp:10}] },
    { id:12,name:'客户猎鹰',emoji:'🦅',type:'attack',camp:'service',hp:90,attack:75,defense:45,speed:85,price:15,priceType:'crystal',moves:[{name:'猎鹰俯冲',power:50,pp:20},{name:'利爪',power:40,pp:25},{name:'鹰眼',power:0,pp:15},{name:'风速',power:0,pp:10}] },
    { id:13,name:'服务狮王',emoji:'🦁',type:'attack',camp:'service',hp:105,attack:85,defense:55,speed:65,price:20,priceType:'crystal',moves:[{name:'狮吼',power:60,pp:15},{name:'撕咬',power:50,pp:25},{name:'王者威压',power:0,pp:10},{name:'守护',power:0,pp:10}] },
    { id:14,name:'业绩猛虎',emoji:'🐯',type:'attack',camp:'service',hp:100,attack:82,defense:48,speed:75,price:20,priceType:'crystal',moves:[{name:'虎啸',power:55,pp:20},{name:'猛扑',power:50,pp:20},{name:'威吓',power:0,pp:15},{name:'蓄势',power:0,pp:10}] },
    { id:15,name:'客户神鹿',emoji:'🦌',type:'support',camp:'service',hp:95,attack:55,defense:60,speed:70,price:18,priceType:'crystal',moves:[{name:'圣光角',power:50,pp:20},{name:'治愈',power:0,pp:10},{name:'祝福',power:0,pp:15},{name:'守护光环',power:0,pp:10}] },
    { id:16,name:'新开凤凰',emoji:'🔥',type:'special',camp:'new',hp:105,attack:70,defense:55,speed:65,price:15,priceType:'essence',moves:[{name:'新开火焰',power:55,pp:20},{name:'凤凰冲击',power:45,pp:25},{name:'重生',power:0,pp:5},{name:'火羽',power:35,pp:30}] },
    { id:17,name:'二开巨龙',emoji:'🐉',type:'defense',camp:'new',hp:125,attack:65,defense:75,speed:50,price:15,priceType:'essence',moves:[{name:'龙息',power:50,pp:20},{name:'龙爪',power:45,pp:25},{name:'龙鳞',power:0,pp:15},{name:'龙之怒',power:0,pp:10}] },
    { id:18,name:'配单精灵',emoji:'🧚',type:'support',camp:'new',hp:95,attack:50,defense:55,speed:75,price:12,priceType:'essence',moves:[{name:'配单魔法',power:40,pp:25},{name:'精灵之光',power:0,pp:15},{name:'团队增益',power:0,pp:10},{name:'快速配单',power:0,pp:5}] },
    { id:19,name:'添加灵狐',emoji:'🦊',type:'support',camp:'new',hp:90,attack:55,defense:50,speed:80,price:12,priceType:'essence',moves:[{name:'魅惑',power:45,pp:20},{name:'快速添加',power:0,pp:10},{name:'分身术',power:0,pp:15},{name:'灵狐火',power:50,pp:15}] },
    { id:20,name:'进群巨象',emoji:'🐘',type:'defense',camp:'new',hp:130,attack:60,defense:80,speed:35,price:18,priceType:'essence',moves:[{name:'象鼻挥击',power:55,pp:20},{name:'踩踏',power:50,pp:20},{name:'群聚',power:0,pp:10},{name:'守护',power:0,pp:15}] },
    { id:21,name:'雷电豹',emoji:'🐆',type:'attack',camp:null,hp:95,attack:78,defense:42,speed:85,price:12,priceType:'energy',moves:[{name:'雷电爪',power:55,pp:20},{name:'疾跑',power:0,pp:15},{name:'闪电',power:60,pp:10},{name:'蓄电',power:0,pp:10}] },
    { id:22,name:'治愈兔',emoji:'🐰',type:'support',camp:null,hp:85,attack:40,defense:45,speed:65,price:10,priceType:'energy',moves:[{name:'治愈之吻',power:0,pp:10},{name:'跳跃踢',power:40,pp:25},{name:'鼓舞',power:0,pp:15},{name:'大治愈',power:0,pp:5}] },
    { id:23,name:'铁甲犀牛',emoji:'🦏',type:'defense',camp:null,hp:120,attack:55,defense:75,speed:35,price:12,priceType:'energy',moves:[{name:'角撞',power:50,pp:20},{name:'铁壁',power:0,pp:15},{name:'地震',power:55,pp:15},{name:'坚守',power:0,pp:10}] },
    { id:24,name:'疾风狼',emoji:'🐺',type:'attack',camp:null,hp:92,attack:72,defense:45,speed:78,price:12,priceType:'energy',moves:[{name:'风刃',power:50,pp:20},{name:'撕咬',power:45,pp:25},{name:'疾风',power:0,pp:15},{name:'连击',power:0,pp:10}] },
    { id:25,name:'智慧猫头鹰',emoji:'🦉',type:'support',camp:null,hp:88,attack:50,defense:48,speed:60,price:10,priceType:'energy',moves:[{name:'智慧光束',power:50,pp:20},{name:'洞察',power:0,pp:15},{name:'预知',power:0,pp:10},{name:'精神冲击',power:55,pp:15}] },
    { id:26,name:'黄金狮鹫',emoji:'🦅',type:'attack',camp:null,hp:110,attack:88,defense:55,speed:75,price:100,priceType:'gold',moves:[{name:'黄金爪',power:65,pp:15},{name:'狮鹫冲击',power:55,pp:20},{name:'威压',power:0,pp:10},{name:'黄金护盾',power:0,pp:10}] },
    { id:27,name:'水晶独角兽',emoji:'🦄',type:'support',camp:null,hp:100,attack:55,defense:60,speed:70,price:25,priceType:'crystal',moves:[{name:'水晶角',power:55,pp:20},{name:'治愈之泪',power:0,pp:10},{name:'魔法护盾',power:0,pp:15},{name:'净化',power:0,pp:5}] },
    { id:28,name:'暗影豹',emoji:'🐆',type:'attack',camp:null,hp:98,attack:85,defense:45,speed:88,price:20,priceType:'essence',moves:[{name:'暗影爪',power:60,pp:15},{name:'潜行',power:0,pp:15},{name:'突袭',power:70,pp:10},{name:'暗影分身',power:0,pp:10}] },
    { id:29,name:'圣光龙',emoji:'🐲',type:'special',camp:null,hp:115,attack:75,defense:65,speed:65,price:18,priceType:'energy',moves:[{name:'圣光吐息',power:60,pp:15},{name:'龙尾',power:50,pp:20},{name:'圣光治愈',power:0,pp:10},{name:'龙之威压',power:0,pp:10}] },
    { id:30,name:'传说凤凰',emoji:'🔥',type:'special',camp:null,hp:120,attack:80,defense:60,speed:70,price:150,priceType:'gold',moves:[{name:'传说火焰',power:70,pp:10},{name:'凤凰之舞',power:0,pp:10},{name:'浴火重生',power:0,pp:5},{name:'烈焰风暴',power:65,pp:15}] }
];

// ====================== 互通联机核心 ======================
const myUid = localStorage.getItem('uid') || (function(){
  let u = Math.random().toString(36).slice(2) + Date.now();
  localStorage.setItem('uid', u);
  return u;
})();

const roomKey = btoa(location.href).slice(0,32);
const cloudUrl = "https://api.npoint.io/"+roomKey;
window.allPlayers = {};

// 游戏数据管理（互通版）
const GameStorage = {
    async save() {
        const data = {
            player: gameData.player,
            resources: gameData.resources,
            myPokemons: gameData.myPokemons,
            selectedCamp: gameData.selectedCamp,
            selectedAvatar: gameData.selectedAvatar,
            lastDataSubmit: gameData.lastDataSubmit,
            roomCode: gameData.roomCode,
            score: gameData.score || 0,
            personalBattleCount: gameData.personalBattleCount || {},
            teamBattleCount: gameData.teamBattleCount || {},
            battleWins: gameData.battleWins || 0,
            teamBattleWins: gameData.teamBattleWins || 0
        };
        localStorage.setItem('petBattleGame', JSON.stringify(data));
        try{
            let res = await fetch(cloudUrl);
            let all = res.ok ? await res.json() : {};
            all[myUid] = data;
            await fetch(cloudUrl,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(all)});
        }catch(e){}
    },
    async load() {
        const saved = localStorage.getItem('petBattleGame');
        if(saved){
            const data = JSON.parse(saved);
            gameData.player = data.player;
            gameData.resources = data.resources || {gold:500,crystal:0,energy:0,essence:0};
            gameData.myPokemons = data.myPokemons || [];
            gameData.selectedCamp = data.selectedCamp;
            gameData.selectedAvatar = data.selectedAvatar || '🙂';
            gameData.lastDataSubmit = data.lastDataSubmit;
            gameData.roomCode = data.roomCode || this.generateRoomCode();
            gameData.score = data.score || 0;
            gameData.personalBattleCount = data.personalBattleCount || {};
            gameData.teamBattleCount = data.teamBattleCount || {};
            gameData.battleWins = data.battleWins || 0;
            gameData.teamBattleWins = data.teamBattleWins || 0;
        }
        try{
            let res = await fetch(cloudUrl);
            if(res.ok) window.allPlayers = await res.json();
        }catch(e){}
        return !!saved;
    },
    generateRoomCode(){
        return Math.random().toString(36).substring(2,8).toUpperCase();
    },
    clear(){
        localStorage.removeItem('petBattleGame');
        localStorage.removeItem('uid');
    }
};

// 自动同步
setInterval(()=>GameStorage.load(),3000);

// ====================== 游戏函数 ======================
function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    if(inviteCode){
        try{
            const d=JSON.parse(atob(inviteCode));
            if(d.room&&d.camp){gameData.roomCode=d.room;gameData.selectedCamp=d.camp;alert(`已加入房间：${d.room}\n阵营：${d.camp=='service'?'服务方':'新开方'}`)}
        }catch(e){}
    }
    GameStorage.load().then(ok=>{
        updateUI();
        ok?showPage('mainMenu'):showPage('loginPage');
    });
}

function showPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function selectCamp(c){
    gameData.selectedCamp=c;
    document.querySelectorAll('.camp-option').forEach(x=>x.classList.remove('selected'));
    document.querySelector(`.camp-option.${c}`).classList.add('selected');
    const s=document.getElementById('teamSelect');
    s.innerHTML='<option value="">选择队伍</option>';
    if(c=='service'){s.innerHTML+='<option value="林瑞镜队">林瑞镜队</option><option value="谢晓珊队">谢晓珊队</option>'}
    else{s.innerHTML+='<option value="蓝Buff队">蓝Buff队</option><option value="巅峰开拓者">巅峰开拓者</option>'}
    document.getElementById('teamSelectBox').style.display='block';
}

function selectAvatar(el,a){
    gameData.selectedAvatar=a;
    document.querySelectorAll('.avatar-option').forEach(x=>x.classList.remove('selected'));
    el.classList.add('selected');
}

function createPlayer(){
    const n=document.getElementById('playerName').value.trim();
    const t=document.getElementById('teamSelect').value;
    if(!n||!gameData.selectedCamp||!t){alert('请完善信息');return}
    gameData.player={name:n,team:t};
    GameStorage.save();
    updateUI();
    showPage('mainMenu');
}

function updateUI(){
    if(document.getElementById('menuAvatar'))document.getElementById('menuAvatar').textContent=gameData.selectedAvatar;
    if(document.getElementById('menuName'))document.getElementById('menuName').textContent=gameData.player?.name||'';
    if(document.getElementById('menuCamp'))document.getElementById('menuCamp').textContent=`${gameData.selectedCamp=='service'?'🔴服务方':'🔵新开方'} · ${gameData.player?.team||''} · ${gameData.score||0}分`;
    if(document.getElementById('gold'))document.getElementById('gold').textContent=gameData.resources.gold;
    if(document.getElementById('crystal'))document.getElementById('crystal').textContent=gameData.resources.crystal;
    if(document.getElementById('energy'))document.getElementById('energy').textContent=gameData.resources.energy;
    if(document.getElementById('essence'))document.getElementById('essence').textContent=gameData.resources.essence;
    if(document.getElementById('roomCodeDisplay'))document.getElementById('roomCodeDisplay').textContent=gameData.roomCode;
    document.getElementById('resourceBar').style.display='flex';
}

function showShop(){
    const l=document.getElementById('shopList');
    const p=pokemonDB.filter(x=>!x.camp||x.camp==gameData.selectedCamp);
    l.innerHTML=p.map(x=>{
        const ok=gameData.resources[x.priceType]>=x.price;
        const e={gold:'🪙',crystal:'💎',energy:'⚡',essence:'✨'}[x.priceType];
        return`<div class="pokemon-card" style="position:relative;opacity:${ok?1:0.5}">
            <div class="price">${e}${x.price}</div>
            <div class="emoji">${x.emoji}</div>
            <div class="name">${x.name}</div>
            <div style="font-size:0.8em;color:#aaa">HP:${x.hp} 攻:${x.attack}</div>
            <button class="btn" style="width:100%;margin-top:10px" ${ok?`onclick="buyPokemon(${x.id})"`:'disabled'}>${ok?'购买':'不足'}</button>
        </div>`
    }).join('');
    showPage('shopPage');
}

function buyPokemon(id){
    const p=pokemonDB.find(x=>x.id==id);
    if(!p||gameData.resources[p.priceType]<p.price){alert('资源不足');return}
    gameData.resources[p.priceType]-=p.price;
    gameData.myPokemons.push({...p,customName:p.name,level:1,exp:0,expToNext:100,currentHp:p.hp,maxHp:p.hp,moves:p.moves.map(m=>({...m,currentPp:m.pp}))});
    GameStorage.save();updateUI();alert(`购买成功：${p.name}`);showShop();
}

function showMyPokemons(){
    const l=document.getElementById('myPokemonList');
    if(!gameData.myPokemons.length){l.innerHTML='<div style="text-align:center;padding:40px;color:#aaa">暂无宠物</div>'}
    else{l.innerHTML=gameData.myPokemons.map((p,i)=>`<div class="pokemon-card" onclick="showPokemonDetail(${i})">
        <div class="emoji">${p.emoji}</div>
        <div class="name">${p.customName}</div>
        <div style="color:#ffd700">Lv.${p.level}</div>
    </div>`).join('')}
    showPage('pokemonPage');
}

function showPokemonDetail(i){
    gameData.selectedPokemon=i;
    const p=gameData.myPokemons[i];
    const t=new Date().toDateString();
    const f=p.feedCount?.[t]||0;
    const r=5-f;
    document.getElementById('pokemonDetailContent').innerHTML=`
    <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:5em">${p.emoji}</div>
        <div style="font-size:1.5em;font-weight:bold">${p.customName}</div>
        <div style="color:#ffd700">Lv.${p.level}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px">
        <div class="stat-box">HP:${p.currentHp}/${p.maxHp}</div>
        <div class="stat-box">攻击:${p.attack}</div>
        <div class="stat-box">防御:${p.defense}</div>
        <div class="stat-box">速度:${p.speed}</div>
    </div>
    <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:12px">
        经验:${p.exp}/${p.expToNext}
        <div class="hp-bar"><div class="hp-fill high" style="width:${p.exp/p.expToNext*100}%"></div></div>
    </div>
    <div style="text-align:center;margin:20px 0">今日喂食:${f}/5</div>
    <button class="btn btn-primary" onclick="feedPokemon()" ${r<=0?'disabled style="opacity:0.5"':''}>🍖 喂食（30金币）</button>
    <button class="btn btn-secondary" onclick="renamePokemon()">✏️ 改名</button>
    `;
    showPage('pokemonDetailPage');
}

function feedPokemon(){
    const p=gameData.myPokemons[gameData.selectedPokemon];
    const t=new Date().toDateString();
    if(!p.feedCount)p.feedCount={};if(!p.feedCount[t])p.feedCount[t]=0;
    if(p.feedCount[t]>=5){alert('今日已达上限');return}
    if(gameData.resources.gold<30){alert('金币不足');return}
    gameData.resources.gold-=30;p.feedCount[t]++;p.currentHp=Math.min(p.currentHp+10,p.maxHp);
    const s=['attack','defense','speed'];const ch=s[Math.floor(Math.random()*3)];p[ch]+=Math.floor(Math.random()*2)+1;
    p.exp+=5;if(p.exp>=p.expToNext){p.level++;p.exp=0;p.expToNext=Math.floor(p.expToNext*1.2);p.maxHp+=10;p.currentHp=p.maxHp;p.attack+=3;p.defense+=3;p.speed+=3;alert('升级了！')}
    GameStorage.save();updateUI();showPokemonDetail(gameData.selectedPokemon);
}

function renamePokemon(){
    const p=gameData.myPokemons[gameData.selectedPokemon];
    const n=prompt('新名字',p.customName);
    if(n&&n.trim()){p.customName=n.trim();GameStorage.save();showPokemonDetail(gameData.selectedPokemon)}
}

function startPersonalBattle(){
    if(!gameData.myPokemons.length){alert('先拥有宠物');return}
    const t=new Date().toDateString();
    if((gameData.personalBattleCount[t]||0)>=5){alert('今日次数用完');return}
    const o=[{name:'战神',avatar:'😎',power:2400,camp:'service',team:'战神队'},{name:'王者',avatar:'🤴',power:2000,camp:'new',team:'王者队'},{name:'先锋',avatar:'⚔️',power:1600,camp:'service',team:'先锋队'},{name:'游侠',avatar:'🏹',power:1200,camp:'new',team:'游侠队'}];
    const c=document.getElementById('battleSelectContent');
    c.innerHTML=`<div style="padding:10px;background:rgba(255,215,0,0.1);border-radius:12px;margin-bottom:15px;text-align:center">个人PK 每日5次</div>`+
    o.map(p=>`<div onclick="startBattleWith('${p.name}',${p.power},'personal')" style="padding:15px;background:rgba(0,0,0,0.3);border-radius:12px;margin-bottom:10px;cursor:pointer">
        <div style="font-size:2em">${p.avatar}</div>
        <div>${p.name}</div>
        <div style="color:#ffd700">战力:${p.power}</div>
    </div>`).join('');
    showPage('battleSelectPage');
}

function startTeamBattle(){
    if(!gameData.myPokemons.length){alert('先拥有宠物');return}
    const t=new Date().toDateString();
    if(gameData.teamBattleCount[t]>=1){alert('团队战每日1次');return}
    const o=[{name:'队长',avatar:'😈',power:2800},{name:'精英',avatar:'👿',power:2400},{name:'成员',avatar:'😡',power:2000}];
    const c=document.getElementById('battleSelectContent');
    c.innerHTML=`<div style="padding:10px;background:rgba(255,215,0,0.1);border-radius:12px;margin-bottom:15px;text-align:center">团队战 每日1次</div>`+
    o.map(p=>`<div onclick="startBattleWith('${p.name}',${p.power},'team')" style="padding:15px;background:rgba(0,0,0,0.3);border-radius:12px;margin-bottom:10px;cursor:pointer">
        <div style="font-size:2em">${p.avatar}</div>
        <div>${p.name}</div>
        <div style="color:#ffd700">战力:${p.power}</div>
    </div>`).join('');
    showPage('battleSelectPage');
}

function startBattleWith(n,pow,m){
    const t=new Date().toDateString();
    if(m=='personal'&&(gameData.personalBattleCount[t]||0)>=5){alert('次数用完');return}
    if(m=='team'&&gameData.teamBattleCount[t]>=1){alert('次数用完');return}
    const me=gameData.myPokemons[0];
    const es=pokemonDB.filter(x=>!x.camp||x.camp==gameData.selectedCamp);
    const et=es[Math.floor(Math.random()*es.length)];
    const r=pow/2000;
    const e={...et,name:n+'的'+et.name,currentHp:Math.floor(et.hp*r),maxHp:Math.floor(et.hp*r),attack:Math.floor(et.attack*r),defense:Math.floor(et.defense*r),speed:Math.floor(et.speed*r),moves:et.moves.map(m=>({...m,currentPp:m.pp}))};
    gameData.currentBattle={player:{...me},enemy:e,opponentName:n,turn:1,mode:m};
    updateBattleUI();showPage('battlePage');
}

function updateBattleUI(){
    const b=gameData.currentBattle;
    document.getElementById('playerEmoji').textContent=b.player.emoji;
    document.getElementById('playerName').textContent=b.player.customName;
    let ph=(b.player.currentHp/b.player.maxHp)*100;
    document.getElementById('playerHpBar').style.width=ph+'%';
    document.getElementById('playerHpBar').textContent=b.player.currentHp+'/'+b.player.maxHp;
    document.getElementById('enemyEmoji').textContent=b.enemy.emoji;
    document.getElementById('enemyName').textContent=b.enemy.name;
    let eh=(b.enemy.currentHp/b.enemy.maxHp)*100;
    document.getElementById('enemyHpBar').style.width=eh+'%';
    document.getElementById('enemyHpBar').textContent=b.enemy.currentHp+'/'+b.enemy.maxHp;
    document.getElementById('movesGrid').innerHTML=b.player.moves.map((m,i)=>`<button class="move-btn move-${m.power>0?'attack':'support'}" onclick="useMove(${i})" ${m.currentPp<=0?'disabled':''}>${m.name} (${m.currentPp}/${m.pp})</button>`).join('');
}

function useMove(i){
    const b=gameData.currentBattle;
    const m=b.player.moves[i];if(m.currentPp<=0)return;m.currentPp--;
    if(m.power>0){
        const d=Math.max(1,Math.floor((b.player.attack*m.power/100)-(b.enemy.defense/10)*(0.8+Math.random()*0.4)));
        b.enemy.currentHp=Math.max(0,b.enemy.currentHp-d);
        addBattleLog(`${b.player.customName} ${m.name} 造成${d}伤害！`);
    }else{addBattleLog(`${b.player.customName} ${m.name}`)}
    updateBattleUI();if(b.enemy.currentHp<=0){setTimeout(()=>endBattle(true),500);return}
    setTimeout(enemyTurn,800);
}

function enemyTurn(){
    const b=gameData.currentBattle;
    const av=b.enemy.moves.filter(m=>m.currentPp>0);
    if(!av.length){addBattleLog('敌方无技能点');setTimeout(()=>endBattle(true),500);return}
    const m=av[Math.floor(Math.random()*av.length)];m.currentPp--;
    if(m.power>0){
        const d=Math.max(1,Math.floor((b.enemy.attack*m.power/100)-(b.player.defense/10)*(0.8+Math.random()*0.4)));
        b.player.currentHp=Math.max(0,b.player.currentHp-d);
        addBattleLog(`${b.enemy.name} ${m.name} 造成${d}伤害！`);
    }else{addBattleLog(`${b.enemy.name} ${m.name}`)}
    updateBattleUI();if(b.player.currentHp<=0)setTimeout(()=>endBattle(false),500);
}

function addBattleLog(msg){
    const l=document.getElementById('battleLog');l.innerHTML+=`<div class="entry">${msg}</div>`;l.scrollTop=l.scrollHeight;
}

function endBattle(w){
    const m=document.getElementById('resultModal');
    const e=document.getElementById('resultEmoji');
    const t=document.getElementById('resultTitle');
    const msg=document.getElementById('resultMessage');
    const rw=document.getElementById('resultRewards');
    const b=gameData.currentBattle;
    const d=new Date().toDateString();
    if(w){
        if(b.mode=='personal'){
            gameData.resources.gold+=50;gameData.score+=10;gameData.battleWins++;
            gameData.personalBattleCount[d]=(gameData.personalBattleCount[d]||0)+1;
            e.textContent='🏆';t.textContent='胜利';msg.textContent='个人战胜利';rw.innerHTML='🪙金币+50  🏆积分+10';
        }else{
            gameData.resources.gold+=100;gameData.resources.crystal+=10;gameData.resources.energy+=10;gameData.resources.essence+=10;gameData.score+=50;gameData.teamBattleWins++;
            gameData.teamBattleCount[d]=1;
            e.textContent='🎉';t.textContent='团队胜利';msg.textContent='团队战胜利';rw.innerHTML='🪙+100 💎+10 ⚡+10 ✨+10 🏆+50';
        }
        if(gameData.myPokemons[0]){gameData.myPokemons[0].exp+=30;}
        GameStorage.save();updateUI();
    }else{
        if(b.mode=='personal')gameData.personalBattleCount[d]=(gameData.personalBattleCount[d]||0)+1;
        else gameData.teamBattleCount[d]=1;
        GameStorage.save();
        e.textContent='💔';t.textContent='战败';msg.textContent='再接再厉';rw.innerHTML='无奖励';
    }
    m.classList.add('active');
}

function closeModal(){document.getElementById('resultModal').classList.remove('active');showPage('mainMenu')}

// 真实互通排行榜
function showRanking(){
    const c=document.getElementById('rankingList');
    let list=[];
    for(let uid in window.allPlayers){
        let p=window.allPlayers[uid];
        if(p.player){
            list.push({
                name:p.player.name,
                avatar:p.selectedAvatar||'🙂',
                camp:p.selectedCamp,
                team:p.player.team,
                score:p.score||0,
                battleWins:p.battleWins||0,
                teamBattleWins:p.teamBattleWins||0,
                isMe:uid==myUid
            });
        }
    }
    list.sort((a,b)=>b.score-a.score);
    let html=`<div style="text-align:center;padding:15px;background:rgba(255,215,0,0.1);border-radius:12px;margin-bottom:15px"><h2>🏆 全服互通排行榜</h2><p>所有玩家实时同步</p></div>`;
    html+=list.map((p,i)=>`<div style="padding:15px;background:rgba(0,0,0,0.3);border-radius:12px;margin-bottom:10px;${p.isMe?'border:2px solid #ffd700':''}">
        #${i+1} ${p.avatar} ${p.name} ${p.isMe?'(你)':''}<br>
        ${p.camp=='service'?'🔴':'🔵'} ${p.team} | 积分:${p.score} | 胜场:${p.battleWins}
    </div>`).join('');
    c.innerHTML=html;
    showPage('rankingPage');
}

function submitData(){
    const t=new Date().toDateString();
    if(gameData.lastDataSubmit==t){alert('今日已提交');return}
    gameData.resources.gold+=100;gameData.resources.crystal+=5;gameData.lastDataSubmit=t;
    GameStorage.save();updateUI();alert('提交成功！金币+100 水晶+5');showPage('mainMenu');
}

function showSettings(){
    document.getElementById('settingsRoomCode').textContent=gameData.roomCode;
    document.getElementById('shareLinkArea').value=window.location
