var jungle, background;
var monkey, monkey_running;
var ground, ground_img;

var bananaGroup, bananaImage;
var stoneGroup, stone_img;

var gameOver, restart;
var score = 0;


function preload() {
  jungle = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  gameover = loadImage("gameOver.png");
  Restart = loadImage("restart.png");
  bananaImage = loadImage("banana.png");
  stone_img = loadImage("stone.png");

}

function setup() {
  createCanvas(800, 400);

  background = createSprite(0, 0, 800, 400);
  background.addImage(jungle);
  background.scale = 1.5;
  background.x = background.width / 2;
  background.velocityX = -4;

  monkey = createSprite(100, 340, 20, 50);
  monkey.addAnimation("Running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  bananaGroup = new Group();
  stoneGroup = new Group();

  gameOver = createSprite(350, 150, 50, 50);
  gameOver.setImage("gameover", gameover);
  gameOver.visible = false;
  restart = createSprite(400, 200, 50, 50);
  restart.setImage("restart", Restart);
  restart.visible = false;
  score = 0;
}

function draw() {




  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (background.x < 100) {
    background.x = background.width / 2;
  }

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 10;
  }


  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  spawnbanana();
  spawnstone();

  if (stoneGroup.isTouching(monkey)) {
    score = score - 10;
    stoneGroup.destroyEach();
  }
  if (score === -10) {
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
    background.velocityX = 0
    gameOver.visible = true;
    restart.visible = true;
  }
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnbanana() {
  //write code here to spawn the food
  if (frameCount % 100 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnstone() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(800, 300, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(stone_img);

    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    stoneGroup.add(obstacle);
  }
}