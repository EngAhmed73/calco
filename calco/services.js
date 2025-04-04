// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Tab Switching
const tabs = document.querySelectorAll('.tab-btn');
const categories = document.querySelectorAll('.calculator-category');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        tabs.forEach(t => t.classList.remove('active'));
        categories.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding category
        tab.classList.add('active');
        const category = document.getElementById(tab.dataset.category);
        category.classList.add('active');
    });
});

// Modal Handling
const modal = document.getElementById('calculator-modal');
const modalTitle = document.getElementById('modal-title');
const calculatorContainer = document.getElementById('calculator-container');
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Calculator Opening
function openCalculator(type) {
    modal.style.display = 'block';
    modalTitle.textContent = getCalculatorTitle(type);
    loadCalculator(type);
}

function getCalculatorTitle(type) {
    const titles = {
        scientific: 'Scientific Calculator',
        matrix: 'Matrix Calculator',
        statistics: 'Statistics Calculator',
        geometry: 'Geometry Calculator',
        loan: 'Loan Calculator',
        investment: 'Investment Calculator',
        tax: 'Tax Calculator',
        currency: 'Currency Calculator',
        physics: 'Physics Calculator',
        chemistry: 'Chemistry Calculator',
        biology: 'Biology Calculator',
        bmi: 'BMI Calculator',
        calorie: 'Calorie Calculator',
        fitness: 'Fitness Calculator',
        unit: 'Unit Converter',
        time: 'Time Converter',
        data: 'Data Converter'
    };
    return titles[type] || 'Calculator';
}

function loadCalculator(type) {
    calculatorContainer.innerHTML = '';
    
    switch (type) {
        case 'scientific':
            loadScientificCalculator();
            break;
        case 'matrix':
            loadMatrixCalculator();
            break;
        case 'statistics':
            loadStatisticsCalculator();
            break;
        case 'geometry':
            loadGeometryCalculator();
            break;
        case 'loan':
            loadLoanCalculator();
            break;
        case 'investment':
            loadInvestmentCalculator();
            break;
        case 'tax':
            loadTaxCalculator();
            break;
        case 'currency':
            loadCurrencyCalculator();
            break;
        case 'physics':
            loadPhysicsCalculator();
            break;
        case 'chemistry':
            loadChemistryCalculator();
            break;
        case 'biology':
            loadBiologyCalculator();
            break;
        case 'bmi':
            loadBMICalculator();
            break;
        case 'calorie':
            loadCalorieCalculator();
            break;
        case 'fitness':
            loadFitnessCalculator();
            break;
        case 'unit':
            loadUnitConverter();
            break;
        case 'time':
            loadTimeConverter();
            break;
        case 'data':
            loadDataConverter();
            break;
        default:
            calculatorContainer.innerHTML = '<p>Calculator not implemented yet.</p>';
    }
}

// Example implementation of Scientific Calculator
function loadScientificCalculator() {
    const calculator = document.createElement('div');
    calculator.className = 'calculator scientific';
    calculator.innerHTML = `
        <div class="calculator-display">
            <input type="text" id="scientific-display" class="calc-display" readonly>
        </div>
        <div class="calc-buttons scientific-buttons">
            <button class="func-btn" onclick="scientificCalc('sin')">sin</button>
            <button class="func-btn" onclick="scientificCalc('cos')">cos</button>
            <button class="func-btn" onclick="scientificCalc('tan')">tan</button>
            <button class="func-btn" onclick="scientificCalc('π')">π</button>
            <button class="func-btn" onclick="scientificCalc('log')">log</button>
            <button class="func-btn" onclick="scientificCalc('ln')">ln</button>
            <button class="func-btn" onclick="scientificCalc('√')">√</button>
            <button class="func-btn" onclick="scientificCalc('^')">^</button>
            <button onclick="scientificCalc('7')">7</button>
            <button onclick="scientificCalc('8')">8</button>
            <button onclick="scientificCalc('9')">9</button>
            <button class="op-btn" onclick="scientificCalc('/')">/</button>
            <button onclick="scientificCalc('4')">4</button>
            <button onclick="scientificCalc('5')">5</button>
            <button onclick="scientificCalc('6')">6</button>
            <button class="op-btn" onclick="scientificCalc('*')">×</button>
            <button onclick="scientificCalc('1')">1</button>
            <button onclick="scientificCalc('2')">2</button>
            <button onclick="scientificCalc('3')">3</button>
            <button class="op-btn" onclick="scientificCalc('-')">-</button>
            <button onclick="scientificCalc('0')">0</button>
            <button onclick="scientificCalc('.')">.</button>
            <button class="equals-btn" onclick="calculateScientific()">=</button>
            <button class="op-btn" onclick="scientificCalc('+')">+</button>
            <button class="clear-btn" onclick="clearScientific()">C</button>
            <button onclick="scientificCalc('(')">(</button>
            <button onclick="scientificCalc(')')">)</button>
            <button onclick="backspaceScientific()">⌫</button>
        </div>
    `;
    calculatorContainer.appendChild(calculator);
}

