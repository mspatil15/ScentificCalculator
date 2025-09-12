# Scientific Calculator Web Application

A modern, responsive scientific calculator built with vanilla HTML, CSS, and JavaScript. Features a glassmorphism design with comprehensive mathematical functions.

## Project Structure

```
scientific-calculator/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Calculator logic and functionality
└── README.md           # Project documentation
```

## Features

### Basic Operations
- Addition, subtraction, multiplication, division
- Percentage calculations
- Decimal number support
- Positive/negative number toggle

### Scientific Functions
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (ln, log10)
- Power and root functions (x^y, √, ∛)
- Mathematical constants (π, e)
- Factorial calculations
- Reciprocal function (1/x)

### User Interface
- **Modern Design**: Glassmorphism effect with translucent elements
- **Responsive Layout**: Adapts to mobile and desktop screens
- **Visual Feedback**: Hover effects and smooth animations
- **Color-coded Buttons**: Different styles for numbers, operators, and functions
- **History Display**: Shows current calculation progress

### Additional Features
- **Angle Mode Toggle**: Switch between degrees and radians
- **Keyboard Support**: Full keyboard input functionality
- **Error Handling**: Graceful error messages and auto-recovery
- **Accessibility**: Focus indicators and semantic markup

## Setup Instructions

1. **Download Files**: Save all four files in the same directory:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md`

2. **Open Calculator**: Double-click `index.html` or open it in any modern web browser

3. **No Server Required**: The calculator runs entirely in the browser with no external dependencies

## Usage

### Mouse/Touch Input
- Click buttons to input numbers and operations
- Use the mode toggle (DEG/RAD) for trigonometric functions
- Clear button (C) resets everything, Clear Entry (CE) clears current input

### Keyboard Shortcuts
- **Numbers**: 0-9
- **Operators**: +, -, *, /, %
- **Decimal**: . (period)
- **Equals**: Enter or =
- **Clear All**: Escape or C
- **Backspace**: Backspace key
- **Power**: ^ (caret)

### Scientific Functions
1. Enter a number
2. Click the desired function button (sin, cos, tan, log, etc.)
3. The result appears immediately

### Multi-step Calculations
1. Enter first number
2. Choose operator (+, -, ×, ÷, etc.)
3. Enter second number
4. Press = or Enter for result

## Browser Compatibility

- **Chrome**: Version 60+
- **Firefox**: Version 55+
- **Safari**: Version 12+
- **Edge**: Version 79+

## Technical Details

### File Responsibilities

**index.html**
- Semantic HTML structure
- Button layout and organization
- Links to CSS and JavaScript files

**styles.css**
- Glassmorphism visual effects
- Responsive grid layout
- Button styling and animations
- Mobile-first responsive design

**script.js**
- Calculator state management
- Mathematical operations and functions
- Error handling and validation
- Keyboard event handling
- Display formatting

### Key Functions

- `inputNumber()`: Handles number input
- `inputOperator()`: Manages mathematical operators
- `inputFunction()`: Processes scientific functions
- `calculate()`: Performs calculations
- `formatResult()`: Formats display output
- `displayError()`: Handles error states

## Customization

### Styling
Modify `styles.css` to change:
- Color scheme (update gradient backgrounds)
- Button sizes and spacing
- Typography and fonts
- Animation effects

### Functionality
Extend `script.js` to add:
- Additional mathematical functions
- Memory operations
- Unit conversions
- Custom constants

### Layout
Update `index.html` to:
- Rearrange button positions
- Add new function buttons
- Modify display elements

## Development Notes

- **No External Dependencies**: Pure vanilla JavaScript implementation
- **Memory Efficient**: Uses in-memory storage only (no localStorage)
- **Error Recovery**: Automatic error clearing after 2 seconds
- **Precision Handling**: Rounds results to prevent floating-point errors
- **Modular Code**: Functions are organized and reusable

## Known Limitations

- Very large numbers (>1e15) display in scientific notation
- Factorial function limited to inputs ≤ 170
- Trigonometric functions may have minor floating-point precision limits

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests. The modular structure makes it easy to add new features or modify existing functionality.