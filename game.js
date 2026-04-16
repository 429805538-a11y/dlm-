// 游戏数据管理
const GameStorage = {
    save() {
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
    },
    
    load() {
        const saved = localStorage.getItem('petBattleGame');
        if (saved) {
            const data = JSON.parse(saved);
            gameData.player = data.player;
            gameData.resources = data.resources || { gold: 500, crystal: 0, energy: 0, essence: 0 };
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
            return true;
        }
        return false;
    },
    
    generateRoomCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    },
    
    clear() {
        localStorage.removeItem('petBattleGame');
    }
};

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
    // 积分和战斗次数
    score: 0,
    personalBattleCount: {}, // 日期 -> 次数
    teamBattleCount: {}, // 日期 -> 次数
    battleWins: 0,
    teamBattleWins: 0
};

// 宠物数据库 - 30只不同宠物
const pokemonDB = [
    // 基础宠物 (金币购买) - 10只
    { id: 1, name: '小火狐', emoji: '🦊', type: 'attack', camp: null, hp: 90, attack: 65, defense: 40, speed: 60, price: 50, priceType: 'gold', moves: [{name:'火花',power:40,pp:25},{name:'抓击',power:35,pp:35},{name:'嚎叫',power:0,pp:40},{name:'蓄能',power:0,pp:20}] },
    { id: 2, name: '小水獭', emoji: '🦦', type: 'defense', camp: null, hp: 110, attack: 45, defense: 65, speed: 40, price: 50, priceType: 'gold', moves: [{name:'水枪',power:40,pp:25},{name:'撞击',power:35,pp:35},{name:'缩壳',power:0,pp:20},{name:'治愈',power:0,pp:10}] },
    { id: 3, name: '小草蛇', emoji: '🐍', type: 'support', camp: null, hp: 100, attack: 50, defense: 55, speed: 50, price: 50, priceType: 'gold', moves: [{name:'藤鞭',power:45,pp:25},{name:'撞击',power:35,pp:35},{name:'生长',power:0,pp:20},{name:'光合作用',power:0,pp:5}] },
    { id: 4, name: '小雷鼠', emoji: '🐭', type: 'attack', camp: null, hp: 85, attack: 60, defense: 35, speed: 75, price: 60, priceType: 'gold', moves: [{name:'电击',power:45,pp:20},{name:'啃咬',power:35,pp:30},{name:'充电',power:0,pp:15},{name:'闪电',power:0,pp:10}] },
    { id: 5, name: '小岩龟', emoji: '🐢', type: 'defense', camp: null, hp: 120, attack: 40, defense: 70, speed: 30, price: 60, priceType: 'gold', moves: [{name:'岩石投掷',power:40,pp:25},{name:'撞击',power:30,pp:35},{name:'硬化',power:0,pp:20},{name:'护盾',power:0,pp:10}] },
    { id: 6, name: '小风雀', emoji: '🐦', type: 'support', camp: null, hp: 80, attack: 45, defense: 40, speed: 70, price: 60, priceType: 'gold', moves: [{name:'风刃',power:40,pp:25},{name:'啄击',power:35,pp:30},{name:'顺风',power:0,pp:15},{name:'治愈之风',power:0,pp:10}] },
    { id: 7, name: '小冰熊', emoji: '🐻‍❄️', type: 'defense', camp: null, hp: 115, attack: 50, defense: 60, speed: 35, price: 70, priceType: 'gold', moves: [{name:'冰冻拳',power:45,pp:20},{name:'撞击',power:35,pp:35},{name:'冰冻',power:0,pp:15},{name:'冬眠',power:0,pp:5}] },
    { id: 8, name: '小火龙', emoji: '🐲', type: 'attack', camp: null, hp: 95, attack: 70, defense: 45, speed: 55, price: 70, priceType: 'gold', moves: [{name:'火焰',power:50,pp:20},{name:'爪击',power:40,pp:30},{name:'怒吼',power:0,pp:15},{name:'蓄力',power:0,pp:10}] },
    { id: 9, name: '小光鹿', emoji: '🦌', type: 'support', camp: null, hp: 90, attack: 45, defense: 50, speed: 60, price: 80, priceType: 'gold', moves: [{name:'光之角',power:45,pp:20},{name:'撞击',power:35,pp:35},{name:'闪光',power:0,pp:15},{name:'治愈之光',power:0,pp:10}] },
    { id: 10, name: '小影猫', emoji: '🐱', type: 'attack', camp: null, hp: 88, attack: 68, defense: 38, speed: 72, price: 80, priceType: 'gold', moves: [{name:'暗影爪',power:50,pp:20},{name:'撕咬',power:40,pp:30},{name:'潜行',power:0,pp:15},{name:'突袭',power:0,pp:10}] },
    
    // 服务方专属 (水晶购买) - 5只
    { id: 11, name: '业绩战狼', emoji: '🐺', type: 'attack', camp: 'service', hp: 100, attack: 80, defense: 50, speed: 70, price: 15, priceType: 'crystal', moves: [{name:'业绩冲刺',power:55,pp:20},{name:'客户撕咬',power:45,pp:25},{name:'业绩咆哮',power:0,pp:15},{name:'狼群战术',power:0,pp:10}] },
    { id: 12, name: '客户猎鹰', emoji: '🦅', type: 'attack', camp: 'service', hp: 90, attack: 75, defense: 45, speed: 85, price: 15, priceType: 'crystal', moves: [{name:'猎鹰俯冲',power:50,pp:20},{name:'利爪',power:40,pp:25},{name:'鹰眼',power:0,pp:15},{name:'风速',power:0,pp:10}] },
    { id: 13, name: '服务狮王', emoji: '🦁', type: 'attack', camp: 'service', hp: 105, attack: 85, defense: 55, speed: 65, price: 20, priceType: 'crystal', moves: [{name:'狮吼',power:60,pp:15},{name:'撕咬',power:50,pp:25},{name:'王者威压',power:0,pp:10},{name:'守护',power:0,pp:10}] },
    { id: 14, name: '业绩猛虎', emoji: '🐯', type: 'attack', camp: 'service', hp: 100, attack: 82, defense: 48, speed: 75, price: 20, priceType: 'crystal', moves: [{name:'虎啸',power:55,pp:20},{name:'猛扑',power:50,pp:20},{name:'威吓',power:0,pp:15},{name:'蓄势',power:0,pp:10}] },
    { id: 15, name: '客户神鹿', emoji: '🦌', type: 'support', camp: 'service', hp: 95, attack: 55, defense: 60, speed: 70, price: 18, priceType: 'crystal', moves: [{name:'圣光角',power:50,pp:20},{name:'治愈',power:0,pp:10},{name:'祝福',power:0,pp:15},{name:'守护光环',power:0,pp:10}] },
    
    // 新开方专属 (精华购买) - 5只
    { id: 16, name: '新开凤凰', emoji: '🔥', type: 'special', camp: 'new', hp: 105, attack: 70, defense: 55, speed: 65, price: 15, priceType: 'essence', moves: [{name:'新开火焰',power:55,pp:20},{name:'凤凰冲击',power:45,pp:25},{name:'重生',power:0,pp:5},{name:'火羽',power:35,pp:30}] },
    { id: 17, name: '二开巨龙', emoji: '🐉', type: 'defense', camp: 'new', hp: 125, attack: 65, defense: 75, speed: 50, price: 15, priceType: 'essence', moves: [{name:'龙息',power:50,pp:20},{name:'龙爪',power:45,pp:25},{name:'龙鳞',power:0,pp:15},{name:'龙之怒',power:0,pp:10}] },
    { id: 18, name: '配单精灵', emoji: '🧚', type: 'support', camp: 'new', hp: 95, attack: 50, defense: 55, speed: 75, price: 12, priceType: 'essence', moves: [{name:'配单魔法',power:40,pp:25},{name:'精灵之光',power:0,pp:15},{name:'团队增益',power:0,pp:10},{name:'快速配单',power:0,pp:5}] },
    { id: 19, name: '添加灵狐', emoji: '🦊', type: 'support', camp: 'new', hp: 90, attack: 55, defense: 50, speed: 80, price: 12, priceType: 'essence', moves: [{name:'魅惑',power:45,pp:20},{name:'快速添加',power:0,pp:10},{name:'分身术',power:0,pp:15},{name:'灵狐火',power:50,pp:15}] },
    { id: 20, name: '进群巨象', emoji: '🐘', type: 'defense', camp: 'new', hp: 130, attack: 60, defense: 80, speed: 35, price: 18, priceType: 'essence', moves: [{name:'象鼻挥击',power:55,pp:20},{name:'踩踏',power:50,pp:20},{name:'群聚',power:0,pp:10},{name:'守护',power:0,pp:15}] },
    
    // 能量购买宠物 - 5只
    { id: 21, name: '雷电豹', emoji: '🐆', type: 'attack', camp: null, hp: 95, attack: 78, defense: 42, speed: 85, price: 12, priceType: 'energy', moves: [{name:'雷电爪',power:55,pp:20},{name:'疾跑',power:0,pp:15},{name:'闪电',power:60,pp:10},{name:'蓄电',power:0,pp:10}] },
    { id: 22, name: '治愈兔', emoji: '🐰', type: 'support', camp: null, hp: 85, attack: 40, defense: 45, speed: 65, price: 10, priceType: 'energy', moves: [{name:'治愈之吻',power:0,pp:10},{name:'跳跃踢',power:40,pp:25},{name:'鼓舞',power:0,pp:15},{name:'大治愈',power:0,pp:5}] },
    { id: 23, name: '铁甲犀牛', emoji: '🦏', type: 'defense', camp: null, hp: 120, attack: 55, defense: 75, speed: 35, price: 12, priceType: 'energy', moves: [{name:'角撞',power:50,pp:20},{name:'铁壁',power:0,pp:15},{name:'地震',power:55,pp:15},{name:'坚守',power:0,pp:10}] },
    { id: 24, name: '疾风狼', emoji: '🐺', type: 'attack', camp: null, hp: 92, attack: 72, defense: 45, speed: 78, price: 12, priceType: 'energy', moves: [{name:'风刃',power:50,pp:20},{name:'撕咬',power:45,pp:25},{name:'疾风',power:0,pp:15},{name:'连击',power:0,pp:10}] },
    { id: 25, name: '智慧猫头鹰', emoji: '🦉', type: 'support', camp: null, hp: 88, attack: 50, defense: 48, speed: 60, price: 10, priceType: 'energy', moves: [{name:'智慧光束',power:50,pp:20},{name:'洞察',power:0,pp:15},{name:'预知',power:0,pp:10},{name:'精神冲击',power:55,pp:15}] },
    
    // 稀有宠物 (混合货币) - 5只
    { id: 26, name: '黄金狮鹫', emoji: '🦅', type: 'attack', camp: null, hp: 110, attack: 88, defense: 55, speed: 75, price: 100, priceType: 'gold', moves: [{name:'黄金爪',power:65,pp:15},{name:'狮鹫冲击',power:55,pp:20},{name:'威压',power:0,pp:10},{name:'黄金护盾',power:0,pp:10}] },
    { id: 27, name: '水晶独角兽', emoji: '🦄', type: 'support', camp: null, hp: 100, attack: 55, defense: 60, speed: 70, price: 25, priceType: 'crystal', moves: [{name:'水晶角',power:55,pp:20},{name:'治愈之泪',power:0,pp:10},{name:'魔法护盾',power:0,pp:15},{name:'净化',power:0,pp:5}] },
    { id: 28, name: '暗影豹', emoji: '🐆', type: 'attack', camp: null, hp: 98, attack: 85, defense: 45, speed: 88, price: 20, priceType: 'essence', moves: [{name:'暗影爪',power:60,pp:15},{name:'潜行',power:0,pp:15},{name:'突袭',power:70,pp:10},{name:'暗影分身',power:0,pp:10}] },
    { id: 29, name: '圣光龙', emoji: '🐲', type: 'special', camp: null, hp: 115, attack: 75, defense: 65, speed: 65, price: 18, priceType: 'energy', moves: [{name:'圣光吐息',power:60,pp:15},{name:'龙尾',power:50,pp:20},{name:'圣光治愈',power:0,pp:10},{name:'龙之威压',power:0,pp:10}] },
    { id: 30, name: '传说凤凰', emoji: '🔥', type: 'special', camp: null, hp: 120, attack: 80, defense: 60, speed: 70, price: 150, priceType: 'gold', moves: [{name:'传说火焰',power:70,pp:10},{name:'凤凰之舞',power:0,pp:10},{name:'浴火重生',power:0,pp:5},{name:'烈焰风暴',power:65,pp:15}] }
];

