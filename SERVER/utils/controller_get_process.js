const mongoose = require("mongoose");

// DATE CONDITIONS
exports.processDate = (dateString) => {
  const parts = dateString.split("-"); // Split "MM-DD-YYYY"
  if (parts.length === 3) {
    const [month, day, year] = parts.map(Number);
    // Check if valid date
    const parsedDate = new Date(year, month - 1, day); // Months are 0-based in JS
    if (!isNaN(parsedDate.getTime())) {
      // Set start and end of the day
      const startOfDay = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
        0,
        0,
        0,
        0
      ); // 00:00:00
      const endOfDay = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
        23,
        59,
        59,
        999
      ); // 23:59:59

      return { $gte: startOfDay, $lte: endOfDay }; // Match full day
    }
  }
  return null;
};

exports.numberFilter = (query, filters, operator) => {
  Object.entries(filters).forEach(([field, value]) => {
    if (value !== undefined && value !== "") {
      // Check if value is a number
      if (!isNaN(Number(value))) {
        const numericValue = Number(value);

        switch (operator) {
          case "<":
            query[field] = { $lt: numericValue };
            break;
          case ">":
            query[field] = { $gt: numericValue };
            break;
          case ">=":
            query[field] = { $gte: numericValue };
            break;
          case "<=":
            query[field] = { $lte: numericValue };
            break;
          default:
            query[field] = numericValue; // Exact match
        }
      } else {
        // Treat non-numeric values as exact matches
        query[field] = value;
      }
    }
  });
};

exports.dateFilter = (query, filters) => {
  Object.entries(filters).forEach(([field, value]) => {
    if (value !== undefined && value !== "" && value !== "undefined")
      query[field] = this.processDate(value);
  });
};

exports.textFilter = (query, filters) => {
  Object.entries(filters).forEach(([field, value]) => {
    if (value && value !== "undefined") {
      query[field] = { $regex: value, $options: "i" }; // Case-insensitive regex
    }
  });
};

exports.objectFilter = async (query, filters, relateModelName) => {
  try {
    for (const [field, value] of Object.entries(filters)) {
      if (value && value !== "undefined") {
        // Query the related model for matching records
        const relatedDocs = await mongoose.model(relateModelName).find({
          [field]: { $regex: value, $options: "i" },
        });

        // Extract matching IDs
        const relatedIds = relatedDocs.map((doc) => doc._id);

        // Add to query (assuming a foreign key relationship)
        if (relatedIds.length > 0) {
          query[field] = { $in: relatedIds };
        }
      }
    }
  } catch (error) {
    console.error("Error filtering by related model:", error);
  }
};
