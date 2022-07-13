const { createApp } = Vue;

createApp({
 data() {
  return {
   roles: [
    ['Мирный житель', 'Выбран голосованием', '', 'мирных жителей'],
    ['Мафия', 'Мафия убила', 'kill', 'мафий'],
    ['Комиссар', 'Комиссар проверил', 'check', 'комиссаров'],
    ['Доктор', 'Доктор вылечил', 'heal', 'докторов']
   ],
   users: [
    {index: 0, name: '', role: 0, dead: false}
   ],
   turns: [],
   players: [],
   isPlaying: false,
   currentTurn: 0,
   lastPlayerIndex: 0,
   stat: {
    killed: [],
    healed: [],
    checked: [],
    killhealed: [],
    voteed: []
   },
   gameEnd: ['', '']
  }
 },
 methods: {
  updatePlayers() {
   const rows = document.querySelectorAll('#playerRow');
   this.users = [];
   for (row of rows) {
    const rname = row.querySelector('input');
    const rrole = row.querySelector('select');
    this.users.push({name: rname.value, role: rrole.value, dead: false});
   }
  },
  addPlayer() {
   this.updatePlayers();
   this.lastPlayerIndex += 1;
   this.users.push({name: '', role: 0, dead: false});
  },
  removePlayer(id) {
   this.updatePlayers();
   this.users.splice(id, 1);
  },
  startGame() {
   this.updatePlayers();
   this.players = this.users;
   this.isPlaying = true;
   this.startNewTurn();
  },
  stats(s) {
  this.stat[s+'ed'].push(this.users[this.turns[1][s]].name);
  },
  startNewTurn() {
  
  const t = this.turns[0];
   if (this.currentTurn < 1 || (this.currentTurn >= 1 && t.kill != -1 && t.vote != -1)) {
    
   // new turn
  
   this.turns.unshift(
     {kill: -1, check: -1, heal: -1, vote: -1}
   );
  
   
   this.currentTurn += 1;
   
   if (this.currentTurn > 1) {
    const lastTurn = this.turns[1];
   
    
    // player is killed
    if (lastTurn.kill != lastTurn.heal) {
     this.users[lastTurn.kill].dead = true;
     this.stats('kill');
    }
    // player is killhealed
    if (lastTurn.kill == lastTurn.heal) {
     lastTurn.killheal = lastTurn.heal;
     this.stats('killheal');
    }
    
    // player is kicked
    if (lastTurn.vote >= 0) {
     this.users[lastTurn.vote].dead = true;
     this.stats('vote');
    }
    
    // other stats
    if (lastTurn.heal >= 0) { this.stats('heal'); }
    if (lastTurn.check >= 0) { this.stats('check'); }
    
    }
   }
  },
  isCurrentTurn(turnid) {
   return this.currentTurn == this.turns.length - turnid;
  },
  changeTurnInfo (e, turnid, act) {
   this.turns[turnid][act] = e.target.value;
  },
  amountof(r) {
   let count = 0;
   for (user of this.users) {
    if (user.role === r) {
     count += 1;
    }
   }
   return count + ' ' + this.roles[r][3];
  }
 },
 computed: {
 // Returns a list of players who are still alive
  playersAlive: function() {
   let res = [];
   const p = this.users;
   for (i in p) {
    p[i]["index"] = i;
    //p[i]["name"] += i;
    if (!p[i].dead) {
     res.push(p[i]);
    }
   }
   return res;
   //return this.players.filter(i => !i.dead);
  }
 }
}).mount('#app');
