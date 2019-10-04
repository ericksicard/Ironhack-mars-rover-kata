"use strict";
// Rover Object Goes Here
var rover ={
  d: 'N',
  x: 5,
  y: 5,
  travelLog: []
}

// Obstacle Object Goes Here
var obst = [
  [5,9]
]

// Turning the Rover
function turnRover(rover, com){
  let options = ['N', 'E', 'S', 'W'];
  
  //Turning right
  if (com == 'r') {
    if (rover.d !== 'W') {
      rover.d = options[options.indexOf(rover.d) + 1]
    }
    else{
      rover.d = options[0];
    }
  }
  
  //Turning left
  else {
    if (rover.d !== 'N') {
      rover.d = options[options.indexOf(rover.d) - 1]
    }
    else{
      rover.d = options[options.length - 1];
    }
  }
  
  console.log(`tur was called! and the rover is heading ${rover.d}`);
}

// Moving the Rover
function moveRover(rover, com){
  
  //Finding Obstacles
  function obstacleFound(x, y){
    let result = obst.filter(ob => ob == [x, y].toString());
    return(result.length !== 0);
  }
  
  //Moving Forward
  function forward(){
    if (rover.d === 'N' && rover.y > 0){
        obstacleFound(rover.x, rover.y - 1) ? console.log('Obstacle!') : rover.y -= 1
      }
      else if (rover.d == 'E' && rover.x < 10){
        obstacleFound(rover.x + 1, rover.y) ? console.log('Obstacle!') : rover.x += 1;
      }
      else if(rover.d == 'S' && rover.y < 10){
        obstacleFound(rover.x, rover.y + 1) ? console.log('Obstacle!') : rover.y += 1;
      }
      else if(rover.d == 'W' && rover.x > 0){
        obstacleFound(rover.x - 1, rover.y) ? console.log('Obstacle!') : rover.x -= 1;
      }
      else {
        console.log(`Can't go out!`);
      }
    }
  
  //Moving Backward
  function backward(){
    if (rover.d == 'N' && rover.y < 10) {
      obstacleFound(rover.x, rover.y + 1) ? console.log('Obstacle!') : rover.y += 1;   
    }
    else if (rover.d == 'E' && rover.x > 0){
       obstacleFound(rover.x - 1, rover.y) ? console.log('Obstacle!') : rover.x -= 1;
    }
    else if (rover.d == 'S' && rover.y > 0){
      obstacleFound(rover.x, rover.y - 1) ? console.log('Obstacle!') : rover.y -= 1;
    }
    else if (rover.d == 'W' && rover.x < 10){
       obstacleFound(rover.x + 1, rover.y) ? console.log('Obstacle!') : rover.x += 1;
    }
    else {
        console.log(`Can't go out!`);
    }
  } 
  
  com === 'f' ? forward() : backward();  
  console.log(`moveRover was called and the rover si located at ${rover.x} , ${rover.y}`);
}

//Sequence to move the rover
function commands(rover, coms) {
  for (let i = 0; i < coms.length; i++) {
    if (coms[i] == 'f' || coms[i] == 'b') {
      //Pushing the coordinates of the previous place 
      rover.travelLog.push([rover.x, rover.y]);
      moveRover(rover, coms[i]);
    }
    else if (coms[i] == 'l' || coms[i] == 'r') {
      turnRover(rover, coms[i])
    }
    else{
      console.log('Not valid command');
      break;
    }
  }
  //Pushing the coordinate of the last place 
  rover.travelLog.push([rover.x, rover.y]);
  
  //Printing travel log
  for (let i = 0; i < rover.travelLog.length; i++){
    console.log(`The ${i} position is: ${rover.travelLog[i]}`)
  }
}


commands(rover, 'llffrrbb');