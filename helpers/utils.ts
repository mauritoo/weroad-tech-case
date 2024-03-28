export const formatDate = (dateString: string) => dateString.slice(0, 10);

const MAX_DESCRIPTION_LENGTH = 70;
export const truncateDescription = (description: string) => {
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
  }
  return description;
};

export const renderPrice = (price: number) => {
  return `€ ${price}`;
};
export const renderRating = (rating: number | undefined) => {
  return rating ? "⭐️".repeat(rating) + "☆".repeat(5 - rating) : "";
};
