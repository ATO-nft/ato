export async function makeLicense() {

  console.log("Creating IP license...")

  // To do: replace by a call to Āto API
  const licenseFileName = "thistle-test-IP-license.pdf" // replace with your own license file name

  console.log("licenseFileName:", licenseFileName)
  return licenseFileName
}