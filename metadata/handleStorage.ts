import { Web3Storage, Blob, File , getFilesFromPath } from "web3.storage";
//export function handleStorage(name, royalties, author, description) {
export async function handleStorage(name: any, author: any, description: any) {

  function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() } as any)
  }

  /**
   * - store the media https://github.com/ATO-nft/ato/issues/4  ✅
   * - add the media hash to json  ✅
   * - edit the license details https://github.com/ATO-nft/ato/issues/1  ✅
   * - call Āto API https://github.com/ATO-nft/ato/issues/2
   * - store the license  ✅
   * - add the license hash to json  ✅
   * - add license to the json  ✅
   * - store the json https://github.com/ATO-nft/ato/issues/5  ✅
   * - return the uri  ✅
   */

  // const mediaFile = "https://ipfs.io/ipfs/bafybeibghsiwvatdc67ow5vkqxbnm775dcralexliakwi6st5rln7xi7c4/thistle-black-pixel.png"
  const mediaPath = "./metadata/thistle-black-pixel.jpg"
  const mediaFile: any = "https://ipfs.io/ipfs/" + (await storeLicense(await getFiles(mediaPath)) + "/thistle-test-IP-license.pdf")

  console.log("Media file stored ✅",mediaFile, " ")

  const path = "./metadata/thistle-test-IP-license.pdf"

  async function getFiles (path: any) {
    const File = await getFilesFromPath(path)
    console.log(`read ${File.length} file(s) from ${path}`)
    return File
  }

  async function storeLicense(license: any) {
    const client = makeStorageClient()
    const ip = await client.put(license)
    return ip;
  }

  // const license = "CC0 1.0 Universal"; // bad
  // const license = "https://ipfs.io/ipfs/bafybeihzpdxi43xtpbemmhi2ry5wqaj2iangccyumbyeis4bsfykzljazi/thistle-test-IP-license.pdf";
  const license: any = "https://ipfs.io/ipfs/" + (await storeLicense(await getFiles(path)) + "/thistle-test-IP-license.pdf")
  console.log("License properly stored. ✅", license)

  const metadata = {
    "name": name,
    "author": author,
    "description": description,
    "image": mediaFile,
    "license": license,     
    "attributes":[
      {
        "trait_type":"Resale rights (%)",
        "value":"10"
      },
      {
        "trait_type":"View IP licence",
        "value":license
      }
    ],
    "license_details":[
      {
        "trait_type":"exclusivity",
        "value":"true"
      },
      {
        "trait_type":"privateUse",
        "value":"true"
      },
      {
        "trait_type":"displayOnMarketplaces",
        "value":"true"
      },
      {
        "trait_type":"displayOnEveryMedia",
        "value":"true"
      },
      {
        "trait_type":"rightToAdapt",
        "value":"false"
      },
      {
        "trait_type":"rightToAddALogo",
        "value":"false"
      },
      {
        "trait_type":"merchandisingRights",
        "value":"true"
      }]
    };

  function makeFileObjects() {
    const blob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
    });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "metadata.json"),
    ];
    return files
  }

  async function storeFiles(files: any) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    return cid;
  }

  const uri = (await storeFiles(makeFileObjects())) + "/metadata.json";
  console.log("Metadata storage done. ✅", "https://ipfs.io/ipfs/" + uri)

  return uri
}