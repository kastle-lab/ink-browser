# ink-browser

## Docker

- Building a docker image from the Dockerfile
    - `sudo docker build -t ink-browser:latest .`
- Saving the image to a tar file
    - `sudo docker save ink-browser:latest | gzip > ink-browser.tar.gz`
- Loading the image from a tar file
    - `sudo docker load < ink-browser.tar.gz`
- Running the container
    - `sudo docker run -d --name ink-browser -p 3000:3000 ink-browser:latest`
- View the running project
    - Navigate to: `localhost:3000`

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