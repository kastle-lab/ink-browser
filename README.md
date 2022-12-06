# ink-browser

## Docker

- Building a docker image from the Dockerfile
    - Command: `sudo docker build -t ink-browser:latest .`
- Saving the image to a tar file
    - Command: `sudo docker save ink-browser:latest | gzip > ink-browser.tar.gz`
- Loading the image from a tar file
    - Command `sudo docker load < ink-browser.tar.gz`
- Running the container
    - Command: `sudo docker run -d --name ink-browser -p 3000:3000 ink-browser:latest`
- View the running project
    - Navigate to: `localhost:3000`
