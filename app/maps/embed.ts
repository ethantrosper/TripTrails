export const formatEmbedURL = (location: string): string => {
  let url = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAP_KEY}&q=`;

  /**
   * converts anything in the location string
   * (excluding alphanumeric characters) to "+"
   * for the google embed format
   */
  url += location.replace(/[^a-zA-Z0-9]/g, "+").replace(/\++/g, "+");
  return url;
};