// Scientific Calculator Functions
let scientificExpression = '';

function scientificCalc(value) {
    const display = document.getElementById('scientific-display');
    scientificExpression += value;
    display.value = scientificExpression;
}

function calculateScientific() {
    const display = document.getElementById('scientific-display');
    try {
        // Replace mathematical constants and functions
        let expression = scientificExpression
            .replace(/π/g, 'Math.PI')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/\^/g, '**');

        const result = eval(expression);
        display.value = Number.isInteger(result) ? result : result.toFixed(8);
        scientificExpression = display.value;
    } catch (error) {
        display.value = 'Error';
        scientificExpression = '';
    }
}

function clearScientific() {
    const display = document.getElementById('scientific-display');
    scientificExpression = '';
    display.value = '';
}

function backspaceScientific() {
    const display = document.getElementById('scientific-display');
    scientificExpression = scientificExpression.slice(0, -1);
    display.value = scientificExpression;
}

// Load other calculator implementations similarly
function loadMatrixCalculator() {
    calculatorContainer.innerHTML = `
        <div class="matrix-calculator">
            <h3>Matrix Operations</h3>
            <div class="matrix-controls">
                <div class="matrix-size">
                    <label>Matrix Size:</label>
                    <select id="matrix-size">
                        <option value="2">2x2</option>
                        <option value="3">3x3</option>
                        <option value="4">4x4</option>
                    </select>
                </div>
                <div class="matrix-operation">
                    <label>Operation:</label>
                    <select id="matrix-operation">
                        <option value="add">Addition</option>
                        <option value="subtract">Subtraction</option>
                        <option value="multiply">Multiplication</option>
                        <option value="determinant">Determinant</option>
                    </select>
                </div>
            </div>
            <div id="matrix-input-container"></div>
            <button class="calculate-btn">Calculate</button>
            <div id="matrix-result"></div>
        </div>
    `;
}

// Implement other calculator loaders as needed
function loadStatisticsCalculator() {
    calculatorContainer.innerHTML = `
        <div class="statistics-calculator">
            <h3>Statistical Analysis</h3>
            <textarea id="data-input" placeholder="Enter numbers separated by commas"></textarea>
            <div class="stat-results">
                <div class="stat-item">
                    <label>Mean:</label>
                    <span id="mean-result">-</span>
                </div>
                <div class="stat-item">
                    <label>Median:</label>
                    <span id="median-result">-</span>
                </div>
                <div class="stat-item">
                    <label>Mode:</label>
                    <span id="mode-result">-</span>
                </div>
                <div class="stat-item">
                    <label>Standard Deviation:</label>
                    <span id="std-dev-result">-</span>
                </div>
            </div>
            <button class="calculate-btn">Calculate</button>
        </div>
    `;
}

// Add more calculator implementations as needed

// Unit Converter
const conversionType = document.getElementById('conversion-type');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');