// 初始化
function init() {
    // 检查URL参数是否有邀请码
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    
    if (inviteCode) {
        // 解析邀请码
        try {
            const inviteData = JSON.parse(atob(inviteCode));
            if (inviteData.room && inviteData.camp) {
                gameData.roomCode = inviteData.room;
                gameData.selectedCamp = inviteData.camp;
                alert(`🎉 收到邀请！\n房间：${inviteData.room}\n阵营：${inviteData.camp === 'service' ? '🔴 服务方' : '🔵 新开方'}\n\n请创建你的角色加入游戏！`);
            }
        } catch (e) {}
    }
    
    if (GameStorage.load()) {
        updateUI();
        showPage('mainMenu');
    } else {
        if (!gameData.roomCode) gameData.roomCode = GameStorage.generateRoomCode();
        showPage('loginPage');
        // 如果有预设阵营，显示队伍选择
        if (gameData.selectedCamp) {
            selectCamp(gameData.selectedCamp);
        }
    }
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function selectCamp(camp) {
    gameData.selectedCamp = camp;
    document.querySelectorAll('.camp-option').forEach(c => c.classList.remove('selected'));
    document.querySelector(`.camp-option.${camp}`).classList.add('selected');
    
    // 显示队伍选择
    const teamSelect = document.getElementById('teamSelect');
    teamSelect.innerHTML = '<option value="">请选择队伍</option>';
    
    if (camp === 'service') {
        teamSelect.innerHTML += '<option value="林瑞镜队">林瑞镜队</option><option value="谢晓珊队">谢晓珊队</option>';
    } else {
        teamSelect.innerHTML += '<option value="蓝Buff队">蓝Buff队</option><option value="巅峰开拓者">巅峰开拓者</option>';
    }
    
    document.getElementById('teamSelectBox').style.display = 'block';
}

function selectAvatar(element, avatar) {
    gameData.selectedAvatar = avatar;
    document.querySelectorAll('.avatar-option').forEach(a => a.classList.remove('selected'));
    element.classList.add('selected');
}

function createPlayer() {
    const name = document.getElementById('playerName').value.trim();
    const team = document.getElementById('teamSelect').value;
    
    if (!name) { alert('请输入名字！'); return; }
    if (!gameData.selectedCamp) { alert('请选择阵营！'); return; }
    if (!team) { alert('请选择队伍！'); return; }
    
    gameData.player = { name, team };
    GameStorage.save();
    
    updateUI();
    showPage('mainMenu');
}

function updateUI() {
    const menuAvatar = document.getElementById('menuAvatar');
    const menuName = document.getElementById('menuName');
    const menuCamp = document.getElementById('menuCamp');
    
    if (menuAvatar) menuAvatar.textContent = gameData.selectedAvatar;
    if (menuName) menuName.textContent = gameData.player.name;
    if (menuCamp) menuCamp.textContent = `${gameData.selectedCamp === 'service' ? '🔴 服务方' : '🔵 新开方'} · ${gameData.player.team} · ${gameData.score || 0}分`;
    
    // 资源显示
    const goldDisplay = document.getElementById('gold');
    const crystalDisplay = document.getElementById('crystal');
    const energyDisplay = document.getElementById('energy');
    const essenceDisplay = document.getElementById('essence');
    
    if (goldDisplay) goldDisplay.textContent = gameData.resources.gold;
    if (crystalDisplay) crystalDisplay.textContent = gameData.resources.crystal;
    if (energyDisplay) energyDisplay.textContent = gameData.resources.energy;
    if (essenceDisplay) essenceDisplay.textContent = gameData.resources.essence;
    
    // 显示房间码
    const roomDisplay = document.getElementById('roomCodeDisplay');
    if (roomDisplay) roomDisplay.textContent = gameData.roomCode;
    
    // 显示资源栏
    document.getElementById('resourceBar').style.display = 'flex';
}

// 计算奖励
function calculateRewards() {
    const camp = gameData.selectedCamp;
    let gold = 0, crystal = 0, energy = 0, essence = 0;
    
    if (camp === 'service') {
        const dailyComplete = parseInt(document.getElementById('dailyComplete').value) || 0;
        const customerCount = parseInt(document.getElementById('customerCount').value) || 0;
        const dealAmount = parseFloat(document.getElementById('dealAmount').value) || 0;
        
        // 服务方：日完成1个=2水晶，客户5个=3能量，业绩5000=10金币
        crystal = Math.floor(dailyComplete / 1) * 2;
        energy = Math.floor(customerCount / 5) * 3;
        gold = Math.floor(dealAmount / 5000) * 10;
    } else {
        const orderCount = parseInt(document.getElementById('orderCount').value) || 0;
        const newCount = parseInt(document.getElementById('newCount').value) || 0;
        const reopenCount = parseInt(document.getElementById('reopenCount').value) || 0;
        const todayAdd = parseInt(document.getElementById('todayAdd').value) || 0;
        const groupCount = parseInt(document.getElementById('groupCount').value) || 0;
        
        // 新开方：配单2个=2精华，新开1个=3能量，二开1个=2精华，添加3个=1水晶，进群3个=1金币
        essence = Math.floor(orderCount / 2) * 2 + Math.floor(reopenCount / 1) * 2;
        energy = Math.floor(newCount / 1) * 3;
        crystal = Math.floor(todayAdd / 3) * 1;
        gold = Math.floor(groupCount / 3) * 1;
    }
    
    const rewardBox = document.getElementById('rewardBox');
    const rewardItems = document.getElementById('rewardItems');
    const rewardHint = document.getElementById('rewardHint');
    
    // 显示奖励计算标准提示
    if (rewardHint) {
        if (camp === 'service') {
            rewardHint.innerHTML = '💡 日完成1个=2水晶 | 客户5个=3能量 | 业绩5000=10金币';
        } else {
            rewardHint.innerHTML = '💡 配单2个=2精华 | 新开1个=3能量 | 二开1个=2精华 | 添加3个=1水晶 | 进群3个=1金币';
        }
    }
    
    if (gold + crystal + energy + essence > 0) {
        rewardBox.style.display = 'block';
        rewardItems.innerHTML = '';
        if (gold > 0) rewardItems.innerHTML += `<div class="reward-item"><span class="icon">🪙</span><span class="amount">+${gold}</span></div>`;
        if (crystal > 0) rewardItems.innerHTML += `<div class="reward-item"><span class="icon">💎</span><span class="amount">+${crystal}</span></div>`;
        if (energy > 0) rewardItems.innerHTML += `<div class="reward-item"><span class="icon">⚡</span><span class="amount">+${energy}</span></div>`;
        if (essence > 0) rewardItems.innerHTML += `<div class="reward-item"><span class="icon">✨</span><span class="amount">+${essence}</span></div>`;
    } else {
        rewardBox.style.display = 'none';
    }
    
    return { gold, crystal, energy, essence };
}

// 提交数据
function submitData() {
    const today = new Date().toDateString();
    if (gameData.lastDataSubmit === today) {
        alert('今天已经提交过了，明天再来吧！');
        return;
    }
    
    const rewards = calculateRewards();
    const total = rewards.gold + rewards.crystal + rewards.energy + rewards.essence;
    
    if (total === 0) {
        alert('请先填写数据！');
        return;
    }
    
    gameData.resources.gold += rewards.gold;
    gameData.resources.crystal += rewards.crystal;
    gameData.resources.energy += rewards.energy;
    gameData.resources.essence += rewards.essence;
    gameData.lastDataSubmit = today;
    
    GameStorage.save();
    updateUI();
    
    alert(`提交成功！\n🪙 金币 +${rewards.gold}\n💎 水晶 +${rewards.crystal}\n⚡ 能量 +${rewards.energy}\n✨ 精华 +${rewards.essence}`);
    showPage('mainMenu');
}

// 宠物商店
function showShop() {
    const container = document.getElementById('shopList');
    const myCamp = gameData.selectedCamp;
    const availablePokemon = pokemonDB.filter(p => !p.camp || p.camp === myCamp);
    
    container.innerHTML = availablePokemon.map(p => {
        const canAfford = gameData.resources[p.priceType] >= p.price;
        const priceEmoji = {gold:'🪙', crystal:'💎', energy:'⚡', essence:'✨'}[p.priceType];
        
        return `
            <div class="pokemon-card" style="opacity:${canAfford?1:0.5}">
                <div class="price">${priceEmoji}${p.price}</div>
                <div class="emoji">${p.emoji}</div>
                <div class="name">${p.name}</div>
                <div class="type">${getTypeName(p.type)}</div>
                <div class="stats">HP:${p.hp} 攻:${p.attack} 防:${p.defense}</div>
                <button class="btn ${canAfford?'btn-primary':'btn-secondary'}" style="margin-top:10px;width:100%" ${canAfford ? `onclick="buyPokemon(${p.id})"` : 'disabled'}>
                    ${canAfford ? '购买' : '资源不足'}
                </button>
            </div>
        `;
    }).join('');
    
    showPage('shopPage');
}

function getTypeName(type) {
    const types = {attack:'攻击型', defense:'防御型', support:'辅助型', special:'特殊型'};
    return types[type] || type;
}

function buyPokemon(pokemonId) {
    const pokemon = pokemonDB.find(p => p.id === pokemonId);
    if (!pokemon) return;
    
    if (gameData.resources[pokemon.priceType] < pokemon.price) {
        alert('资源不足！');
        return;
    }
    
    gameData.resources[pokemon.priceType] -= pokemon.price;
    
    const newPokemon = {
        ...pokemon,
        customName: pokemon.name,
        level: 1,
        exp: 0,
        expToNext: 100,
        currentHp: pokemon.hp,
        maxHp: pokemon.hp,
        moves: pokemon.moves.map(m => ({...m, currentPp: m.pp}))
    };
    
    gameData.myPokemons.push(newPokemon);
    GameStorage.save();
    updateUI();
    
    alert(`成功购买 ${pokemon.name}！`);
    showShop();
}

// 我的宠物
function showMyPokemons() {
    const container = document.getElementById('myPokemonList');
    
    if (gameData.myPokemons.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#aaa;padding:40px">还没有宠物，快去商店购买吧！</div>';
    } else {
        container.innerHTML = gameData.myPokemons.map((p, index) => `
            <div class="pokemon-card" onclick="showPokemonDetail(${index})">
                <div class="emoji">${p.emoji}</div>
                <div class="name">${p.customName}</div>
                <div style="color:#ffd700;font-size:0.9em">Lv.${p.level}</div>
                <div style="font-size:0.8em;color:#aaa">战力:${(p.attack+p.defense+p.speed)*10+p.level*50}</div>
            </div>
        `).join('');
    }
    
    showPage('pokemonPage');
}

function showPokemonDetail(index) {
    gameData.selectedPokemon = index;
    const p = gameData.myPokemons[index];
    const today = new Date().toDateString();
    
    // 计算今天还能喂食几次
    const feedToday = p.feedCount && p.feedCount[today] ? p.feedCount[today] : 0;
    const remainingFeeds = 5 - feedToday;
    
    const content = document.getElementById('pokemonDetailContent');
    content.innerHTML = `
        <div style="text-align:center;margin-bottom:20px">
            <div style="font-size:5em">${p.emoji}</div>
            <div style="font-size:1.5em;font-weight:bold;margin-top:10px">${p.customName}</div>
            <div style="color:#ffd700">Lv.${p.level} ${getTypeName(p.type)}</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-bottom:20px">
            <div class="stat-box">HP: ${p.currentHp}/${p.maxHp}</div>
            <div class="stat-box">攻击: ${p.attack}</div>
            <div class="stat-box">防御: ${p.defense}</div>
            <div class="stat-box">速度: ${p.speed}</div>
        </div>
        <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:15px;margin-bottom:20px">
            <div style="color:#aaa;margin-bottom:10px">经验: ${p.exp}/${p.expToNext}</div>
            <div style="background:#333;height:10px;border-radius:5px;overflow:hidden">
                <div style="background:linear-gradient(90deg,#ffd700,#ffaa00);height:100%;width:${(p.exp/p.expToNext)*100}%"></div>
            </div>
        </div>
        <div style="background:rgba(78,205,196,0.1);border-radius:12px;padding:15px;margin-bottom:20px;text-align:center">
            <div style="color:#4ecdc4;font-size:0.9em">今日喂食次数: ${feedToday}/5</div>
            <div style="color:#aaa;font-size:0.8em;margin-top:5px">${remainingFeeds > 0 ? `还能喂食 ${remainingFeeds} 次` : '今天已用完喂食次数'}</div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center">
            <button class="btn btn-primary" onclick="feedPokemon()" ${remainingFeeds <= 0 ? 'disabled style="opacity:0.5"' : ''}>🍖 喂食 (30金币)</button>
            <button class="btn btn-secondary" onclick="renamePokemon()">✏️ 改名</button>
        </div>
    `;
    
    showPage('pokemonDetailPage');
}

function feedPokemon() {
    const p = gameData.myPokemons[gameData.selectedPokemon];
    const today = new Date().toDateString();
    
    // 初始化喂食记录
    if (!p.feedCount) p.feedCount = {};
    if (!p.feedCount[today]) p.feedCount[today] = 0;
    
    // 检查今天是否已喂食5次
    if (p.feedCount[today] >= 5) {
        alert('今天已经喂食5次了，明天再来吧！');
        return;
    }
    
    if (gameData.resources.gold < 30) {
        alert('金币不足！需要30金币');
        return;
    }
    
    gameData.resources.gold -= 30;
    p.feedCount[today]++;
    p.currentHp = Math.min(p.currentHp + 10, p.maxHp);
    
    const stats = ['attack', 'defense', 'speed'];
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    const increase = Math.floor(Math.random() * 2) + 1;
    p[randomStat] += increase;
    
    p.exp += 5;
    if (p.exp >= p.expToNext) {
        levelUpPokemon();
    }
    
    GameStorage.save();
    updateUI();
    showPokemonDetail(gameData.selectedPokemon);
    
    const statNames = {attack:'攻击', defense:'防御', speed:'速度'};
    const remaining = 5 - p.feedCount[today];
    alert(`喂食成功！HP+10 ${statNames[randomStat]}+${increase} 经验+5\n今天还能喂食 ${remaining} 次`);
}

function renamePokemon() {
    const p = gameData.myPokemons[gameData.selectedPokemon];
    const newName = prompt('请输入新名字：', p.customName);
    if (newName && newName.trim()) {
        p.customName = newName.trim();
        GameStorage.save();
        showPokemonDetail(gameData.selectedPokemon);
    }
}

function levelUpPokemon() {
    const p = gameData.myPokemons[gameData.selectedPokemon];
    p.level++;
    p.exp = 0;
    p.expToNext = Math.floor(p.expToNext * 1.2);
    p.maxHp += 10;
    p.currentHp = p.maxHp;
    p.attack += 3;
    p.defense += 3;
    p.speed += 3;
    alert(`${p.customName} 升到 ${p.level} 级了！`);
}

// 生成分享链接
function generateShareLink() {
    const inviteData = {
        room: gameData.roomCode,
        camp: gameData.selectedCamp
    };
    const code = btoa(JSON.stringify(inviteData));
    const link = `${window.location.origin}${window.location.pathname}?invite=${code}`;
    return link;
}

// 排行榜（积分制）
function showRanking() {
    const container = document.getElementById('rankingList');
    const myCamp = gameData.selectedCamp;
    const campName = myCamp === 'service' ? '🔴 服务方' : '🔵 新开方';
    const campColor = myCamp === 'service' ? '#ff6b6b' : '#4ecdc4';
    
    // 模拟所有玩家数据（不同阵营）
    const mockPlayers = [
        { name: '张三', avatar: '😎', camp: 'service', team: '林瑞镜队', score: 580, battleWins: 28, teamBattleWins: 6 },
        { name: '李四', avatar: '🤠', camp: 'new', team: '蓝Buff队', score: 520, battleWins: 22, teamBattleWins: 6 },
        { name: '王五', avatar: '👽', camp: 'service', team: '谢晓珊队', score: 450, battleWins: 25, teamBattleWins: 4 },
        { name: '赵六', avatar: '🤖', camp: 'new', team: '巅峰开拓者', score: 420, battleWins: 22, teamBattleWins: 4 },
        { name: '钱七', avatar: '👻', camp: 'service', team: '林瑞镜队', score: 380, battleWins: 18, teamBattleWins: 4 },
        { name: '孙八', avatar: '😇', camp: 'new', team: '蓝Buff队', score: 350, battleWins: 15, teamBattleWins: 4 },
        { name: '周九', avatar: '🤡', camp: 'service', team: '谢晓珊队', score: 320, battleWins: 12, teamBattleWins: 4 },
        { name: '吴十', avatar: '💀', camp: 'new', team: '巅峰开拓者', score: 280, battleWins: 8, teamBattleWins: 4 }
    ];
    
    // 添加自己
    const allPlayers = [
        ...mockPlayers,
        { 
            name: gameData.player.name, 
            avatar: gameData.selectedAvatar, 
            camp: gameData.selectedCamp,
            team: gameData.player.team, 
            score: gameData.score || 0, 
            battleWins: gameData.battleWins || 0,
            teamBattleWins: gameData.teamBattleWins || 0,
            isMe: true 
        }
    ];
    
    // 按积分排序
    allPlayers.sort((a, b) => b.score - a.score);
    
    let html = `
        <div style="text-align:center;padding:15px;background:rgba(255,215,0,0.1);border-radius:12px;margin-bottom:15px;border:1px solid #ffd700">
            <div style="font-size:1.3em;font-weight:bold;color:#ffd700">🏆 全服排行榜</div>
            <div style="font-size:0.85em;color:#aaa;margin-top:5px">按积分排名 · 个人战+10分 · 团队战+50分</div>
        </div>
        
        <!-- 我的排名 -->
        <div style="background:rgba(78,205,196,0.1);border-radius:12px;padding:15px;margin-bottom:15px;border:1px solid #4ecdc4">
            <div style="text-align:center;color:#4ecdc4;font-size:0.9em;margin-bottom:10px">我的战绩</div>
            <div style="display:flex;justify-content:center;gap:30px">
                <div style="text-align:center">
                    <div style="font-size:1.5em;font-weight:bold;color:#ffd700">${gameData.score || 0}</div>
                    <div style="font-size:0.8em;color:#aaa">总积分</div>
                </div>
                <div style="text-align:center">
                    <div style="font-size:1.5em;font-weight:bold;color:#4ecdc4">${gameData.battleWins || 0}</div>
                    <div style="font-size:0.8em;color:#aaa">个人胜场</div>
                </div>
                <div style="text-align:center">
                    <div style="font-size:1.5em;font-weight:bold;color:#ff6b6b">${gameData.teamBattleWins || 0}</div>
                    <div style="font-size:0.8em;color:#aaa">团队胜场</div>
                </div>
            </div>
        </div>
    `;
    
    html += allPlayers.map((p, i) => {
        const playerCampColor = p.camp === 'service' ? '#ff6b6b' : '#4ecdc4';
        const playerCampName = p.camp === 'service' ? '🔴' : '🔵';
        return `
        <div style="display:flex;align-items:center;padding:15px;background:rgba(0,0,0,0.2);border-radius:12px;margin-bottom:10px;${p.isMe?'border:2px solid #ffd700':''}">
            <div style="font-size:1.5em;font-weight:bold;color:#ffd700;width:40px">#${i+1}</div>
            <div style="font-size:2em;margin-right:15px">${p.avatar}</div>
            <div style="flex:1">
                <div style="font-weight:bold">${p.name} ${p.isMe?'(你)':''}</div>
                <div style="font-size:0.85em;color:${playerCampColor}">${playerCampName} ${p.team}</div>
            </div>
            <div style="text-align:right">
                <div style="color:#ffd700;font-weight:bold;font-size:1.2em">${p.score}分</div>
                <div style="font-size:0.75em;color:#aaa">个人${p.battleWins}胜 · 团队${p.teamBattleWins}胜</div>
            </div>
        </div>
    `}).join('');
    
    container.innerHTML = html;
    showPage('rankingPage');
}

// 个人PK - 每天5次，全阵营可见
function startPersonalBattle() {
    if (gameData.myPokemons.length === 0) { alert('你还没有宠物！请先购买宠物。'); return; }
    
    const today = new Date().toDateString();
    const usedCount = gameData.personalBattleCount[today] || 0;
    
    if (usedCount >= 5) {
        alert('今天的个人PK次数已用完（每天5次），明天再来吧！');
        return;
    }
    
    // 模拟所有阵营的对手
    const opponents = [
        { name: '张三', avatar: '😎', power: 2500, camp: 'service', team: '林瑞镜队' },
        { name: '李四', avatar: '🤠', power: 1800, camp: 'new', team: '蓝Buff队' },
        { name: '王五', avatar: '👽', power: 1200, camp: 'service', team: '谢晓珊队' },
        { name: '赵六', avatar: '🤖', power: 2200, camp: 'new', team: '巅峰开拓者' },
        { name: '钱七', avatar: '👻', power: 1500, camp: 'service', team: '林瑞镜队' }
    ];
    
    const container = document.getElementById('battleSelectContent');
    const remaining = 5 - usedCount;
    
    container.innerHTML = `
        <div style="text-align:center;padding:10px;background:rgba(255,215,0,0.2);border-radius:12px;margin-bottom:15px;border:1px solid #ffd700">
            <div style="font-size:1.2em;font-weight:bold;color:#ffd700">⚔️ 个人PK模式</div>
            <div style="font-size:0.9em;color:#aaa;margin-top:5px">今日剩余次数: ${remaining}/5</div>
        </div>
        ${opponents.map(p => {
            const campColor = p.camp === 'service' ? '#ff6b6b' : '#4ecdc4';
            const campName = p.camp === 'service' ? '🔴 服务方' : '🔵 新开方';
            return `
            <div style="display:flex;align-items:center;padding:15px;background:rgba(0,0,0,0.2);border-radius:12px;margin-bottom:10px;cursor:pointer" onclick="startBattleWith('${p.name}', ${p.power}, 'personal')">
                <div style="font-size:2.5em;margin-right:15px">${p.avatar}</div>
                <div style="flex:1">
                    <div style="font-weight:bold">${p.name}</div>
                    <div style="font-size:0.85em;color:${campColor}">${campName} · ${p.team}</div>
                </div>
                <div style="text-align:right">
                    <div style="color:#ffd700;font-weight:bold">⚔️ ${p.power}</div>
                </div>
            </div>
        `}).join('')}
    `;
    
    showPage('battleSelectPage');
}

// 团队战 - 每天1次，只能挑战对方队伍
function startTeamBattle() {
    if (gameData.myPokemons.length === 0) { alert('你还没有宠物！请先购买宠物。'); return; }
    
    const today = new Date().toDateString();
    const usedCount = gameData.teamBattleCount[today] || 0;
    
    if (usedCount >= 1) {
        alert('今天的团队战次数已用完（每天1次），明天再来吧！');
        return;
    }
    
    const myCamp = gameData.selectedCamp;
    const myTeam = gameData.player.team;
    
    // 根据阵营和队伍确定对方队伍
    let opponentTeam, opponentCamp;
    if (myCamp === 'service') {
        opponentCamp = 'service';
        opponentTeam = myTeam === '林瑞镜队' ? '谢晓珊队' : '林瑞镜队';
    } else {
        opponentCamp = 'new';
        opponentTeam = myTeam === '蓝Buff队' ? '巅峰开拓者' : '蓝Buff队';
    }
    
    // 模拟对方队伍的玩家
    const opponents = [
        { name: '敌方队长', avatar: '😎', power: 2800, team: opponentTeam },
        { name: '敌方精英', avatar: '🤠', power: 2200, team: opponentTeam },
        { name: '敌方成员', avatar: '👽', power: 1600, team: opponentTeam }
    ];
    
    const container = document.getElementById('battleSelectContent');
    const campColor = myCamp === 'service' ? '#ff6b6b' : '#4ecdc4';
    
    container.innerHTML = `
        <div style="text-align:center;padding:10px;background:${campColor}22;border-radius:12px;margin-bottom:15px;border:1px solid ${campColor}">
            <div style="font-size:1.2em;font-weight:bold;color:${campColor}">🛡️ 团队战模式</div>
            <div style="font-size:0.9em;color:#aaa;margin-top:5px">${myTeam} VS ${opponentTeam}</div>
            <div style="font-size:0.85em;color:#ffd700;margin-top:5px">今日剩余次数: ${1 - usedCount}/1</div>
        </div>
        <p style="text-align:center;color:#aaa;margin-bottom:15px">击败对方队伍成员，为全队赢取奖励！</p>
        ${opponents.map(p => `
            <div style="display:flex;align-items:center;padding:15px;background:rgba(0,0,0,0.2);border-radius:12px;margin-bottom:10px;cursor:pointer" onclick="startBattleWith('${p.name}', ${p.power}, 'team')">
                <div style="font-size:2.5em;margin-right:15px">${p.avatar}</div>
                <div style="flex:1">
                    <div style="font-weight:bold">${p.name}</div>
                    <div style="font-size:0.85em;color:${campColor}">${p.team}</div>
                </div>
                <div style="text-align:right">
                    <div style="color:#ffd700;font-weight:bold">⚔️ ${p.power}</div>
                </div>
            </div>
        `).join('')}
    `;
    
    showPage('battleSelectPage');
}

function startBattleWith(opponentName, opponentPower, battleMode) {
    // 检查战斗次数
    const today = new Date().toDateString();
    if (battleMode === 'personal') {
        const usedCount = gameData.personalBattleCount[today] || 0;
        if (usedCount >= 5) {
            alert('今天的个人PK次数已用完！');
            return;
        }
    } else if (battleMode === 'team') {
        const usedCount = gameData.teamBattleCount[today] || 0;
        if (usedCount >= 1) {
            alert('今天的团队战次数已用完！');
            return;
        }
    }
    
    const myPokemon = gameData.myPokemons[0];
    const opponentCamp = gameData.selectedCamp;
    const opponentPokemons = pokemonDB.filter(p => !p.camp || p.camp === opponentCamp);
    const enemyTemplate = opponentPokemons[Math.floor(Math.random() * opponentPokemons.length)];
    
    const powerRatio = opponentPower / 2000;
    const enemyPokemon = {
        ...enemyTemplate,
        name: opponentName + '的' + enemyTemplate.name,
        currentHp: Math.floor(enemyTemplate.hp * powerRatio),
        maxHp: Math.floor(enemyTemplate.hp * powerRatio),
        attack: Math.floor(enemyTemplate.attack * powerRatio),
        defense: Math.floor(enemyTemplate.defense * powerRatio),
        speed: Math.floor(enemyTemplate.speed * powerRatio),
        moves: enemyTemplate.moves.map(m => ({...m, currentPp: m.pp}))
    };
    
    gameData.currentBattle = {
        player: {...myPokemon},
        enemy: enemyPokemon,
        opponentName: opponentName,
        turn: 1,
        mode: battleMode // 记录战斗模式
    };
    
    updateBattleUI();
    showPage('battlePage');
    addBattleLog(`⚔️ 战斗开始！你挑战了 ${opponentName}！`);
}

function updateBattleUI() {
    const battle = gameData.currentBattle;
    document.getElementById('playerEmoji').textContent = battle.player.emoji;
    document.getElementById('playerName').textContent = battle.player.customName;
    
    const playerHpPercent = (battle.player.currentHp / battle.player.maxHp) * 100;
    document.getElementById('playerHpBar').style.width = `${playerHpPercent}%`;
    document.getElementById('playerHpBar').textContent = `${battle.player.currentHp}/${battle.player.maxHp}`;
    document.getElementById('playerHpBar').className = `hp-fill ${playerHpPercent > 50 ? 'high' : playerHpPercent > 25 ? 'medium' : 'low'}`;
    
    document.getElementById('enemyEmoji').textContent = battle.enemy.emoji;
    document.getElementById('enemyName').textContent = battle.enemy.name;
    
    const enemyHpPercent = (battle.enemy.currentHp / battle.enemy.maxHp) * 100;
    document.getElementById('enemyHpBar').style.width = `${enemyHpPercent}%`;
    document.getElementById('enemyHpBar').textContent = `${battle.enemy.currentHp}/${battle.enemy.maxHp}`;
    document.getElementById('enemyHpBar').className = `hp-fill ${enemyHpPercent > 50 ? 'high' : enemyHpPercent > 25 ? 'medium' : 'low'}`;
    
    // 技能按钮
    const movesGrid = document.getElementById('movesGrid');
    movesGrid.innerHTML = battle.player.moves.map((m, i) => `
        <button class="move-btn move-${m.power > 0 ? 'attack' : 'support'}" onclick="useMove(${i})" ${m.currentPp <= 0 ? 'disabled' : ''}>
            <span class="pp">${m.currentPp}/${m.pp}</span>
            <span class="name">${m.name}</span>
            <span class="info">威力:${m.power}</span>
        </button>
    `).join('');
}

function useMove(moveIndex) {
    const battle = gameData.currentBattle;
    const move = battle.player.moves[moveIndex];
    
    if (move.currentPp <= 0) return;
    move.currentPp--;
    
    if (move.power > 0) {
        const damage = Math.max(1, Math.floor((battle.player.attack * move.power / 100) - (battle.enemy.defense / 10) * (0.8 + Math.random() * 0.4)));
        battle.enemy.currentHp = Math.max(0, battle.enemy.currentHp - damage);
        addBattleLog(`${battle.player.customName} 使用 ${move.name}，造成 <span class="damage">${damage}</span> 伤害！`);
    } else {
        addBattleLog(`${battle.player.customName} 使用 ${move.name}！`);
    }
    
    updateBattleUI();
    
    if (battle.enemy.currentHp <= 0) {
        setTimeout(() => endBattle(true), 500);
        return;
    }
    
    setTimeout(() => enemyTurn(), 800);
}

function enemyTurn() {
    const battle = gameData.currentBattle;
    const availableMoves = battle.enemy.moves.filter(m => m.currentPp > 0);
    
    if (availableMoves.length === 0) {
        addBattleLog(`${battle.enemy.name} 没有PP了！`);
        setTimeout(() => endBattle(true), 500);
        return;
    }
    
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    move.currentPp--;
    
    if (move.power > 0) {
        const damage = Math.max(1, Math.floor((battle.enemy.attack * move.power / 100) - (battle.player.defense / 10) * (0.8 + Math.random() * 0.4)));
        battle.player.currentHp = Math.max(0, battle.player.currentHp - damage);
        addBattleLog(`${battle.enemy.name} 使用 ${move.name}，造成 <span class="damage">${damage}</span> 伤害！`);
    } else {
        addBattleLog(`${battle.enemy.name} 使用 ${move.name}！`);
    }
    
    updateBattleUI();
    
    if (battle.player.currentHp <= 0) {
        setTimeout(() => endBattle(false), 500);
    }
}

function addBattleLog(message) {
    const log = document.getElementById('battleLog');
    log.innerHTML += `<div class="entry">${message}</div>`;
    log.scrollTop = log.scrollHeight;
}

function endBattle(win) {
    const modal = document.getElementById('resultModal');
    const emoji = document.getElementById('resultEmoji');
    const title = document.getElementById('resultTitle');
    const message = document.getElementById('resultMessage');
    const rewards = document.getElementById('resultRewards');
    const battle = gameData.currentBattle;
    const today = new Date().toDateString();
    
    let rewardText = '';
    let scoreChange = 0;
    
    if (win) {
        // 根据战斗模式计算奖励
        if (battle.mode === 'personal') {
            // 个人PK奖励
            const goldReward = Math.floor(Math.random() * 30) + 20;
            gameData.resources.gold += goldReward;
            scoreChange = 10; // 个人战胜利+10分
            gameData.score += scoreChange;
            gameData.battleWins++;
            
            // 记录战斗次数
            if (!gameData.personalBattleCount[today]) gameData.personalBattleCount[today] = 0;
            gameData.personalBattleCount[today]++;
            
            rewardText = `<div>🪙 金币 +${goldReward}</div><div>⭐ 经验 +30</div><div>🏆 积分 +${scoreChange}</div>`;
        } else if (battle.mode === 'team') {
            // 团队战奖励（更丰厚）
            const goldReward = 100;
            const crystalReward = 10;
            const energyReward = 10;
            const essenceReward = 10;
            
            gameData.resources.gold += goldReward;
            gameData.resources.crystal += crystalReward;
            gameData.resources.energy += energyReward;
            gameData.resources.essence += essenceReward;
            
            scoreChange = 50; // 团队战胜利+50分
            gameData.score += scoreChange;
            gameData.teamBattleWins++;
            
            // 记录战斗次数
            if (!gameData.teamBattleCount[today]) gameData.teamBattleCount[today] = 0;
            gameData.teamBattleCount[today]++;
            
            rewardText = `<div>🪙 金币 +${goldReward}</div><div>💎 水晶 +${crystalReward}</div><div>⚡ 能量 +${energyReward}</div><div>✨ 精华 +${essenceReward}</div><div>🏆 积分 +${scoreChange}</div><div style="color:#ffd700;margin-top:10px">🎉 团队战胜利！全队获得奖励！</div>`;
        }
        
        // 宠物加经验
        const p = gameData.myPokemons[0];
        if (p) {
            p.exp += 30;
            if (p.exp >= p.expToNext) {
                gameData.selectedPokemon = 0;
                levelUpPokemon();
            }
        }
        
        GameStorage.save();
        updateUI();
        
        emoji.textContent = '🏆';
        title.textContent = '胜利！';
        message.textContent = '恭喜你赢得了这场战斗！';
        rewards.innerHTML = `<div>🎁 获得奖励：</div>${rewardText}`;
    } else {
        // 失败也记录次数
        if (battle.mode === 'personal') {
            if (!gameData.personalBattleCount[today]) gameData.personalBattleCount[today] = 0;
            gameData.personalBattleCount[today]++;
        } else if (battle.mode === 'team') {
            if (!gameData.teamBattleCount[today]) gameData.teamBattleCount[today] = 0;
            gameData.teamBattleCount[today]++;
        }
        
        GameStorage.save();
        
        emoji.textContent = '💔';
        title.textContent = '战败';
        message.textContent = '不要气馁，继续培养宠物再来挑战！';
        rewards.innerHTML = '<div style="color:#aaa">下次再接再厉！</div>';
    }
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('resultModal').classList.remove('active');
    showPage('mainMenu');
}

// 设置
function showSettings() {
    const roomCode = document.getElementById('settingsRoomCode');
    if (roomCode) roomCode.textContent = gameData.roomCode;
    
    // 生成分享链接
    const shareLink = generateShareLink();
    const shareArea = document.getElementById('shareLinkArea');
    if (shareArea) shareArea.value = shareLink;
    
    showPage('settingsPage');
}

function copyShareLink() {
    const shareArea = document.getElementById('shareLinkArea');
    if (shareArea) {
        shareArea.select();
        document.execCommand('copy');
        alert('链接已复制！发给队友即可加入同房间');
    }
}

function changeRoom() {
    const newRoom = prompt('请输入房间码（6位）：', gameData.roomCode);
    if (newRoom && newRoom.trim().length >= 4) {
        gameData.roomCode = newRoom.trim().toUpperCase();
        GameStorage.save();
        alert(`已切换到房间：${gameData.roomCode}`);
        updateUI();
    }
}

function resetGame() {
    if (confirm('确定要重置游戏吗？所有数据将被清除！')) {
        GameStorage.clear();
        location.reload();
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', init);
