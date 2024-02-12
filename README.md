# Web Scraping and Data Processing with Puppeteer

This project demonstrates an advanced use of Puppeteer to scrape and process data from [CreepJS](https://abrahamjuliot.github.io/creepjs/), a website that provides detailed browser fingerprinting information. The goal is to automate the detection and removal of personal information, emphasizing privacy protection. The scraper is designed to be stealthy and efficient, incorporating techniques to avoid detection and ensure the scalability of the solution.

## Features

- **Data Scraping:** Automated collection of trust score, lies, bot status, and fingerprint (FP ID) from CreepJS.
- **Stealth Techniques:** Utilizes randomizing user-agent strings and emulating human-like behavior to avoid detection.
- **Data Output:** Generates JSON files with scraped data and PDF snapshots of the webpage.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your system. Then, clone this repository and install the dependencies.

```bash
git clone https://github.com/koko-js478/array-assignment
cd array-assignment
npm install
```

## Usage

Run the scraper with the following command:

```bash
node scraper.js
```

This script performs the following actions:

1. Opens the CreepJS website.
2. Scrapes the required fields (trust score, lies, bot, fingerprint FP ID).
3. Saves the data in JSON format and creates a PDF snapshot of the page.
4. Repeats the process three times to generate a total of six files (3 JSON, 3 PDF).

## Output

The output consists of JSON files containing the scraped data and PDF files of the webpage snapshots. These files are stored in the project directory.

- JSON Format: The JSON files (output.json) contain an array of objects with the scraped data.
- PDF Snapshots: The PDF files are named pdf-<index>.pdf, where <index> is the iteration number.

## Challenges and Notes

- Achieving a high trust score required careful attention to emulate human-like interactions accurately.
- The dynamic nature of the CreepJS page, with elements like "Computing..." placeholders, necessitated the use of mutation observers and custom polling to ensure data accuracy.
- Puppeteer's stealth mode and randomized user-agent strings were crucial in avoiding detection by anti-scraping measures.

## Contributing

We welcome contributions and suggestions to improve this project. Please follow the standard GitHub pull request process if you have enhancements or bug fixes.

## License

This project is open-source and available under the MIT License.

## Acknowledgments

- [CreepJS](https://abrahamjuliot.github.io/creepjs/) for providing a comprehensive browser fingerprinting tool.
- [Puppeteer](https://pptr.dev/) documentation and community for valuable resources and support.
