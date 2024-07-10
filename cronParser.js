const parseCronExpression = (expression) => {
  // Split the cron expression into its individual parts using space as a delimiter
  const segments = expression.split(" ");

  // Check if the cron expression has the correct number of fields (5 time fields + 1 command)
  if (segments.length !== 6) {
    throw new Error("Invalid cron expression");
  }

  // Destructure the segments array into individual variables for easier access
  const [
    minuteField,
    hourField,
    dayOfMonthField,
    monthField,
    dayOfWeekField,
    commandField,
  ] = segments;

  // Function to expand each field into its detailed schedule
  const expandCronField = (field, maxRange, startOffset = 0) => {
    // Handle the '*' wildcard which represents all values in the range
    if (field === "*") {
      return Array.from({ length: maxRange }, (_, i) => i + startOffset).join(
        " "
      );
    }

    // Handle comma-separated values, ensuring each value is valid
    if (field.includes(",")) {
      const values = field.split(",");
      for (let value of values) {
        // Check if the value is a valid number
        if (!/^\d+$/.test(value)) {
          throw new Error("Invalid field value in cron expression");
        }
      }
      return values.join(" ");
    }

    // Handle step values in the format '*/step'
    if (field.includes("*/")) {
      const stepInterval = parseInt(field.split("*/")[1], 10);
      // Check if the step interval is a valid positive number
      if (isNaN(stepInterval) || stepInterval <= 0) {
        throw new Error("Invalid step value in cron expression");
      }
      // Generate values based on the step interval
      return Array.from(
        { length: Math.floor(maxRange / stepInterval) },
        (_, i) => i * stepInterval + startOffset
      ).join(" ");
    }

    // Handle ranges in the format 'start-end'
    if (field.includes("-")) {
      const [startRange, endRange] = field.split("-").map(Number);
      // Validate the start and end values
      if (
        isNaN(startRange) ||
        isNaN(endRange) ||
        startRange > endRange ||
        startRange < startOffset ||
        endRange >= maxRange + startOffset
      ) {
        throw new Error("Invalid range in cron expression");
      }
      // Generate values for the specified range
      return Array.from(
        { length: endRange - startRange + 1 },
        (_, i) => startRange + i
      ).join(" ");
    }

    // Handle single numeric values
    if (!/^\d+$/.test(field)) {
      throw new Error("Invalid field value in cron expression");
    }
    const singleValue = parseInt(field, 10);
    // Validate the single value
    if (
      isNaN(singleValue) ||
      singleValue < startOffset ||
      singleValue >= maxRange + startOffset
    ) {
      throw new Error("Invalid field value in cron expression");
    }

    // Return the valid single value as is
    return field;
  };

  // Expand each part of the cron expression and return the detailed schedule
  return {
    minute: expandCronField(minuteField, 60), // Expand the minute field (0-59)
    hour: expandCronField(hourField, 24), // Expand the hour field (0-23)
    dayOfMonth: expandCronField(dayOfMonthField, 31, 1), // Expand the day of month field (1-31)
    month: expandCronField(monthField, 12, 1), // Expand the month field (1-12)
    dayOfWeek: expandCronField(dayOfWeekField, 7), // Expand the day of week field (0-6)
    command: commandField, // Return the command as is
  };
};

module.exports = parseCronExpression;
