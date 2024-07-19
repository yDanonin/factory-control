export const formatDate = (date: Date) => {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};

// export const calculateHoursWorked = (entry: Date, exit: Date): string => {
//   const diff = exit.getTime() - entry.getTime();
//   const hours = Math.floor(diff / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//   return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
//     .toString()
//     .padStart(2, "0")}`;
// };
