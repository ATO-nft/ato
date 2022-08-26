import { Web3Storage, Blob, File } from "web3.storage";
//export function handleStorage(name, royalties, author, description) {
export async function handleStorage(name, author, description) {

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

  const mediaFile = "https://bafybeibghsiwvatdc67ow5vkqxbnm775dcralexliakwi6st5rln7xi7c4.ipfs.dweb.link/thistle-black-pixel.png";

  const license = "CC0 1.0 Universal";

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
        "trait_type":"View licence",
        "value":license
      }
    ],
    "license_details":[
      {
        "trait_type":"metaverse",
        "value":"true"
      },
      {
        "trait_type":"adaptation",
        "value":"false"
      },
      {
        "trait_type":"pfp",
        "value":"true"
      },
      {
        "trait_type":"...",
        "value":"..."
      }]
    }
  }


  /*

  - Exclusivity : yes / no 
Yes: The NFT holder has an exclusive right to the rights concerned.
No : The NFT holder does not have an exclusive right to the rights concerned
- Private use : yes / no 
Yes : The NFT holder has the right to use, reproduce and archive the NFT work on a strictly private basis
No : The NFT holder has no rights on the work
- Display on marketplace : yes / no 
Yes : The NFT holder has the right to use, reproduce and archive the NFT work in a public capacity within the limits of the promotion of the work for resale on marketplace
No : The NFT holder has no right to represent the work in a public
- Display on every media : yes /no 
Yes : The NFT holder has the right to use, reproduce and archive the NFT work in public on any media : social network, metaverse…
No : The NFT holder does not have the right to reproduce and represent the NFT in a public capacity, except for the possible right of representation or reproduction for the sale of the NFT
- Right to adapt : yes / no
Yes : The NFT holder has the right to modify the work within the limits of the author's moral rights
No : The NFT holder cannot modify the work
- Right to add a logo : yes / no
Yes : The NFT holder has the right to add a logo to the work within the limits of the author's moral rights
No : The NFT holder cannot add a logo to the work
- Merchandising rights : yes / no 
Yes : The holder of the NFT can use the work on any support in particular for merchandising, it can in particular print the work on goodies 
No : The NFT holder cannot use the artwork for merchandising

*/

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