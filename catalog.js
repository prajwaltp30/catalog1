const fs = require('fs');

// Function to decode a number from a specific base to base 10
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Extract and decode the points from the input JSON data
function getPoints(input) {
    const points = [];
    for (let key in input) {
        if (key !== "keys") {
            let x = parseInt(key);  // x is the key of the object
            let base = parseInt(input[key]["base"]);  // base of the value
            let y = decodeValue(base, input[key]["value"]);  // decode the y value
            points.push({ x, y });
        }
    }
    return points;
}

// Lagrange interpolation to find the constant term (c)
function lagrangeInterpolation(points, k) {
    let c = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                term *= (0 - xj) / (xi - xj);  // Calculating Lagrange basis polynomial
            }
        }

        c += term;  // Add the current term to the constant term (c)
    }

    return c;
}

// Main function to calculate the constant term (c) from the input JSON file
function calculateConstantTermFromFile(fileName) {
    // Read the JSON file
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }
        // Parse the JSON data
        const input = JSON.parse(data);
        const k = input.keys.k;
        const points = getPoints(input);

        // Select the first k points (as required for interpolation)
        const selectedPoints = points.slice(0, k);

        // Perform Lagrange interpolation to find the constant term
        const constantTerm = lagrangeInterpolation(selectedPoints, k);
        console.log("The constant term (c) is:", constantTerm);
    });
}

// Provide the path to the JSON file
const jsonFilePath = './input.json';
calculateConstantTermFromFile(jsonFilePath);