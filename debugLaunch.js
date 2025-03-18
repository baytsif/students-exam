
import fetch from 'node-fetch';

const config = {
    apiURl: "https://fdo.rocketlaunch.live/json/launches/nexx/5",
};

// Fallback JSON if fetch fails
const fallbackData = {
  result: [
    { name: "Falcon 9 Starlink", startwindowdate: "2025-04-10T14:00:00Z" },
    { name: "Atlas V NROL", startwindowdate: "2025-03-25T10:00:00Z" },
    { name: "Electron Test", startwindowdate: "2025-04-01T20:30:00Z" },
  ],
};

async function getLaunchInfo() {
  let response;
  try {
    response = await fetch(config.apiURL); 
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (err) {
    console.log("Fetch failed, using fallback data...");

    return fallbackData; 
  }

  // Attempt to parse JSON
  const data = await response.json();

  for (let item of data.results) {
    return item;
  }
}

async function printMostRecentLaunch() {
  const launchInfo = await getLaunchInfo();
  console.log("Most Up-To-Date Launch:", launchInfo.date);
}

printMostRecentLaunch();
