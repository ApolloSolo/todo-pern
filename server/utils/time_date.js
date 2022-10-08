const daysLeft = (dueDate, startDate) => {
  const new_due = new Date(dueDate);
  const new_start = new Date(startDate);

  return (new_due - new_start) / (1000 * 60 * 60 * 24);
};

module.exports = { daysLeft };
