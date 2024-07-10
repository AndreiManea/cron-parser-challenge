const parseCronExpression = require("./cronParser");

// Happy Paths
test("To parse typical valid cron expression correctly", () => {
  const expression = "*/15 0 1,15 * 1-5 /usr/bin/find";
  const result = parseCronExpression(expression);
  expect(result).toEqual({
    minute: "0 15 30 45",
    hour: "0",
    dayOfMonth: "1 15",
    month: "1 2 3 4 5 6 7 8 9 10 11 12",
    dayOfWeek: "1 2 3 4 5",
    command: "/usr/bin/find",
  });
});

test("To parse cron expression with single values correctly", () => {
  const expression = "0 12 1 1 0 /usr/bin/find";
  const result = parseCronExpression(expression);
  expect(result).toEqual({
    minute: "0",
    hour: "12",
    dayOfMonth: "1",
    month: "1",
    dayOfWeek: "0",
    command: "/usr/bin/find",
  });
});

test("To parse cron expression with ranges correctly", () => {
  const expression = "0 0 1-7 1 0 /usr/bin/find";
  const result = parseCronExpression(expression);
  expect(result).toEqual({
    minute: "0",
    hour: "0",
    dayOfMonth: "1 2 3 4 5 6 7",
    month: "1",
    dayOfWeek: "0",
    command: "/usr/bin/find",
  });
});

test("To parse cron expression with steps correctly", () => {
  const expression = "*/10 * * * * /usr/bin/find";
  const result = parseCronExpression(expression);
  expect(result).toEqual({
    minute: "0 10 20 30 40 50",
    hour: "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23",
    dayOfMonth:
      "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31",
    month: "1 2 3 4 5 6 7 8 9 10 11 12",
    dayOfWeek: "0 1 2 3 4 5 6",
    command: "/usr/bin/find",
  });
});

// Sad Paths
test("To throw error for cron expression with missing fields", () => {
  const expression = "*/15 0 1,15 * /usr/bin/find"; // Missing one field
  expect(() => parseCronExpression(expression)).toThrow(
    "Invalid cron expression"
  );
});

test("To throw error for invalid range in cron expression", () => {
  const expression = "*/15 0 32-31 * 1-5 /usr/bin/find"; // Invalid range in day of month
  expect(() => parseCronExpression(expression)).toThrow(
    "Invalid range in cron expression"
  );
});

test("To throw error for invalid step value in cron expression", () => {
  const expression = "*/-5 0 1,15 * 1-5 /usr/bin/find"; // Invalid step value in minute
  expect(() => parseCronExpression(expression)).toThrow(
    "Invalid step value in cron expression"
  );
});

test("To throw error for invalid field value in cron expression", () => {
  const expression = "*/15 0 A,15 * 1-5 /usr/bin/find"; // Invalid value in day of month
  expect(() => parseCronExpression(expression)).toThrow(
    "Invalid field value in cron expression"
  );
});

test("To throw error for out of bounds field value in cron expression", () => {
  const expression = "70 0 1,15 * 1-5 /usr/bin/find"; // Minute out of bounds
  expect(() => parseCronExpression(expression)).toThrow(
    "Invalid field value in cron expression"
  );
});
