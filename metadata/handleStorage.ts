import { Web3Storage, Blob, File } from "web3.storage";
import * as metadata from "./metadata.json";

//export function handleStorage(name, royalties, author, description) {
export async function handleStorage() {

  /**
   * - edit the metadata
   * - store the media https://github.com/ATO-nft/ato/issues/4
   * - add the media hash to json
   * - edit the license details https://github.com/ATO-nft/ato/issues/1
   * - call Āto API https://github.com/ATO-nft/ato/issues/2
   * - store the license
   * - add the license hash
   * - store the metadata https://github.com/ATO-nft/ato/issues/5
   * - return the uri
   **/

  function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() } as any);
  }

  function makeFileObjects() {
    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "metadata.json"),
    ];
    return files;
  }

  async function storeFiles(files: any) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
  }

  makeStorageClient();
  const uri = (await storeFiles(makeFileObjects())) + "/metadata.json";
  console.log("Storage done. Full URI:", "https://ipfs.io/ipfs/" + uri, " ✅");

  return uri;
}