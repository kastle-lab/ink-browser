# ink-browser

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
