/*Crafty.init(500,500, document.getElementById('game'));
Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 500, h: 500}).color('#F00');*/

var width = 1400, height = 800;
var player;
var compteurCarre = 1;
var compteurCarre2 = 1;
var carre = "Carre";
var carre2 = "carré";
var vies = 3;
var affichScore;
var affichVie;
var score = 0;

Crafty.defineScene("Looser", function() {
  updateScore();
  Crafty.background("#F0FFFF");
  Crafty.e("2D, DOM, Text")
  .attr({ w: 200, h: 200, x: 640, y: 200 })
  .text("Perdu !")
  .textColor('#000')
  .textFont({ size: '50px', weight: 'bold'})
  Crafty.e("2D, DOM, Text")
  .attr({ w: 200, h: 200, x: 640, y: 300 })
  .text("Score : " + score )
  .textColor('#000')
  .textFont({ size: '50px', weight: 'bold'})

  Crafty.e("2D, Canvas, DOM, Text, Mouse").attr({ x: 640, y: 400 }).text("Recommencer")
.textColor('#000').textFont({ size: '35px', weight: 'bold'})
.bind('Click', function(MouseEvent){
  Crafty.enterScene("start");
});
});

function updateScore() {
  affichScore = Crafty.e("2D, DOM, Text").attr({ x: 0, y: 0 }).text("Score:" + score)
  .textColor('#FFFAF0').textFont({ size: '30px', weight: 'bold'});
}

function updateVie() {
  affichVie = Crafty.e("2D, DOM, Text").attr({ x: 1280, y: 0 }).text("Vie(s):" + vies)
  .textColor('#FFFAF0').textFont({ size: '30px', weight: 'bold'});
}
function DisplayExplo() {
  var random2 = Math.round(Math.random(100 - 1400) * 100);
  var explosion = Crafty.e("2D, Canvas, Solid, sprExplo, Collision").attr({x: random, y: random2});
}

