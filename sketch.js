var  dog, happyDog, database, foodS, foodStock;

function preload()
{
    dog=loadImage("images/Dog.png");
    happyDog=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500,500);

  database = firebase.database();

  dog1=createSprite(250,290,20,20);
  dog1.scale=0.2
  dog1.addImage(dog)

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}
function readStock(data){
  foodS=data.val();
}
function draw() {
  background(46,139,87)
  fill("white");
  textSize(20);
  text("Note : Press UP_ARROW Key To Feed Drago Milk!",25,30);
  text("Food remaining : "+ foodS,160,190);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog1.addImage(happyDog);
  }
  
  drawSprites();


}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


