export const validTransition = (currentStatus, newStatus) => {
  const validTransitions = {
    Placed: ["Preparing", "Cancelled"],

    Preparing: ["Out for Delivery"],

    "Out for Delivery": ["Delivered"],

    Delivered: [],

    Cancelled: [],
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
};
