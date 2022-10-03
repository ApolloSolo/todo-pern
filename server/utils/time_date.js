const daysLeft = (dueDate, startDate) => {
  return (dueDate - startDate) / (1000 * 60 * 60 * 24);
};

module.exports = { daysLeft };
