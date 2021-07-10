//Create variables here
var dog,dogimg,happydogimg,database,foods,foodstock
var database
function preload()
{
  //load images here
  happydogimg = loadImage("dogImg.png")
  dogimg = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(700, 600);
  database = firebase.database()
  dog = createSprite(350,400)
  dog.addImage("dog",dogimg)
  dog.scale = 0.5
  foodstock = database.ref('Food')
  foodstock.on("value",readStock)
}

function readStock(data){
  foods = data.val()
}

//Function to write values in DB
function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1 
  }
  database.ref('/').update(
    {
      Food:x
    }
  )
}

function draw() {  
  background(46,139,87);

  //Function to read values from DB
  if(keyWentDown(UP_ARROW)){
    writeStock(foods)
    dog.addImage("dog",happydogimg)
  } 
  fill("black")
  textSize(30)
  text("Food Available:" + foods,240,200)
  drawSprites();
  //add styles here
  fill("black")
  textSize(30)
  text("Note:press UP ARROW to feed the Dog",80,30)
}



