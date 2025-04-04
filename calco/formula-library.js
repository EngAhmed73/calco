// Formula Library Data
const formulas = {
    geometry: [
        { name: 'Circle Area', expression: 'A = πr²', variables: ['r: radius'], example: 'For r = 5: A = π × 5² = 78.54' },
        { name: 'Circle Circumference', expression: 'C = 2πr', variables: ['r: radius'], example: 'For r = 5: C = 2π × 5 = 31.42' },
        { name: 'Square Area', expression: 'A = s²', variables: ['s: side length'], example: 'For s = 4: A = 4² = 16' },
        { name: 'Rectangle Area', expression: 'A = l × w', variables: ['l: length', 'w: width'], example: 'For l = 5, w = 3: A = 5 × 3 = 15' },
        { name: 'Triangle Area', expression: 'A = ½bh', variables: ['b: base', 'h: height'], example: 'For b = 6, h = 4: A = ½ × 6 × 4 = 12' },
        { name: 'Sphere Volume', expression: 'V = ⁴⁄₃πr³', variables: ['r: radius'], example: 'For r = 3: V = 4/3π × 3³ = 113.10' }
    ],
    physics: [
        { name: 'Force', expression: 'F = ma', variables: ['m: mass', 'a: acceleration'], example: 'For m = 2kg, a = 5m/s²: F = 2 × 5 = 10N' },
        { name: 'Kinetic Energy', expression: 'KE = ½mv²', variables: ['m: mass', 'v: velocity'], example: 'For m = 2kg, v = 3m/s: KE = ½ × 2 × 3² = 9J' },
        { name: 'Potential Energy', expression: 'PE = mgh', variables: ['m: mass', 'g: gravity (9.81)', 'h: height'], example: 'For m = 1kg, h = 2m: PE = 1 × 9.81 × 2 = 19.62J' },
        { name: 'Velocity', expression: 'v = d/t', variables: ['d: distance', 't: time'], example: 'For d = 100m, t = 20s: v = 100/20 = 5m/s' },
        { name: 'Acceleration', expression: 'a = (v-v₀)/t', variables: ['v: final velocity', 'v₀: initial velocity', 't: time'], example: 'For v = 10m/s, v₀ = 0m/s, t = 2s: a = (10-0)/2 = 5m/s²' }
    ],
    finance: [
        { name: 'Simple Interest', expression: 'I = Prt', variables: ['P: principal', 'r: interest rate', 't: time'], example: 'For P = $1000, r = 5%, t = 2 years: I = 1000 × 0.05 × 2 = $100' },
        { name: 'Compound Interest', expression: 'A = P(1 + r)ᵗ', variables: ['P: principal', 'r: interest rate', 't: time'], example: 'For P = $1000, r = 5%, t = 2 years: A = 1000(1 + 0.05)² = $1102.50' },
        { name: 'Present Value', expression: 'PV = FV/(1 + r)ᵗ', variables: ['FV: future value', 'r: interest rate', 't: time'], example: 'For FV = $1000, r = 5%, t = 2 years: PV = 1000/(1.05)² = $907.03' },
        { name: 'Future Value', expression: 'FV = PV(1 + r)ᵗ', variables: ['PV: present value', 'r: interest rate', 't: time'], example: 'For PV = $1000, r = 5%, t = 2 years: FV = 1000(1.05)² = $1102.50' }
    ],
    statistics: [
        { name: 'Mean', expression: 'x̄ = Σx/n', variables: ['Σx: sum of values', 'n: number of values'], example: 'For values [2,4,6,8]: x̄ = (2+4+6+8)/4 = 5' },
        { name: 'Standard Deviation', expression: 'σ = √(Σ(x-μ)²/N)', variables: ['x: each value', 'μ: mean', 'N: number of values'], example: 'For values [2,4,6,8] with mean 5: σ = √(((-3)²+(-1)²+1²+3²)/4) = 2.236' },
        { name: 'Variance', expression: 'σ² = Σ(x-μ)²/N', variables: ['x: each value', 'μ: mean', 'N: number of values'], example: 'Square of standard deviation' },
        { name: 'Z-Score', expression: 'z = (x-μ)/σ', variables: ['x: value', 'μ: mean', 'σ: standard deviation'], example: 'For x = 8, μ = 5, σ = 2.236: z = (8-5)/2.236 = 1.34' }
    ],
    chemistry: [
        { name: 'Density', expression: 'ρ = m/V', variables: ['m: mass', 'V: volume'], example: 'For m = 10g, V = 2cm³: ρ = 10/2 = 5g/cm³' },
        { name: 'Molarity', expression: 'M = n/V', variables: ['n: moles of solute', 'V: volume in liters'], example: 'For n = 0.5mol, V = 2L: M = 0.5/2 = 0.25M' },
        { name: 'Gas Law', expression: 'PV = nRT', variables: ['P: pressure', 'V: volume', 'n: moles', 'R: gas constant', 'T: temperature'], example: 'Universal gas law equation' }
    ],
    calculus: [
        { name: 'Power Rule', expression: 'd/dx(xⁿ) = nx^(n-1)', variables: ['n: power'], example: 'For f(x) = x³: f\'(x) = 3x²' },
        { name: 'Product Rule', expression: 'd/dx(uv) = u(dv/dx) + v(du/dx)', variables: ['u, v: functions'], example: 'For f(x) = x²sin(x): f\'(x) = 2xsin(x) + x²cos(x)' },
        { name: 'Chain Rule', expression: 'd/dx(f(g(x))) = f\'(g(x))g\'(x)', variables: ['f, g: functions'], example: 'For f(x) = sin(x²): f\'(x) = cos(x²)(2x)' }
    ]
};

