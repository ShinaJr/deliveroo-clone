import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

//connecting to the sanity backend
const client = sanityClient({
  projectId: "2e80m71w",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

//we use a builder to get the the url of the images we put on there
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source); //helper function

//run this to add exception for local host 3000 cors policy
//sanity cors  add https://localhost:3000

export default client;
