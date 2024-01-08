export const formatDate = (dateString) => {
  const currentDate = new Date();
  const creationDate = new Date(dateString);
  const timeDiff = currentDate - creationDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsDiff = Math.floor(daysDiff / 30);
  if (monthsDiff >= 1) {
    return `${monthsDiff} month${monthsDiff !== 1 ? "s" : ""}`;
  } else {
    return `${daysDiff} day${daysDiff !== 1 ? "s" : ""}`;
  }
};

export const calculateTotalRating = (reviews) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce(
    (sum, review) => sum + parseFloat(review.rating),
    0
  );
  const averageRating = totalRating / reviews.length;

  return averageRating;
};

export const getDefaultDates = () => {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  return {
    checkIn: formatDates(today),
    checkOut: formatDates(nextDay),
  };
};

export const formatDates = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateNumNights = (checkInDate, checkOutDate) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const checkInTime = new Date(checkInDate).getTime();
  const checkOutTime = new Date(checkOutDate).getTime();
  const diffDays = Math.round(Math.abs((checkOutTime - checkInTime) / oneDay));

  return diffDays || 1;
};
