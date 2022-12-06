export async function makeLicense() {

  console.log("Creating IP license...")

  // TODO: replace by a call to Āto API
  const licenseFileName = "thistle-test-IP-license.pdf" // replace with your own license file name. The file must be located in the /metadata directory.

  console.log("License File Name:", licenseFileName)
  return licenseFileName
}