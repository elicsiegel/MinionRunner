!function(i){var e={};function t(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return i[s].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=i,t.c=e,t.d=function(i,e,s){t.o(i,e)||Object.defineProperty(i,e,{enumerable:!0,get:s})},t.r=function(i){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},t.t=function(i,e){if(1&e&&(i=t(i)),8&e)return i;if(4&e&&"object"==typeof i&&i&&i.__esModule)return i;var s=Object.create(null);if(t.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:i}),2&e&&"string"!=typeof i)for(var n in i)t.d(s,n,function(e){return i[e]}.bind(null,n));return s},t.n=function(i){var e=i&&i.__esModule?function(){return i.default}:function(){return i};return t.d(e,"a",e),e},t.o=function(i,e){return Object.prototype.hasOwnProperty.call(i,e)},t.p="",t(t.s=0)}([function(i,e,t){"use strict";t.r(e);class s{constructor(i){this.position=i.position,this.images=[new Image,new Image,new Image],this.images[0].src="./assets/minion.png",this.images[1].src="./assets/minion2.png",this.images[2].src="./assets/surprised_minion.png",this.width=50,this.height=50,this.velocity=10,this.tickCount=0,this.ticksPerFrame=4,this.frameIndex=0}update(){this.tickCount+=1,this.jumping||this.tickCount>this.ticksPerFrame&&(this.tickCount=0,0===this.frameIndex?this.frameIndex=1:this.frameIndex=0),this.jumping&&(this.frameIndex=0)}render(i){this.jump(),this.draw(i)}isCollidedWith(i){return this.position[0]<i.position[0]+i.width&&this.position[0]+this.width>i.position[0]&&this.position[1]<i.position[1]+i.height&&this.position[1]+this.height>i.position[1]}jump(){this.jumping&&(this.velocity>-10?(this.position[1]-=this.velocity,this.velocity-=.3):(this.position[1]=250,this.velocity=10,this.jumping=!1))}draw(i){i.drawImage(this.images[this.frameIndex],this.position[0],this.position[1],this.width,this.height)}}class n{constructor(i){this.position=i.position,this.resetPosition=i.resetPosition,this.velocity=i.velocity,this.width=i.width,this.height=i.height,this.frameIndex=0,this.srcs=i.srcs,this.generateImages(),this.tickCount=0,this.ticksPerFrame=4,this.timesPassed=0,this.activated=!0}generateImages(){this.images=[];for(let i=0;i<this.srcs.length;i++)this.images.push(new Image),this.images[i].src=this.srcs[i]}update(){this.images.length>1?(this.tickCount+=1,this.tickCount>this.ticksPerFrame&&(this.tickCount=0,this.frameIndex+=1,5===this.frameIndex&&(this.frameIndex=0))):this.frameIndex=0}render(i){this.move(),this.draw(i)}move(){this.position[0]<=-45?(this.position[0]=this.resetPosition,this.timesPassed+=1):this.position[0]-=this.velocity}draw(i){i.drawImage(this.images[this.frameIndex],this.position[0],this.position[1],this.width,this.height)}}class o{constructor(i){this.game=i,this.position=[600,50],this.width=300,this.height=300,this.score=0,this.highScore=null}renderStageCompletion(i){i.font="25px Work Sans",i.fillText("Oh no! Evil Minions are on the loose!",200,80)}renderSurvivalCompletion(i){i.font="25px Work Sans",i.fillText("You survived the Evil Minions!",200,80)}render(i){this.draw(i)}draw(i){this.score+=1,i.font="20px Work Sans",i.fillText(`Score: ${this.score}`,650,40),i.font="15px Work Sans",i.fillText(`Local High Score: ${this.game.prevHighScore}`,600,20),void 0!==this.game.globalHighScore&&i.fillText(`Global High Score: ${this.game.globalHighScore}`,350,20),this.game.muted?i.fillText("Muted (click screen to toggle mute)",10,20):i.fillText("Umuted (click screen to toggle mute)",10,20)}drawGameOverText(i){null===this.highScore&&(this.highScore=this.score),this.score>this.highScore&&(this.highScore=this.score,i.fillText(`New High Score!: ${this.score}`,200,40)),i.font="20px Work Sans",i.fillText(`Final Score: ${this.score} Press r to restart game`,200,40)}}var a=Database={fetchHighScores(i,e){i.ref("scores/").on("value",i=>{document.getElementById("highscore1").textContent="1: "+i.val().highscore,document.getElementById("highscore2").textContent="2: "+i.val().highscore2,document.getElementById("highscore3").textContent="3: "+i.val().highscore3,e.globalLeaderScores=i.val(),e.globalHighScore=e.globalLeaderScores.highscore})},setHighScores(i,e){e.menu.score>e.globalLeaderScores.highscore?(i.ref("scores/highscore3").set(e.globalLeaderScores.highscore2),i.ref("scores/highscore2").set(e.globalLeaderScores.highscore),i.ref("scores/highscore").set(e.menu.score)):e.menu.score>e.globalLeaderScores.highscore2?(i.ref("scores/highscore3").set(e.globalLeaderScores.highscore2),i.ref("scores/highscore2").set(e.menu.score)):e.menu.score>e.globalLeaderScores.highscore3&&i.ref("scores/highscore3").set(e.menu.score)}};const h={minionPosition:[10,250],evilMinionOnePosition:[900,250],evilMinionTwoPosition:[1200,250],evilMinionThreePosition:[1500,250],evilMinionFourPosition:[1800,250],skyscraperOnePosition:[725,200],skyscraperTwoPosition:[1200,200],flyingObstaclePosition:[2e3,60]};class r{constructor(i,e,t){this.ctx=i,this.canvas=e,this.database=t,this.gameOver=!1,this.draw=this.draw.bind(this),this.setKeyboardListeners(),this.setEventListeners(),this.muted=!1,this.jumpSound=new Audio("./assets/audio/jump1.m4a"),this.gameOverSound=new Audio("./assets/audio/game_over.mp3"),this.prevHighScore=0,this.stageCount=0,this.getHighScores()}setKeyboardListeners(){document.addEventListener("keydown",i=>{switch(i.keyCode){case 32:this.activateJump();break;case 82:this.gameOver&&this.resetGame();break;case 80:this.togglePause()}}),document.querySelector(".jump-button").addEventListener("click",()=>{this.activateJump()})}setEventListeners(){this.canvas.addEventListener("click",i=>this.mute(i))}mute(){!1===this.muted?this.muted=!0:this.muted=!1}resetGame(){this.menu.highScore>this.prevHighScore&&(this.prevHighScore=this.menu.highScore),this.start(this.difficulty)}togglePause(){!1===this.paused?(this.canvas.classList.add("paused"),this.paused=!0):(this.canvas.classList.remove("paused"),this.paused=!1,this.draw())}activateJump(){this.muted||this.minion.jumping||this.gameOver||this.jumpSound.play(),this.minion.jumping=!0,this.minion.imageCount=0}manageGameOver(){this.gameOver=!0,this.finalFrame=!0}manageEvilMinion(i){i.update(),i.render(this.ctx),this.minion.isCollidedWith(i)&&this.manageGameOver(),i.timesPassed>1&&(i.activated=!1)}unleashEvilMinions(){this.evilMinion.activated&&this.manageEvilMinion(this.evilMinion),this.evilMinion2.activated&&this.manageEvilMinion(this.evilMinion2),this.evilMinion3.activated&&this.manageEvilMinion(this.evilMinion3),this.evilMinion4.activated&&this.manageEvilMinion(this.evilMinion4)}prepareStageTwo(){this.stageCount>880&&this.stageCount<1e3&&(this.stage=2,this.menu.renderStageCompletion(this.ctx),this.evilMinion.position=[900,250],this.evilMinion2.position=[1200,250],this.evilMinion3.position=[1500,250],this.evilMinion4.position=[1800,250],this.evilMinion.activated=!0,this.evilMinion.timesPassed=0,this.evilMinion2.activated=!0,this.evilMinion2.timesPassed=0,this.evilMinion3.activated=!0,this.evilMinion3.timesPassed=0,this.evilMinion4.activated=!0,this.evilMinion4.timesPassed=0)}resetToStageOne(){this.stageCount>1700&&this.menu.renderSurvivalCompletion(this.ctx),this.stageCount>1800&&(this.stageCount=0,this.stage=1,this.obstacle.position=[725,200],this.obstacle2.position=[1200,200],this.obstacle.activated=!0,this.obstacle2.activated=!0,this.flyingObstacle&&(this.flyingObstacle.position=[2e3,60],this.flyingObstacle.activated=!0))}drawStageOne(){this.obstacle.activated&&(this.obstacle.render(this.ctx),this.minion.isCollidedWith(this.obstacle)&&this.manageGameOver(),this.obstacle.timesPassed>2&&(this.obstacle.activated=!1,this.obstacle.timesPassed=0)),this.obstacle2.activated&&(this.obstacle2.render(this.ctx),this.minion.isCollidedWith(this.obstacle2)&&this.manageGameOver(),this.obstacle2.timesPassed>2&&(this.obstacle2.activated=!1,this.obstacle2.timesPassed=0)),"medium-start"!==this.difficulty&&"hard-start"!==this.difficulty||this.flyingObstacle.activated&&(this.flyingObstacle.render(this.ctx),this.minion.isCollidedWith(this.flyingObstacle)&&this.manageGameOver(),this.flyingObstacle.timesPassed>2&&(this.flyingObstacle.activated=!1,this.flyingObstacle.timesPassed=0))}draw(){this.gameOver||this.paused||(this.stageCount+=1,this.ctx.clearRect(0,0,800,300),requestAnimationFrame(this.draw),this.menu.render(this.ctx),this.minion.update(),this.minion.render(this.ctx),this.prepareStageTwo(),this.resetToStageOne(),1===this.stage&&this.drawStageOne(),2===this.stage&&this.unleashEvilMinions()),this.finalFrame&&(this.ctx.clearRect(0,0,800,300),this.menu.render(this.ctx),this.setHighScores(),this.minion.frameIndex=2,this.minion.render(this.ctx),1===this.stage&&(this.obstacle.render(this.ctx),this.obstacle2.render(this.ctx),"medium-start"!==this.difficulty&&"hard-start"!==this.difficulty||this.flyingObstacle.render(this.ctx)),2===this.stage&&(this.evilMinion.render(this.ctx),this.evilMinion2.render(this.ctx),this.evilMinion3.render(this.ctx),this.evilMinion4.render(this.ctx))),this.gameOver&&(this.finalFrame=!1,this.canvas.classList.add("paused"),this.muted||this.gameOverSound.play(),this.menu.drawGameOverText(this.ctx))}generateMenu(){this.menu=new o(this)}setDifficulty(){const{minionPosition:i,evilMinionOnePosition:e,evilMinionTwoPosition:t,evilMinionThreePosition:s,evilMinionFourPosition:n,skyscraperOnePosition:o,skyscraperTwoPosition:a,flyingObstaclePosition:r}=h,c={minionPosition:i,skyscraperVelocity:4,airplaneVelocity:4,obstacleResetPosition:1100,evilMinionHeight:50,evilMinionWidth:50,evilMinionVelocity:4,evilMinionOnePosition:e,evilMinionTwoPosition:t,evilMinionThreePosition:s,evilMinionFourPosition:n,skyscraperOnePosition:o,skyscraperTwoPosition:a,flyingObstaclePosition:r,flyingObstacleResetPosition:2e3,skyscraperImage:"./assets/skyscraper.png",skyscraperWidth:80,skyscraperHeight:100,skyscraper2Image:"./assets/fat-tall-sky.png",evilMinionSrcs:["./assets/evil_minion1.png","./assets/evil_minion2.png","./assets/evil_minion3.png","./assets/evil_minion4.png","./assets/evil_minion5.png","./assets/evil_minion6.png"]},l={skyscraperVelocity:4,airplaneVelocity:10},d={skyscraperVelocity:5,airplaneVelocity:12};switch(this.difficulty){case"easy-start":return Object.assign({},c);case"medium-start":return Object.assign({},c,l);case"hard-start":return Object.assign({},c,d);default:return Object.assign({},c)}}generatePieces(){let i=this.setDifficulty();this.minion=new s({position:i.minionPosition}),this.obstacle=new n({position:i.skyscraperOnePosition,resetPosition:i.obstacleResetPosition,velocity:i.skyscraperVelocity,width:i.skyscraperWidth,height:i.skyscraperHeight,srcs:[i.skyscraperImage]}),this.obstacle2=new n({position:i.skyscraperTwoPosition,resetPosition:i.obstacleResetPosition,velocity:i.skyscraperVelocity,width:i.skyscraperWidth,height:i.skyscraperHeight,srcs:[i.skyscraper2Image]}),this.evilMinion=new n({position:i.evilMinionOnePosition,resetPosition:i.obstacleResetPosition,velocity:i.evilMinionVelocity,width:i.evilMinionWidth,height:i.evilMinionHeight,srcs:i.evilMinionSrcs}),this.evilMinion2=new n({position:i.evilMinionTwoPosition,resetPosition:i.obstacleResetPosition,velocity:i.evilMinionVelocity,width:i.evilMinionWidth,height:i.evilMinionHeight,srcs:i.evilMinionSrcs}),this.evilMinion3=new n({position:i.evilMinionThreePosition,resetPosition:i.obstacleResetPosition,velocity:i.evilMinionVelocity,width:i.evilMinionWidth,height:i.evilMinionHeight,srcs:i.evilMinionSrcs}),this.evilMinion4=new n({position:i.evilMinionFourPosition,resetPosition:i.obstacleResetPosition,velocity:i.evilMinionVelocity,width:i.evilMinionWidth,height:i.evilMinionHeight,srcs:i.evilMinionSrcs}),"medium-start"!==this.difficulty&&"hard-start"!==this.difficulty||(this.flyingObstacle=new n({position:i.flyingObstaclePosition,resetPosition:i.flyingObstacleResetPosition,velocity:i.airplaneVelocity,width:50,height:40,srcs:["./assets/airplane.png"]}))}getHighScores(){a.fetchHighScores(this.database,this)}setHighScores(){a.setHighScores(this.database,this)}start(i){this.canvas.classList.remove("paused"),this.canvas.focus(),this.difficulty=i,this.stage=1,this.stageCount=0,this.paused=!1,this.gameOver=!1,this.generateMenu(this),this.generatePieces(),this.draw()}}document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("game-canvas"),e=i.getContext("2d");firebase.initializeApp({apiKey:"AIzaSyBkc22wgBkJD-I-jOz20CbzBDLNm25mqnw",authDomain:"minionrunner-c5d40.firebaseapp.com",databaseURL:"https://minionrunner-c5d40.firebaseio.com",projectId:"minionrunner-c5d40",storageBucket:"",messagingSenderId:"522343975744"});const t=firebase.database(),s=new r(e,i,t);document.querySelector(".menu-buttons").addEventListener("click",i=>{const e=document.querySelector(".game-area"),t=document.querySelector(".menu"),n=document.querySelector(".jump-button"),o=document.querySelector(".global-high-scores");e.classList.remove("hide"),n.classList.remove("hide"),t.classList.add("hide"),o.classList.add("hide"),setTimeout(()=>s.start(i.target.id),200)})})}]);
//# sourceMappingURL=bundle.js.map