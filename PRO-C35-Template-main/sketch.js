var score= 0;

var playerImage, fireballImage, guardsImage, cellImage;
var player, bullet, guards, fireball;
var fireballGroup, guardsGroup;

var life= 3;
var score= 0; 
var gameState= 1;



function preload(){
  cellImage= loadImage("assets/Cell.png")
  playerImage= loadImage("assets/Player.png")
  guardsImage= loadImage("assets/Guards.png")
  fireballImage= loadImage("assets/FireBall.png")

}

function setup(){
  createCanvas(800,800);
  
  player = createSprite(100, 400, 50,50);
  player.addImage(playerImage);
  player.scale= 0.5;


  fireballGroup= createGroup()
  guardsGroup= createGroup();

  score = 0;
}


function draw(){
  background(cellImage);
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);

  if(gameState=== 1){
    player.y= mouseY

    if (frameCount % 80=== 0){
      drawGuards();
    }

    if(keyDown("space")){
      setTimeout(shootfireball(), 2000)
    }

    if(guardsGroup.collide(fireballGroup)){
      handleguardsCollision(fireballGroup);
      score = score +1;
    }
  }
}

function drawGuards(){
  guards = createSprite(800,random(20,780),40,40);
  guards.addImage(guardsImage);
  guards.scale = 0.5;
  guards.velocityX = -8;
  guards.lifetime = 400;
  guardsGroup.add(guards);
}

function shootfireball(){
  fireball= createSprite(150, width/2, 50,20)
  fireball.y= player.y-20
  fireball.addImage(fireballImage)
  fireball.scale=0.06
  fireball.velocityX= 7
  fireballGroup.add(fireball)
}

function handleguardsCollision(guardsGroup){
  if (life > 0) {
     score=score+1;
  }
  
  fireballGroup.destroyEach()
  guardsGroup.destroyEach()
}

function handleGameover(guardsGroup){
  
  life=life-1;
  guardsGroup.destroyEach();
  

  if (life === 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

}

function readHeight(data){
  player.x= height.x;
  player.y= height.y;
}

function readHeight(data){
  height = data.val();
  player.x = height.x;
  player.y = height.y;
}