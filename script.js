// script.js

// Function to manage software assets
const softwareAssets = [];

function addAsset(name, license, renewalDate) {
    const asset = { name, license, renewalDate, createdAt: new Date() };
    softwareAssets.push(asset);
    return asset;
}

function renewLicense(assetName, newRenewalDate) {
    const asset = softwareAssets.find(a => a.name === assetName);
    if (asset) {
        asset.renewalDate = newRenewalDate;
        return asset;
    }
    return null;
}

function listAssets() {
    return softwareAssets;
}

// Example Usage
addAsset('Example Software', 'ABC123', '2026-05-01');
console.log(listAssets());

// You can add more functions as needed for full management capabilities.