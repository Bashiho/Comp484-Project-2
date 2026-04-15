// TBD
// Add feedback from pet
// Replace pet image 
// (maybe done, requires tesintg) at certain happiness values, image changes
// Add JQuery methods
// Improve checks structure
// https://www.geeksforgeeks.org/javascript/javascript-set-an-image-source-dynamically-using-js/
  
// Add a variable "pet_info" equal to a object with the name (string), 
// weight (number), happiness (number), and discipline (number) of your pet
var pet_info = {name:"Scrimblo", weight:"50", happiness:"50", discipline:"50"};

$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
  // Called function to update the name, happiness, and weight of our pet in our HTML
  // Skip checks to avoid passing through pointless attributes and doing pointless checks
  updatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.train-button').click(clickedTrainButton);

  // Change image based on happiness
  let img = document.getElementsByClassName("pet-image");
  
  if(pet_info['happiness'] <= 20)
    img.src = "./images/rem_sad";

  else if(pet_info['happiness'] >= 80)
    img.src = "./images/rem_happy";

  else
    img.src = "./images/rem"

  // Gray out buttons if they are unsafe
  if((pet_info['weight'] - 2 <= 0) || (pet_info['discipline'] -4 < 0)){
    $('.play-button').attr("disabled", "disabled");
    $('.play-button').css("background-color", "light-gray");
  }
  else{
    $('.play-button').attr("disabled", "enabled");
    $('.play-button').css("background-color", "#1e2835");
  }
  if((pet_info['happiness'] - 3 < 0) || (pet_info['weight'] - 5 <= 0)){
    $('.exercise-button').attr("disabled", "disabled");
    $('.exercise-button').css("background-color", "light-gray");
  }
  else{
    $('.exercise-button').attr("disabled", "enabled");
    $('.exercise-button').css("background-color", "#1e2835");
  }
  if(pet_info['happiness'] - 5 < 0){
    $('.train-button').attr("disabled", "disabled");
    $('.train-button').css("background-color", "light-gray");
  }
  else{
    $('.train-button').attr("disabled", "enabled");
    $('.train-button').css("background-color", "#1e2835");
  }
})

// Change values passed through to checkAndUpdatePetInfoInHtml based on button pressed
function clickedTreatButton() {
  checkAndUpdatePetInfoInHtml("treat", 5, 5, 0);
}

function clickedPlayButton() {
  checkAndUpdatePetInfoInHtml("play", 3, -2, -4);
}


function clickedExerciseButton() {
  checkAndUpdatePetInfoInHtml("exercise", -3, -5, 2);
} 
  
function clickedTrainButton() {
  checkAndUpdatePetInfoInHtml("train", -5, 2, 5);
}

// uses checkWeightAndHappinessBeforeUpdating to check if values are safe, continues to update info if so
function checkAndUpdatePetInfoInHtml(action, happinessChange, weightChange, discChange) {
  var change = checkWeightAndHappinessBeforeUpdating(action, happinessChange, weightChange, discChange);  
  if(change){
    $('.warning').text("Cannot " + action + ", happiness and weight are too low!");
    pet_info['happiness'] += happinessChange;
    pet_info['weight'] += weightChange;
    pet_info['discipline'] += discChange;
    updatePetInfoInHtml(happinessChange, weightChange);
  }
}

// Checks if values are safe to use before acting, returns true if safe , returns false and prints warning otherwise
function checkWeightAndHappinessBeforeUpdating(action, happinessChange, weightChange, discChange) {
  if((pet_info['happiness'] += happinessChange < 0) && (pet_info['weight'] += weightChange <= 0) && (pet_info['discipline'] += discChange < 0)){
    $('.warning').text("Cannot " + action + ", discipline, happiness and weight are too low!");
    return false;
  }
  else if(pet_info['happiness'] += happinessChange < 0 && (pet_info['weight'] += weightChange <= 0)){
    $('.warning').text("Cannot " + action + ", happiness and weight are too low!");
    return false;
  }
  else if(pet_info['weight'] += weightChange <= 0 && (pet_info['discipline'] += discChange < 0)) {
    $('.warning').text("Cannot " + action + ", discipline and weight are too low!");
    return false;
  }
  else if((pet_info['happiness'] += happinessChange < 0) && (pet_info['discipline'] += discChange < 0)){
    $('.warning').text("Cannot " + action + ", discipline and happiness are too low!");
    return false;
  }
  else if(pet_info['happiness'] += happinessChange < 0){
    $('.warning').text("Cannot " + action + ", happiness too low!");
    return false;
  }
  else if(pet_info['discipline'] += discChange < 0){
    $('.warning').text("Cannot " + action + ", discipline is too low!");
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
  $('.discipline').text(pet_info['discipline']);
}