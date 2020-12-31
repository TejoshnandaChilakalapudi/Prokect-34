//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogI, happyDogI;
function preload() {

  //load images here
  dogI = loadImage("images/Dog.png");
  happyDogI = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 350, 20, 20);
  dog.addImage(dogI);
  dog.scale = 0.25;
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
}


function draw() {
  background(rgb(46, 139, 87));

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogI);
  }
  drawSprites();
  //add styles here
  fill("Black")
  text("Press the up arrow to feed the dog.", 150, 200)
  text("Number of milk bottles left :" + foodS, 150, 250)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    food:x
  })
}
