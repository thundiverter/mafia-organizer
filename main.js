const { createApp } = Vue;

createApp({
 data() {
  return {
   currentTab: 0,
   roles: roles,
   usedRoles: [],
   svg: svg,
   time: {day: 'День', night: 'Ночь'},
   players: [
    {name: '', roleid: 0, dead: false}
   ],
   playersAll: this.players,
   currentTurn: 0,
   turns: [
    {time: 'night', kill: -1, heal: -1, check: -1, don: -1, maniac: -1}
   ]
  }
 },
 methods: {
  createNewPlayer() {
   this.players.push(
    {name: '', roleid: 0, dead: false}
   )
  },
  
  removePlayer(id) {
   this.players.splice(id, 1);
  },
  
  startNewTurn() {
   const lturn = this.turns[0];
   //console.log(lturn.vote)
  
   if (this.currentTurn % 2 == 1) {
    if (lturn.vote != -1) {
     this.players[lturn.vote].dead = true;
    }
    
    this.turns.unshift(
     {time: 'night', kill: -1, heal: -1, check: -1, don: -1, maniac: -1}
    )
   }
   else {
    if (lturn.kill != -1 && lturn.kill != lturn.heal) {
     this.players[lturn.kill].dead = true;
    }
   
    this.turns.unshift(
     {time: 'day', vote: -1}
    )
   }
   this.currentTurn += 1;
   
   //this.playersAll = this.players;
  },
  
  getTurn(turnid, turn) {
   if (turn.time == 'night') {
    return (this.turns.length - turnid+1)/2;
   }
   else {
    return (this.turns.length - turnid) / 2;
   }
   
   return ( (this.currentTurn - this.currentTurn%2)/2 - (turnid - turnid%2)/2 ) + 1;
  },
  
  getStatistics(turn) {
   return 0;
  }
 },
 computed: {
  isPlaying() {
   flag = true;
   for (player of this.players) {
    if (player.name === '') {
     flag = false;
     break;
    }
   }
   return flag;
  },
  playersAlive() {
   let res = [];
   for (i in this.players) {
    this.players[i]['id'] = i;
    if (!this.players[i].dead) {
     res.push(this.players[i]);
    }
   }
   return res;
  }
 }
}).mount('#app');
