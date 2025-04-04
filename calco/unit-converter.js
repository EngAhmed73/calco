// Unit Converter Data
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
    },
    area: {
        units: ['square meters', 'square kilometers', 'square miles', 'square feet', 'acres', 'hectares'],
        conversions: {
            'square meters': 1,
            'square kilometers': 0.000001,
            'square miles': 3.861e-7,
            'square feet': 10.7639,
            'acres': 0.000247105,
            'hectares': 0.0001
        }
    },
    volume: {
        units: ['cubic meters', 'liters', 'gallons', 'cubic feet', 'milliliters'],
        conversions: {
            'cubic meters': 1,
            'liters': 1000,
            'gallons': 264.172,
            'cubic feet': 35.3147,
            'milliliters': 1000000
        }
    },
    speed: {
        units: ['meters per second', 'kilometers per hour', 'miles per hour', 'knots'],
        conversions: {
            'meters per second': 1,
            'kilometers per hour': 3.6,
            'miles per hour': 2.23694,
            'knots': 1.94384
        }
    },
    time: {
        units: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'],
        conversions: {
            'seconds': 1,
            'minutes': 1/60,
            'hours': 1/3600,
            'days': 1/86400,
            'weeks': 1/604800,
            'months': 1/2592000,
            'years': 1/31536000
        }
    },
    digital: {
        units: ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes'],
        conversions: {
            'bytes': 1,
            'kilobytes': 0.001,
            'megabytes': 0.000001,
            'gigabytes': 1e-9,
            'terabytes': 1e-12
        }
    }
};

// Get DOM elements
const conversionType = document.getElementById('conversion-type');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');

// Initialize unit dropdowns
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

// Conversion function
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

// Temperature conversion
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

// Swap units
function swapUnits() {
    const tempUnit = fromUnit.value;
    const tempValue = fromValue.value;

    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;

    fromValue.value = toValue.value;
    convert();
}

// Event listeners
conversionType.addEventListener('change', populateUnitDropdowns);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);
fromValue.addEventListener('input', convert);

// Initialize
populateUnitDropdowns(); 