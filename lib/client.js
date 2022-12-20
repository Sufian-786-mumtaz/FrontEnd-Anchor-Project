import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
export const client = SanityClient({
    projectId: "m0xlrbrg",
    dataset: "production",
    apiVersion: "2022-11-22",
    useCdn: true,
    token: "skm0QUjoUmNU5FikgmBN86rWncvxHeTHYEJTG9TTkscF3MwfIR4uqdpQFHCfxzU22ZhJWbK1aKzR4JaC46PoglMyIP8jjrxBSyZQXg4ze2LEUhOkFB0RiIcTBCyyEXX4eY7r1gDME5uWkbhEbuprQM41tN9FPR9hUxTDv7fUD1Zwmb19jffL"
})

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)