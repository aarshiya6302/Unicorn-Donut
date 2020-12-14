var donutimg, donutgroup, obstacleimg, obstaclegroup, backimg, back, unicornimg, unicorn, ground, score, health;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload() {
  
  backimg=loadImage("sky.png");
  donutimg=loadImage("donut.png");
  obstacleimg=loadImage("stone.png");

  unicornimg=loadAnimation("Unicorn1.png", "Unicorn2.png", "Unicorn3.png", "Unicorn4.png", "Unicorn5.png", "Unicorn6.png");
  
}
function setup() {
  createCanvas(800, 600);
  background(225)
  
  score=0;
  health=5;

  back=createSprite(300,150);
  back.scale=1
  back.addImage("back", backimg);
 
  back.x=back.width/2;
  
  unicorn=createSprite(70,420,40,40);
  unicorn.addAnimation ("unicorn", unicornimg);
  unicorn.scale=0.3
  
  ground=createSprite(300,420,600,10);
  ground.visible=false;
  
  
  donutgroup = new Group();
  obstaclegroup = new Group();
  
}

function draw() {
  background("white");


  edges=createEdgeSprites();
   
  unicorn.collide(ground);
  if(gameState === PLAY){

    back.velocityX=-5;

    

    function spawnDonut() {
      if(frameCount %150===0){
          donut=createSprite(900,random(90,150));
          donut.addImage ("donut", donutimg);
          donut.scale=0.01;
          donut.velocityX=-7;
          donut.lifetime=1200;
          donutgroup.add(donut);
        }
      }

      function spawnObstacles(){
        if(World.frameCount %500===0){
           var obstacle=createSprite(900,350);
           obstacle.addImage("obstacle", obstacleimg);
           obstacle.scale=0.15;
           obstacle.velocityX=-5;
           obstacle.lifetime=1200;
          obstaclegroup.add(obstacle);
         }
       }
    spawnObstacles()
    if (back.x < 600){
      back.x = back.width/2;
       }
       camera.position.y=unicorn.y;
       if(keyDown(UP_ARROW)&& unicorn.y>=300){
        unicorn.velocityY=-20
         }
      
        if(keyDown("space")&& unicorn.y>=300){
          unicorn.velocityY=-20
         }
         unicorn.velocityY = unicorn.velocityY + 0.9;
         var rand = Math.round(random(1,6));
    switch(score) {
      case 1: unicorn.scale=0.35;
              break;
      case 2: unicorn.scale=0.4;
              break;
      case 3: unicorn.scale=0.45;
              break;
      case 4: unicorn.scale=0.5;
              break;
      case 5: unicorn.scale=0.55;
              break;
      default: break;
    }
   
    if(unicorn.isTouching(obstaclegroup)){
      obstaclegroup.destroyEach()
      unicorn.scale=0.3
      score=score-1
   }

  score.depth= unicorn.depth;
         if(unicorn.isTouching(donutgroup)){
          donutgroup.destroyEach()
         score=score+1;
       }
       if(score ===5){
         gameState=END;
       }

       spawnDonut();
  }
 
  else if(gameState===END){
    back.velocityX=0;
    unicorn.hide

  stroke("white");
 textSize(20);
 fill("white");
 text("Unicorn ate too many donuts!",400,300)



  }
  
  drawSprites();
 stroke("white");
 textSize(20);
 fill("white");
 text("score: "+score,700,100)
  

 if(score===5){
  stroke("white");
  textSize(40);
  fill("white");
  text("Unicorn ate too many donuts!",200,200)
  unicorn.hide
 
 }
  }
  
   


