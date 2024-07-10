# Cron Expression Parser

This project is a command-line application that parses a cron expression and expands each field to show the times at which it will run. The input is a standard cron format with five time fields (minute, hour, day of month, month, and day of week) plus a command.

## Features

- Parses cron expressions and expands fields to show scheduled times.
- Supports wildcard (`*`), step intervals (`*/n`), ranges (`start-end`), and lists (`a,b,c`).
- Validates input fields and provides descriptive error messages for invalid inputs.
- Outputs the parsed cron expression in a readable, tabular format.

## Prerequisites

- Node.js (version 12 or higher)

## Installation

1. Clone the repository: <br/>
   `git clone https://github.com/your-username/cron-parser.git`

2. Install necessary dependencies <br/>
   `npm install`

3. Make the 'index.js' file executable <br/>
   `chmod +x ./index.js`

## Usage

- To run the cron parser, use the following command: <br/>
  `./index.js "_/15 0 1,15 * 1-5 /usr/bin/find"` <br/>
  This will output: </br>
  `minute 0 15 30 45` </br>
  `hour 0` </br>
  `day of month 1 15` </br>
  `month 1 2 3 4 5 6 7 8 9 10 11 12`</br>
  `day of week 1 2 3 4 5` </br>
  `command /usr/bin/find` </br>

## Running Tests

- To run tests, use the following command: <br/>
  `npm test`

## Project Structure

- `index.js`: Entry point of the command-line application.
- `cronParser.js`: Contains the function to parse and expand cron expressions.
- `cronParser.test.js`: Contains the test suite for validating the cron parser.
