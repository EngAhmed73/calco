// BMI Calculator Functions
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const heightUnit = document.getElementById('height-unit').value;

    if (isNaN(weight) || isNaN(height)) {
        alert('Please enter valid numbers for weight and height');
        return;
    }

    // Convert weight to kg
    let weightKg = weight;
    if (weightUnit === 'lbs') {
        weightKg = weight * 0.453592;
    }

    // Convert height to meters
    let heightM = height;
    if (heightUnit === 'cm') {
        heightM = height / 100;
    } else if (heightUnit === 'ft') {
        heightM = height * 0.3048;
    }

    const bmi = weightKg / (heightM * heightM);
    const resultValue = document.querySelector('#bmi-result .result-value');
    const resultCategory = document.querySelector('#bmi-result .result-category');

    resultValue.textContent = bmi.toFixed(1);
    
    // Determine BMI category
    let category;
    if (bmi < 18.5) {
        category = 'Underweight';
        resultValue.style.color = '#3498db';
    } else if (bmi < 25) {
        category = 'Normal weight';
        resultValue.style.color = '#2ecc71';
    } else if (bmi < 30) {
        category = 'Overweight';
        resultValue.style.color = '#f1c40f';
    } else {
        category = 'Obese';
        resultValue.style.color = '#e74c3c';
    }
    
    resultCategory.textContent = category;
}

// Calorie Calculator Functions
function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    
    // Check if separate weight/height inputs exist for the calorie calculator
    // If not, use the BMI calculator inputs
    let weight, height, weightUnit, heightUnit;
    
    // Get weight and height from BMI calculator
    weight = parseFloat(document.getElementById('weight').value);
    height = parseFloat(document.getElementById('height').value);
    weightUnit = document.getElementById('weight-unit').value;
    heightUnit = document.getElementById('height-unit').value;
    
    const activity = parseFloat(document.getElementById('activity').value);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activity)) {
        alert('Please fill in all fields including weight and height in the BMI calculator section');
        return;
    }

    // Convert measurements if needed
    const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    let heightCm = height;
    if (heightUnit === 'm') {
        heightCm = height * 100;
    } else if (heightUnit === 'ft') {
        heightCm = height * 30.48;
    } else if (heightUnit === 'cm') {
        heightCm = height;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    // Calculate total daily calories
    const calories = Math.round(bmr * activity);
    
    const resultValue = document.querySelector('#calorie-result .result-value');
    resultValue.textContent = calories;

    // Add weight goals
    const weightLoss = Math.round(calories - 500);
    const weightGain = Math.round(calories + 500);
    
    document.querySelector('#calorie-result .result-category').innerHTML = `
        <div>Maintain weight: ${calories} calories/day</div>
        <div>Weight loss: ${weightLoss} calories/day</div>
        <div>Weight gain: ${weightGain} calories/day</div>
    `;
}

// Heart Rate Calculator Functions
function calculateHeartRate() {
    const age = parseInt(document.getElementById('fitness-age').value);
    const restingHR = parseInt(document.getElementById('resting-heart-rate').value);

    if (isNaN(age) || isNaN(restingHR)) {
        alert('Please enter valid numbers for age and resting heart rate');
        return;
    }

    // Calculate maximum heart rate using Tanaka formula
    const maxHR = 208 - (0.7 * age);
    
    // Calculate heart rate reserve (HRR)
    const hrr = maxHR - restingHR;
    
    // Calculate target heart rate zones
    const moderateLow = Math.round(restingHR + (hrr * 0.64));
    const moderateHigh = Math.round(restingHR + (hrr * 0.76));
    const vigorousLow = Math.round(restingHR + (hrr * 0.77));
    const vigorousHigh = Math.round(restingHR + (hrr * 0.93));

    // Update results
    const zones = document.querySelectorAll('.zone-value');
    zones[0].textContent = `${moderateLow} to ${moderateHigh} bpm`;
    zones[1].textContent = `${vigorousLow} to ${vigorousHigh} bpm`;
    zones[2].textContent = `${Math.round(maxHR)} bpm`;
}

// Event Listeners for unit changes
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing event listeners');
    
    const weightUnitElem = document.getElementById('weight-unit');
    const heightUnitElem = document.getElementById('height-unit');
    
    if (weightUnitElem) {
        weightUnitElem.addEventListener('change', function(event) {
            const weightInput = document.getElementById('weight');
            const currentValue = parseFloat(weightInput.value);
            if (!isNaN(currentValue)) {
                if (event.target.value === 'kg') {
                    weightInput.value = (currentValue * 0.453592).toFixed(1); // lbs to kg
                } else {
                    weightInput.value = (currentValue * 2.20462).toFixed(1); // kg to lbs
                }
            }
        });
    } else {
        console.log('Weight unit element not found');
    }
    
    if (heightUnitElem) {
        heightUnitElem.addEventListener('change', function(event) {
            const heightInput = document.getElementById('height');
            const currentValue = parseFloat(heightInput.value);
            if (!isNaN(currentValue)) {
                const currentUnit = event.target.value;
                const previousUnit = event.target.previousValue || 'cm';
                
                // Convert to cm first
                let cmValue;
                if (previousUnit === 'm') {
                    cmValue = currentValue * 100;
                } else if (previousUnit === 'ft') {
                    cmValue = currentValue * 30.48;
                } else {
                    cmValue = currentValue;
                }
                
                // Convert from cm to target unit
                if (currentUnit === 'm') {
                    heightInput.value = (cmValue / 100).toFixed(2);
                } else if (currentUnit === 'ft') {
                    heightInput.value = (cmValue / 30.48).toFixed(1);
                } else {
                    heightInput.value = Math.round(cmValue);
                }
                
                event.target.previousValue = currentUnit;
            }
        });
    } else {
        console.log('Height unit element not found');
    }
}); 