// TBD
// Add feedback from pet
// Replace pet image
// Add JQuery methods
// Make it so that at certain happiness values, image changes
// https://www.geeksforgeeks.org/javascript/javascript-set-an-image-source-dynamically-using-js/

$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.train-button').click(clickedTrainButton);
})
  
// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = {name:"Scrimblo", weight:"50", happiness:"50"};

// Change values passed through to checkAndUpdatePetInfoInHtml based on button pressed
function clickedTreatButton() {
  checkAndUpdatePetInfoInHtml("treat", 5, 5);
}

function clickedPlayButton() {
  checkAndUpdatePetInfoInHtml("play", 3, -2);
}


function clickedExerciseButton() {
  checkAndUpdatePetInfoInHtml("exercise", -3, -5);
} 
  
function clickedTrainButton() {
  checkAndUpdatePetInfoInHtml("train", -5, 2);
}

// uses checkWeightAndHappinessBeforeUpdating to check if values are safe, continues to update info if so
function checkAndUpdatePetInfoInHtml(action, happinessChange, weightChange) {
  var change = checkWeightAndHappinessBeforeUpdating(action, happinessChange, weightChange);  
  if(change)
    updatePetInfoInHtml(happinessChange, weightChange);
}

// Checks if values are safe to use before acting, returns true if safe false otherwise
function checkWeightAndHappinessBeforeUpdating(action, happinessChange, weightChange) {
  if((pet_info['happiness'] += happinessChange < 0) && (pet_info['weight'] += weightChange <= 0)){
    $('.warning').text("Cannot " + action + ", happiness and weight are too low!");
    return false;
  }
  else if(pet_info['happiness'] += happinessChange < 0){
    $('.warning').text("Cannot " + action + ", happiness is too low!");
    return false;
  }
  else if(pet_info['weight'] += weightChange <= 0) {
    $('.warning').text("Cannot " + action + ", weight is too low!");
    return false;
  }
  else return true;
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
}