const unitData = {
    length: {
        units: ['meters', 'kilometers', 'miles', 'feet', 'inches', 'centimeters'],
        conversions: {
            meters: 1,
            kilometers: 0.001,
            miles: 0.000621371,
            feet: 3.28084,
            inches: 39.3701,
            centimeters: 100
        }
    },
    weight: {
        units: ['kilograms', 'grams', 'pounds', 'ounces'],
        conversions: {
            kilograms: 1,
            grams: 1000,
            pounds: 2.20462,
            ounces: 35.274
        }
    },
    temperature: {
        units: ['Celsius', 'Fahrenheit', 'Kelvin'],
        conversions: {
            Celsius: 'C',
            Fahrenheit: 'F',
            Kelvin: 'K'
        }
    }
};

function populateUnitDropdowns() {
    const type = conversionType.value;
    const units = unitData[type].units;

    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    units.forEach(unit => {
        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));
    });

    // Set default 'to' unit to something different than 'from' unit
    if (units.length > 1) {
        toUnit.selectedIndex = 1;
    }

    convert();
}

function convert() {
    const type = conversionType.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const value = parseFloat(fromValue.value);

    if (isNaN(value)) {
        toValue.value = '';
        return;
    }

    if (type === 'temperature') {
        toValue.value = convertTemperature(value, from, to);
    } else {
        const fromRate = unitData[type].conversions[from];
        const toRate = unitData[type].conversions[to];
        const result = (value / fromRate) * toRate;
        toValue.value = result.toFixed(4);
    }
}

function convertTemperature(value, from, to) {
    let celsius;

    // Convert to Celsius first
    switch (from) {
        case 'Celsius':
            celsius = value;
            break;
        case 'Fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'Kelvin':
            celsius = value - 273.15;
            break;
    }

    // Convert from Celsius to target unit
    switch (to) {
        case 'Celsius':
            return celsius.toFixed(2);
        case 'Fahrenheit':
            return ((celsius * 9/5) + 32).toFixed(2);
        case 'Kelvin':
            return (celsius + 273.15).toFixed(2);
    }
}

function swapUnits() {
    const tempUnit = fromUnit.value;
    const tempValue = fromValue.value;

    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;

    fromValue.value = toValue.value;
    convert();
}

// Formula Library
const formulaCategory = document.getElementById('formula-category');
const formulaContainer = document.getElementById('formula-container');

const formulas = {
    geometry: [
        { name: 'Circle Area', expression: 'A = πr²' },
        { name: 'Circle Circumference', expression: 'C = 2πr' },
        { name: 'Square Area', expression: 'A = s²' },
        { name: 'Rectangle Area', expression: 'A = l × w' },
        { name: 'Triangle Area', expression: 'A = ½bh' },
        { name: 'Sphere Volume', expression: 'V = ⁴⁄₃πr³' }
    ],
    physics: [
        { name: 'Force', expression: 'F = ma' },
        { name: 'Kinetic Energy', expression: 'KE = ½mv²' },
        { name: 'Potential Energy', expression: 'PE = mgh' },
        { name: 'Velocity', expression: 'v = d/t' },
        { name: 'Acceleration', expression: 'a = (v-v₀)/t' }
    ],
    finance: [
        { name: 'Simple Interest', expression: 'I = Prt' },
        { name: 'Compound Interest', expression: 'A = P(1 + r)ᵗ' },
        { name: 'Present Value', expression: 'PV = FV/(1 + r)ᵗ' },
        { name: 'Future Value', expression: 'FV = PV(1 + r)ᵗ' }
    ],
    statistics: [
        { name: 'Mean', expression: 'x̄ = Σx/n' },
        { name: 'Standard Deviation', expression: 'σ = √(Σ(x-μ)²/N)' },
        { name: 'Variance', expression: 'σ² = Σ(x-μ)²/N' },
        { name: 'Z-Score', expression: 'z = (x-μ)/σ' }
    ]
};

function displayFormulas() {
    const category = formulaCategory.value;
    const categoryFormulas = formulas[category];

    formulaContainer.innerHTML = categoryFormulas.map(formula => `
        <div class="formula-item">
            <div class="formula-name">${formula.name}</div>
            <div class="formula-expression">${formula.expression}</div>
        </div>
    `).join('');
}

// Event Listeners
conversionType.addEventListener('change', populateUnitDropdowns);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);
fromValue.addEventListener('input', convert);
formulaCategory.addEventListener('change', displayFormulas);

// Initialize
populateUnitDropdowns();
displayFormulas(); 