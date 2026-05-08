# ink-browser-multimedia [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

## Docker Browser

- Navigate to the main repo folder
  - Make sure you are in the same directory as the `Dockerfile`
- Building a docker image from the Dockerfile if image is out of date
  - `sudo docker build -f Dockerfile -t ink-browser:latest .`
- Running the container from a new build
  - `sudo docker run -d --name ink-browser -p 3000:3000 ink-browser:latest`
- If a container already exists with the name of `ink-browser`
  - `sudo docker rm -f ink-browser`
  - Try the run command again
- Starting the container from an already built image
  - `sudo docker start ink-browser`
- Stop the container
  - `Sudo docker stop ink-browser`
- View the running project
  - Navigate to: `localhost:3000`

## Docker Apache Jena Fuseki

- Navigate to the main repo folder
  - Make sure you are in the same directory as the `Dockerfile2`
- Building a docker image from the Dockerfile if image is out of date
  - `sudo docker build -f Dockerfile2 -t apache-jena-fuseki:latest .`
- Running the container from a new build
  - `sudo docker run -d --name apache-jena-fuseki -p 3030:3030 apache-jena-fuseki:latest`
- If a container already exists with the name of `apache-jena-fuseki`
  - `sudo docker rm -f apache-jena-fuseki`
- Starting the container from an already built image
  - `sudo docker start apache-jena-fuseki`
- Stop the container
  - `sudo docker stop apache-jena-fuseki`
- View the gui in a browser
  - Navigate to: `localhost:3030`

## Docker tar file

- Saving the image to a tar file
  - `sudo docker save ink-browser:latest | gzip > ink-browser.tar.gz`
- Loading the image from a tar file
  - `sudo docker load < ink-browser.tar.gz`

## Apache Jena Fuseki alternative

- Navigate to
  - `https://dlcdn.apache.org/jena/binaries/`
- Linux
  - Check the version number
    - `apache-jena-fuseki-X.X.X.tar.gz`
  - Run in terminal to download
    - `wget https://dlcdn.apache.org/jena/binaries/apache-jena-fuseki-X.X.X.tar.gz`
  - Extract the files in the folder
    - `tar -xvzf apache-jena-fuseki-X.X.X.tar.gz`
- Mac
  - Click `apache-jena-fuseki-X.X.X.tar.gz` to download
  - Double click on the file and extract them
- Run in terminal
  - `cd apache-jena-fuseki-X.X.X`
  - `./fuseki-server`
- View
  - Navigate to: `localhost:3030`
- Add data
  - Click `manage` at the top of the page
  - Click `new dataset`
  - Name it `earthquake-usgs`
  - Click `Persistent (TDB2) – dataset will persist across Fuseki restarts`
  - Click `create dataset`
  - Click `add data`
  - Select the two files under `/data` in the main repo
  - Click `upload all`

## How Ink Browser Works ?

- Ink Browser Multimedia is a tool that extracts and links educational keyphrases from YouTube videos to relevant modules from the open-kg-curriculum repository. It leverages OCR, NLP, and GitHub API integrations to support a semantically searchable educational experience.

- Ink Browser consists of four main views, each serving a distinct purpose:

#### 1. YouTube Video View:

- Users paste a YouTube video URL.
  - The video plays within the browser.
  - When paused, the video frame is processed as follows:
    - The video is downloaded using yt-dlp
    - A frame is extracted via ffmpeg
    - Tesseract.js performs OCR on the extracted frame.

#### 2. Keyphrase List View:

- OCR text is passed through keyword-extractor.
- Extracted keywords are displayed in a list.
- Each keyword is clickable and acts as a search term.

#### 3. Module Detail View:

- On clicking a keyword:
  - A custom Levenshtein distance–based matcher checks for ≥80% similarity with modules in the open-kg-curriculum GitHub repository.
  - Uses GitHub REST API to fetch and display matched module folder details.

#### 4. User Guide View:

- This view will serve as a step-by-step interactive guide to help new users understand and navigate Ink Browser.

---

# First-Time Setup (Complete Installation)

Follow these steps if this is your **first time running Ink Browser**.

### Step 1: Clone Repository

```bash
git clone git@github.com:kastle-lab/ink-browser-multimedia.git
cd ink-browser-multimedia
```

### Step 2: Install Node.js

Download & install Node.js:

- [https://nodejs.org/en/download](https://nodejs.org/en/download)

Verify installation:

```bash
node -v
npm -v
```

### Step 3: Install Multimedia Dependencies

#### Windows

- Install [Chocolatey](https://chocolatey.org/install) (Package Manager).
- Open **PowerShell as Administrator** and run:
  ```powershell
  choco install ffmpeg -y
  choco install yt-dlp -y
  ```

#### Mac

- Install via Homebrew:
  ```bash
  brew install ffmpeg
  brew install yt-dlp
  ```

#### Linux (Debian/Ubuntu)

```bash
sudo apt update
sudo apt install ffmpeg -y
pip install yt-dlp
```

### Step 4: Setup Backend (Node.js Server)

```bash
cd server
npm install
npm start (nodemon has been used for running server continuously reflecting live changes)
```

---

# Running the Project First Time

### Build & Run (First Time)

```bash
docker build -f Dockerfile -t ink-browser:latest .
docker run -d --name ink-browser -p 3000:3000 ink-browser:latest
```

### Running the Server

```bash
cd server
node server.js
```

### Restarting Container (After any changes in the Project)

```bash
docker start ink-browser
docker stop ink-browser
```

### Restarting Container - Method 2 (if above doesn't work for you)

```bash
sudo docker rm -f ink-browser
docker build -f Dockerfile -t ink-browser:latest .
docker run -d --name ink-browser -p 3000:3000 ink-browser:latest
```

### Access the Project at:

- [http://localhost:3000](http://localhost:3000)

---

# Running the Project Afterwards (Returning Users)

Once installed, you can start everything quickly:

- **Start Backend**

  ```bash
  cd server
  node server.js
  ```

- **Start Browser (Docker)**

  ```bash
  docker start ink-browser
  ```

- **Optional: Restart Container if Changes is not reflected**

  ```bash
  sudo docker rm -f ink-browser
  docker build -f Dockerfile -t ink-browser:latest .
  docker run -d --name ink-browser -p 3000:3000 ink-browser:latest
  ```

- **Start Apache Jena Fuseki (Docker)[if required]**

  ```bash
  docker start apache-jena-fuseki
  ```

- **Stop Services**
  ```bash
  docker stop ink-browser
  docker stop apache-jena-fuseki
  ```

---

### License

- **Code and Project Source** in this repository (The Original InK Browser source) is licensed under the [GNU General Public License 3.0](./LICENSE).
- **Ontology** (schema files, diagrams, usecases, competency questions, sample and survey data) is licensed under the  
  [Creative Commons Attribution-ShareAlike 4.0 International License](./LICENSE.ontology).  
  This includes:
  - RDF/OWL files (`.ttl`, `.owl`)
  - Schema diagrams & Analysis data (`.graphml`, `.png`, `.pdf`)
  - Initial data loaded into the browser

  By contributing, you agree to license your contributions under these same terms.
