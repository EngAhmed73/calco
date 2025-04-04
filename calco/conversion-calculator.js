// Conversion data for different categories
const conversionData = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    area: {
        'square meter': 1,
        'square kilometer': 0.000001,
        'square centimeter': 10000,
        'square mile': 3.861e-7,
        'square yard': 1.19599,
        'square foot': 10.7639,
        'square inch': 1550,
        hectare: 0.0001,
        acre: 0.000247105
    },
    volume: {
        'cubic meter': 1,
        liter: 1000,
        milliliter: 1000000,
        'cubic foot': 35.3147,
        'cubic inch': 61023.7,
        'US gallon': 264.172,
        'US quart': 1056.69,
        'US pint': 2113.38,
        'US cup': 4226.75
    },
    mass: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        'metric ton': 0.001,
        pound: 2.20462,
        ounce: 35.274,
        'stone': 0.157473
    },
    speed: {
        'meters per second': 1,
        'kilometers per hour': 3.6,
        'miles per hour': 2.23694,
        knot: 1.94384,
        'feet per second': 3.28084
    },
    temperature: {
        celsius: 'base',
        fahrenheit: 'custom',
        kelvin: 'custom'
    },
    time: {
        second: 1,
        minute: 1/60,
        hour: 1/3600,
        day: 1/86400,
        week: 1/604800,
        month: 1/2592000,
        year: 1/31536000
    },
    digital: {
        bit: 1,
        byte: 0.125,
        kilobyte: 0.000125,
        megabyte: 1.25e-7,
        gigabyte: 1.25e-10,
        terabyte: 1.25e-13
    }
};

// Initialize conversion category
function initializeConversion() {
    // Check for hash in URL
    if (window.location.hash) {
        const category = window.location.hash.substring(1);
        if (conversionData[category]) {
            document.getElementById('conversion-category').value = category;
        }
    }
    
    const category = document.getElementById('conversion-category').value;
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    
    // Clear existing options
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    // Add new options based on category
    const units = Object.keys(conversionData[category]);
    units.forEach(unit => {
        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));
    });
    
    // Set default "to" unit to something different than "from" unit
    if (units.length > 1) {
        toUnit.value = units[1];
    }
    
    // Trigger conversion
    convert();
    
    // Update URL hash
    window.location.hash = category;
}

// Perform conversion
function convert() {
    const category = document.getElementById('conversion-category').value;
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const fromValue = parseFloat(document.getElementById('from-value').value);
    
    if (isNaN(fromValue)) {
        document.getElementById('to-value').value = '';
        return;
    }
    
    let result;
    if (category === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        // Convert to base unit first, then to target unit
        const baseValue = fromValue / conversionData[category][fromUnit];
        result = baseValue * conversionData[category][toUnit];
    }
    
    document.getElementById('to-value').value = formatResult(result);
    
    // Update memory of last conversion for efficiency
    localStorage.setItem('lastConversion', JSON.stringify({
        category: category,
        fromUnit: fromUnit,
        toUnit: toUnit,
        fromValue: fromValue,
        result: result
    }));
}

// Special handling for temperature conversions
function convertTemperature(value, from, to) {
    let celsius;
    
    // Convert to Celsius first
    switch(from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target unit
    switch(to) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

// Format result to appropriate decimal places
function formatResult(value) {
    if (Math.abs(value) < 0.000001 || Math.abs(value) > 999999) {
        return value.toExponential(6);
    }
    return Number(value.toPrecision(6));
}

// Swap units
function swapUnits() {
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const fromValue = document.getElementById('from-value');
    const toValue = document.getElementById('to-value');
    
    // Swap units
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
    
    // Swap values if they exist
    if (fromValue.value && toValue.value) {
        [fromValue.value, toValue.value] = [toValue.value, fromValue.value];
    } else {
        // If no values to swap, recalculate
        convert();
    }
}

// Restore from memory on page load for better efficiency
function restoreFromMemory() {
    const lastConversion = localStorage.getItem('lastConversion');
    if (lastConversion) {
        try {
            const data = JSON.parse(lastConversion);
            if (data.category && conversionData[data.category]) {
                document.getElementById('conversion-category').value = data.category;
                initializeConversion();
                
                // Restore units and values after initialization
                setTimeout(() => {
                    if (data.fromUnit) document.getElementById('from-unit').value = data.fromUnit;
                    if (data.toUnit) document.getElementById('to-unit').value = data.toUnit;
                    if (data.fromValue) document.getElementById('from-value').value = data.fromValue;
                    convert();
                }, 100);
            }
        } catch (e) {
            console.log('Error restoring conversion:', e);
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize on page load
    initializeConversion();
    
    // Restore last conversion if available
    if (!window.location.hash) {
        restoreFromMemory();
    }
    
    // Add event listeners
    document.getElementById('conversion-category').addEventListener('change', initializeConversion);
    document.getElementById('from-unit').addEventListener('change', convert);
    document.getElementById('to-unit').addEventListener('change', convert);
    document.getElementById('from-value').addEventListener('input', convert);
    
    const swapButton = document.getElementById('swap-units');
    if (swapButton) {
        swapButton.addEventListener('click', swapUnits);
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', function() {
        if (window.location.hash) {
            const category = window.location.hash.substring(1);
            if (conversionData[category]) {
                document.getElementById('conversion-category').value = category;
                initializeConversion();
            }
        }
    });
}); 