// TBD
// Add feedback from pet
  
// Add a variable "pet_info" equal to a object with the name (string), 
// weight (number), happiness (number), and discipline (number) of your pet
var pet_info = {name:"Rem", weight:"50", happiness:"50", discipline:"50"};

$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
  // Called function to update the name, happiness, and weight of our pet in our HTML
  // Skip checks to avoid passing through pointless attributes and doing pointless checks
  updatePetInfoInHtml();

  $('.warning').text("No actions yet.");
  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.train-button').click(clickedTrainButton);
})

// Change values passed through to checkAndUpdatePetInfoInHtml based on button pressed
// Each uses .prepentTo('.history") which adds the string mentioning the action to the start of the history element in the html
function clickedTreatButton() {
  checkAndUpdatePetInfoInHtml("treat", 5, 5, 0);
  console.log("Gave Treat");
  $("<p>Gave Treat, </p>").prependTo(".history-list");
}

function clickedPlayButton() {
  checkAndUpdatePetInfoInHtml("play", 3, -2, -4);
  console.log("Played");
  $("<p>Played, </p>").prependTo(".history-list");
}

function clickedExerciseButton() {
  checkAndUpdatePetInfoInHtml("exercise", -3, -5, 2);
  console.log("Exercised");
  $("<p>Exercised, </p>").prependTo(".history-list");
} 
  
function clickedTrainButton() {
  checkAndUpdatePetInfoInHtml("train", -5, 2, 5);
  console.log("Trained");
  $("<p>Trained, </p>").prependTo(".history-list");
}

// uses checkWeightAndHappinessBeforeUpdating to check if values are safe, continues to update info if so
function checkAndUpdatePetInfoInHtml(action, happinessChange, weightChange, discChange) {
  var change = checkWeightAndHappinessBeforeUpdating(action, happinessChange, weightChange, discChange);  
  if(change){
    console.log("Successfully completed: " + action);
    $('.warning').text("Successfully completed: " + action);
    happiness = Number(pet_info['happiness'])
    weight = Number(pet_info['weight'])
    discipline = Number(pet_info['discipline'])
    pet_info['happiness'] = happiness + happinessChange;
    pet_info['weight'] = weight + weightChange;
    pet_info['discipline'] = discipline + discChange;
    // Console Table example, prints table of old and new values
    console.table([
      {
        name: 'Happiness',
        old: happiness,
        new: pet_info['happiness']
      },
      {
        name: 'Weight',
        old: weight,
        new: pet_info['weight']
      },
      {
        name: 'Discipline',
        old: discipline,
        new: pet_info['discipline']
      }
    ]);
    updateImage();
    updateButtons();
    updatePetInfoInHtml(happinessChange, weightChange);
  }
}

// Checks if values are safe to use before acting, returns true if safe , returns false and prints warning otherwise
function checkWeightAndHappinessBeforeUpdating(action, happinessChange, weightChange, discChange) {
  let issues = ""
  if(Number(pet_info['happiness']) + happinessChange < 0){
    issues += "happiness ";
  }
  if(Number(pet_info['discipline']) + discChange < 0){
    issues += "discipline ";
  }
  if(Number(pet_info['weight']) + weightChange <= 0){
    issues += "weight ";
  }

  if (issues.length > 0){
    $('.warning').text(`Cannot ${action} because the following values are in danger: ${issues}`);
    // Console Error example, fails to complete action because of an issue, reports issues to console
    console.error(`Could not complete ${action} because of the following values: ${issues}`);
    return false;
  }
  return true;
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.discipline').text(pet_info['discipline']);
  // Console Log example, lets user know that process has completed
  console.log("Updated pet information");
}

// Gray out and disable buttons if they are unsafe
// Uses .css() to adjust the buttons, change color to show they are disabled
function updateButtons() {
  var disabled = []
  if((pet_info['weight'] - 2 <= 0) || (pet_info['discipline'] - 4 < 0)){
    $('.play-button').attr("disabled", "disabled");
    $('.play-button').css("background-color", "#D3D3D3");
    // Console warning example, displays warning for each button giving reasoning
    console.warning("Play button is disabled due to values being too low");
    disabled.push("Play Button");
  }
  else{
    $('.play-button').removeAttr("disabled");
    $('.play-button').css("background-color", "#1e2835");
  }
  if((pet_info['happiness'] - 3 < 0) || (pet_info['weight'] - 5 <= 0)){
    $('.exercise-button').attr("disabled", "disabled");
    $('.exercise-button').css("background-color", "#D3D3D3");
    console.warning("Exercise button is disabled due to values being too low");
    disabled.push("Exercise Button");
  }
  else{
    $('.exercise-button').removeAttr("disabled");
    $('.exercise-button').css("background-color", "#1e2835");
  }
  if(pet_info['happiness'] - 5 < 0){
    $('.train-button').attr("disabled", "disabled");
    $('.train-button').css("background-color", "#D3D3D3");
    console.warning("Train button is disabled due to values being too low");
    disabled.push("Train Button");
  }
  else{
    $('.train-button').removeAttr("disabled");
    $('.train-button').css("background-color", "#1e2835");
  }
  // Console Group example, create group with appropriate label and add elements that match label,
  // ending group prints to console
  console.group("Disabled Buttons");
  for(var i = 0; i < disabled.length; i++){
    console.info(disabled[i] + ", ");
  }
  console.groupEnd("Disabled Buttons");
  // Maybe Type Error Example, requires testing to see if it actually errors or not
  disabled = new Date();
}

// Change image based on happiness
function updateImage() {
  let img = document.getElementById("pet-image");
  
  if(Number(pet_info['happiness']) <= 20){
    img.src = "./images/rem-sad.png";
    // Custom log example, create styles then pass them into log
    const styles = 
        `padding: 5px; background-color: darkblue; color: white; font-style: 
        italic; font-size: 2em;`;
    console.log('%cRem is sad', styles);
  }
  else if(Number(pet_info['happiness']) >= 80){
    img.src = "./images/rem-happy.png";
    const styles = 
        `padding: 5px; background-color: yellow; color: black; font-style: 
        bold; font-size: 2em;`;
    console.log('%cRem is happy', styles);
  }
  else
    img.src = "./images/rem.png";
  // 404 Example, incorrect path so it cannot find the image
  fetch('./rem.png')
  console.log("Image Updated");
}