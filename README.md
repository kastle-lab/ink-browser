# ink-browser

## Docker
- Navigate to the main repo folder
    - Make sure you are in the same directory as the `Dockerfile`
- Building a docker image from the Dockerfile if image is out of date
    - `sudo docker build -t ink-browser:latest .`
- Running the container from a new build
    - `sudo docker run -d --name ink-browser -p 3000:3000 ink-browser:latest`
- If a container already exists with the name of `ink-browser`
    - `sudo docker rm -f ink-browser`
    - Try the run command again
- View the running project
    - Navigate to: `localhost:3000`
- Starting the container from an already built image
    - `sudo docker start ink-browser`
- Stop the container
    - `Sudo docker stop ink-browser`

## Docker tar file

- Saving the image to a tar file
    - `sudo docker save ink-browser:latest | gzip > ink-browser.tar.gz`
- Loading the image from a tar file
    - `sudo docker load < ink-browser.tar.gz`

## Apache Jena Fuseki

- Download
    - `wget https://dlcdn.apache.org/jena/binaries/apache-jena-fuseki-4.6.1.tar.gz`
- Extract
    - `tar -xvzf apache-jena-fuseki-4.6.1.tar.gz`
- Run
    - `cd apache-jena-fuseki-4.6.1`
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