// Get DOM elements
const formulaCategory = document.getElementById('formula-category');
const formulaContainer = document.getElementById('formula-container');

// Display formulas based on selected category
function displayFormulas() {
    const category = document.getElementById('formula-category').value;
    const formulasContainer = document.getElementById('formula-container');
    
    // Clear current formulas
    formulasContainer.innerHTML = '';
    
    // Get formulas for the selected category
    const categoryFormulas = formulas[category] || [];
    
    if (categoryFormulas.length === 0) {
        formulasContainer.innerHTML = '<p class="no-formulas">No formulas available for this category.</p>';
        return;
    }
    
    // Create formula items
    categoryFormulas.forEach(formula => {
        const formulaItem = document.createElement('div');
        formulaItem.className = 'formula-item';
        
        // Create variable list items
        const variablesList = formula.variables.map(v => `<li>${v}</li>`).join('');
        
        formulaItem.innerHTML = `
            <div class="formula-header">
                <h3 class="formula-name">${formula.name}</h3>
                <button class="favorite-formula-btn" title="Add to favorites">
                    <i class="fas fa-star"></i>
                </button>
            </div>
            <div class="formula-content">
                <div class="formula-expression">${formula.expression}</div>
                <div class="formula-details" style="display: none;">
                    <div class="formula-variables">
                        <h4>Variables:</h4>
                        <ul>
                            ${variablesList}
                        </ul>
                    </div>
                    <div class="formula-example">
                        <h4>Example:</h4>
                        <p>${formula.example}</p>
                    </div>
                </div>
                <button class="show-details-btn">Show Details</button>
            </div>
        `;
        
        formulasContainer.appendChild(formulaItem);
    });
    
    // Add event listeners for showing formula details
    document.querySelectorAll('.show-details-btn').forEach(button => {
        button.addEventListener('click', showFormulaDetails);
    });
}

// Toggle formula details
function showFormulaDetails(event) {
    const button = event.target;
    const formulaContent = button.closest('.formula-content');
    const details = formulaContent.querySelector('.formula-details');
    const isHidden = details.style.display === 'none';
    
    // Update button text
    button.textContent = isHidden ? 'Hide Details' : 'Show Details';
    
    // Toggle details display
    details.style.display = isHidden ? 'block' : 'none';
}

// Event listeners
formulaCategory.addEventListener('change', displayFormulas);

// Initialize
displayFormulas(); 