#!/bin/bash

# Array of URLs of sites to check
urls=(
    "https://google.com"
    "https://facebook.com"
    "https://twitter.com"
    "httpS://dummysite.com"
)

# Log file name
logfile="echo_logs.log"

# Create the log file if it does not exist, or clear it if it does, before writing new data
> "$logfile"

# Function for checking the status of the site
check_site() {  # "$1" stands for the site url
    if curl -s -L --head "$1" | grep "200" > /dev/null; then # curl - HTTP-request (GET by default), -s - silent, -L - follow the redirects, --head only; grep - check that the status is 200
        echo "$1 is UP"                 # output to console (by default)
        echo "$1 is UP" >> "$logfile"   # output to file (using >>), appending new lines to existing ones
    else
        echo "$1 is DOWN" | tee -a "$logfile"   # output to console and to file (tee makes possible two outputs)
    fi
}

# Website check
for url in "${urls[@]}"; do
    check_site "$url"
done

# Display a message that the verification of the sites is complete
echo "Echo results have been logged to $logfile"

# ./echo_script.sh to run the script from the script's folder