Crafty.init(width , height, document.getElementById('canvas'));
Crafty.background("url('assets/galaxy2.jpg')");
Crafty.defineScene("start", function() {
Crafty.background("url('assets/galaxy2.jpg')");

  Crafty.sprite("assets/f12.png", { sprVaisseau:[0,0,50,64] });
// ses dimensions
Crafty.sprite("assets/enemy.png", { sprEnemy:[0,0,100,100] });
Crafty.sprite("assets/explo.png", {sprExplo: [0,0,800, 800]});
Crafty.sprite("assets/missilemoi.png", {sprMissile1: [0,0, 500, 500]});

var random = Math.round(Math.random(1000) * 1000);


var enemys = Crafty.e("2D, Canvas, sprEnemy, Fourway, Solid, Collision, Mouse").attr({x: Math.floor(Math.random() * (1300 - 300)) + 300, y: 0})
.collision([0, 20], [50, 85], [80, 50], [100, 30], [95, 10], [0, 10])
.bind("EnterFrame", function () {
  this.y = this.y + 3;
})
.checkHits('Solid')
.bind("HitOn", function(hitData) {
  enemys.destroy();
  score++;
  affichScore.destroy();
  updateScore();

});
var enemys2 = Crafty.e("2D, Canvas, sprEnemy, Fourway, Solid, Collision, Mouse").attr({x: Math.floor(Math.random() * (1300 - 300)) + 300, y: 0})
.collision([0, 20], [50, 85], [80, 50], [100, 30], [95, 10], [0, 10])
.bind("EnterFrame", function () {
  this.y = this.y + 2;
})
.checkHits('Solid')
.bind("HitOn", function(hitData) {
  enemys2.destroy();
  /*score = updateScore();*/
  score++;
  affichScore.destroy();
  updateScore();


  console.log(enemys2);
});

var enemys3 = Crafty.e("2D, Canvas, sprEnemy, Fourway, Solid, Collision, Mouse").attr({x: Math.floor(Math.random() * (1300 - 300)) + 300, y: 0})
.collision([0, 20], [50, 85], [80, 50], [100, 30], [95, 10], [0, 10])

.bind("EnterFrame", function () {
  this.y = this.y + 2;
})
.checkHits('Solid')
.bind("HitOn", function(hitData) {
  enemys3.destroy();
  score++;
  affichScore.destroy();
  updateScore();
  
});

var enemys4 = Crafty.e("2D, Canvas, sprEnemy, Fourway, Solid, Collision, Mouse, Delay").attr({x: Math.floor(Math.random() * (1300 - 300)) + 300, y: 0})
.collision([0, 20], [50, 85], [80, 50], [100, 30], [95, 10], [0, 10])
.bind("EnterFrame", function () {
  this.y = this.y + 2;
})
.checkHits('Solid')
.bind("HitOn", function(hitData) {
  enemys4.destroy();
  score++;
  affichScore.destroy();
  updateScore();

})
.delay(function () {
  missile = Crafty.e("2D, Canvas, Solid, sprMissile1, Collision").attr({x: (enemys4.x + 15), y: (enemys4.y + 50), w: 120, h: 120})
  .collision([0, 20], [10, 25])
  .bind("EnterFrame", function(eventData) {
   this.y = this.y + 7 * (eventData.dt / 20);
 })
  .checkHits('Solid')
}, 2000, -1);
/*var ent = Crafty.e("Delay").delay(enemys, 100, -1);*/

player = Crafty.e("2D, Canvas, Solid, sprVaisseau, Fourway, Collision")
.collision([0, 40], [35, 40], [50, 40], [35, 10], [5, 15], [5, 10])
.attr({ x: Math.round((width-29)/2), y: height-64 })
.fourway(4)
.checkHits('Solid')
     // check les colissions avec l'entité solid
     .bind("HitOn", function(hitData) {

      vies--;
      affichVie.destroy();
      updateVie();
      if(vies == 0) {

        player.destroy();
        Crafty.enterScene("Looser");
        console.log(score);
      }
    })
     .bind("HitOff", function(hitData) {
      console.log("fini");
    })
     .bind("KeyDown", function (touche) {
      if (touche.key === Crafty.keys.SPACE) {
        var missile = carre.concat(compteurCarre);

        missile = Crafty.e("2D, Canvas, Solid, sprMissile1, Collision").attr({x: (player.x + 15), y: (player.y - 55), w: 120, h: 120})
        .collision([0, 20], [10, 25])
        .checkHits('Solid')
        .bind("HitOn", function(hitData) {
          missile.destroy();
        })
        .bind("EnterFrame", function () {
          this.y = this.y - 7;
        });
        compteurCarre = compteurCarre + 1;
      }
    });

     updateScore();
     updateVie();
   });

Crafty.e("2D, Canvas, DOM, Text, Mouse").attr({ x: 520, y: 300 }).text("Objectif : Sauver la terre des Galaxihadiste")
.textColor('#FFFFFF').textFont({ size: '35px', weight: 'bold'})
Crafty.e("2D, Canvas, DOM, Text, Mouse").attr({ x: 640, y: 400 }).text("START")
.textColor('#FFFFFF').textFont({ size: '35px', weight: 'bold'})
.bind('Click', function(MouseEvent){
  Crafty.enterScene("start");
});
/*Crafty.e("2D, DOM, Text").attr({ x: 200, y: 100 }).text("Look at me!!")
.textColor('#FF0000').textFont({ size: '50px', weight: 'bold'});*/


/*$('#jouer').click(function() {
  Crafty.enterScene("main");

});*/


/*Crafty.e('Floor, 2D, Canvas, Color')
  .attr({x: 0, y: 250, w: 250, h: 10})
  .color('green');

Crafty.e('2D, Canvas, Color, Fourway, Gravity')
  .attr({x: 0, y: 0, w: 50, h: 50})
  .color('#F00')
  .fourway(4)
  .gravity('Floor');*/