const fs = require('fs');

// Function to decode the y-values based on their base and value
function decodeBaseValue(base, value) {
    return parseInt(value, base);
}

// Function to calculate the constant term (c) of the polynomial
function solveForConstant(jsonData) {
    const points = [];

    // Iterate over the object keys that contain the root data
    Object.keys(jsonData).forEach(key => {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = parseInt(jsonData[key].base);
            const y = decodeBaseValue(base, jsonData[key].value);
            points.push({ x, y });
        }
    });

 
    let c = 0;

    if (points.length > 0) {
        c = points[0].y;  
    }

    return c;
}

function main() {
    fs.readFile('.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const jsonData = JSON.parse(data);
        const constant = solveForConstant(jsonData);
        console.log('The constant term (c) of the polynomial is:', constant);
    });
}

main();
