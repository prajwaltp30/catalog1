const fs = require('fs');

// Function to decode the base-specific y values
function decodeY(base, value) {
  return parseInt(value, base);
}

// Function to compute Lagrange interpolation to find constant term 'c'
function lagrangeInterpolation(points) {
  let c = 0;
  const k = points.length;

  for (let i = 0; i < k; i++) {
    let [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        let [xj] = points[j];
        term *= xj / (xj - xi);
      }
    }

    c += term;
  }

  return c;
}

// Function to solve for the constant term 'c' from the polynomial roots
function solveForConstant(jsonData) {
  const { n, k } = jsonData.keys;
  const points = [];

  // Extract and decode roots
  for (let i = 1; i <= n; i++) {
    const base = parseInt(jsonData[i].base);
    const value = jsonData[i].value;
    const decodedY = decodeY(base, value);

    points.push([i, decodedY]); // Add (x, y) pair
  }

  // Select first k points for interpolation
  const selectedPoints = points.slice(0, k);

  // Compute the constant term using Lagrange interpolation
  const c = lagrangeInterpolation(selectedPoints);

  return c;
}

// Read and parse input JSON file for Test Case 2
function readTestCase(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Solve Test Case 2
function main() {
  const testinput = readTestCase('testcase1.json');
  const testCase2 = readTestCase('input.json');
  const result2 = solveForConstant(testinput);
  console.log(`Constant term for Test Case 2: ${result2}`);
}

main();
