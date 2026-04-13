// TBD
// Create new function with new behavior (Train button maybe?)
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
  
    function clickedTreatButton() {
      // Increase pet happiness
      var newHappiness = Number(pet_info['happiness']), newWeight = Number(pet_info['weight'])
      pet_info['happiness'] = newHappiness + 5;
      // Increase pet weight

      pet_info['weight'] = newWeight + 5;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Const to make changing values across function easier
      var newHappiness = Number(pet_info['happiness'])
      const weightChange = 2;
      // Check if weight is too low
      if(pet_info['weight'] - weightChange <= 0)
        $('.warning').text("Cannot play, weight is too low!");
      // Increase pet happiness
      pet_info['happiness'] = newHappiness + 3;
      // Decrease pet weight
      pet_info['weight'] -= weightChange;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Const to make changing values across function easier
      const happinessChange = 3;
      const weightChange = 5;
      // Check if happiness and weight would be too low
      if(pet_info['happiness'] - happinessChange < 0 && pet_info['weight'] - weightChange <= 0){
        $('.warning').text("Cannot exercise, happiness and weight would be too low!");
        checkAndUpdatePetInfoInHtml();
      }
      else {
        // If happiness is too low, show warning
        if(pet_info['happiness'] - happinessChange < 0)
          $('.warning').text("Cannot exercise, happiness would be too low!");
          checkAndUpdatePetInfoInHtml();

      // If weight is too low, show warning
        if(pet_info['weight'] - weightChange <= 0) 
          $('.warning').text("Cannot exercise, weight would be too low!");
          checkAndUpdatePetInfoInHtml();
      }
      // IF happiness and weight are safe, decrease both and update info
      pet_info['happiness'] -= happinessChange;
      pet_info['weight'] -= weightChange;
      checkAndUpdatePetInfoInHtml();
    }

    function clickedTrainButton() {
      const happinessChange = 5;
      var newWeight = Number(pet_info['weight'])
      if(pet_info['happiness'] - happinessChange < 0){
        $('.warning').text("Cannot train, happiness is too low!");
        checkAndUpdatePetInfoInHtml();
      }
      pet_info['happiness'] -= happinessChange;
      pet_info['weight'] = newWeight + 2;
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      return 0;
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }
  