import requests

config = {
    "apiUrl": "https://fdo.rocketlaunch.live/json/launches/nexx/5", 
}

# Fallback data if fetch fails
fallback_data = {
    "result": [
        {"name": "Falcon 9 Starlink", "startwindowdate": "2025-04-10T14:00:00Z"},
        {"name": "Atlas V NROL",      "startwindowdate": "2025-03-25T10:00:00Z"},
        {"name": "Electron Test",     "startwindowdate": "2025-04-01T20:30:00Z"},
    ]
}

def get_launch_info():
    try:
        response = requests.get(config["apiURL"])
        response.raise_for_status()
    except:
        print("Fetch failed, using fallback data...")
        return fallback_data

    data = response.json()

    for item in data["results"]:
        return item

def print_most_recent_launch():
    launch_info = get_launch_info()
    print("Most Up-To-Date Launch:", launch_info["name"])

print_most_recent_launch()
