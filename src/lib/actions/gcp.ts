"use server";
import { storage } from "../storage";

export async function GetSignedUrl(fileName: string) {
  // I am not including the key in the github repo, but this key goes in the root of the project.
  const [url] = await storage
    .bucket("get-a-pet-images")
    .file(fileName)
    .getSignedUrl({
      action: "read",
      version: "v4",
      expires: Date.now() + 15 * 60 * 1000,
    });

  return url;
}
