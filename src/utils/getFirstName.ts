export const getFirstName = (fullName: string) => {
  const nameParts = fullName.split(" ");
  return nameParts.slice(0, 2).join(" ");
};
