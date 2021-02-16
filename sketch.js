//variables
var database;
var dog, sadDog, happyDog;
var foods, foodStock;
var feed, addFood;
var fedTime, lastFed, currentTime;
var foodObj;

//function preload
function preload(){
  //loading the images
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

//function setup
function setup() {
  //database = firebase.database();
  database = firebase.database();
  //creating a canvas
  createCanvas(1000,400);

  //foodObj = a new Food
  foodObj = new Food();

  //referring to the database
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  //referring to the database
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  
  //creating a dog sprite
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //creating a button to feed Duke the doggie
  feed = createButton("Feed Duke");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  //creating a button to add the food
  addFood = createButton("Add food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

//function draw
function draw() {
  //background colour
  background(46,139,87);
  //drawing the sprites
  drawSprites();
  //displaying the food object
  foodObj.display();

}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour(),
  })
}

//function to add food in stock
function addFoods(){
  foods++;
  database.ref('/').update({
    Food: foods
  })
}