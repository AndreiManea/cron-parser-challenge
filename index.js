#!/usr/bin/env node

const parseCronExpression = require("./cronParser");

// Pad the field name to 14 characters
const formatFieldName = (name) => {
  return name.padEnd(14);
};

// Retrieve the cron expression from command line arguments
const cronExp = process.argv[2];

// Check if a cron expression was provided
if (!cronExp) {
  console.error('Usage: cron-parser "<cron_expression>"');
  process.exit(1);
}

// Parse the cron expression
const parsedExp = parseCronExpression(cronExp);

// Display the parsed cron expression in a formatted manner
console.log(`${formatFieldName("minute")} ${parsedExp.minute}`);
console.log(`${formatFieldName("hour")} ${parsedExp.hour}`);
console.log(`${formatFieldName("day of month")} ${parsedExp.dayOfMonth}`);
console.log(`${formatFieldName("month")} ${parsedExp.month}`);
console.log(`${formatFieldName("day of week")} ${parsedExp.dayOfWeek}`);
console.log(`${formatFieldName("command")} ${parsedExp.command}`);
