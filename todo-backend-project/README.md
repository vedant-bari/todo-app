

# Prerequisites

- [Docker](https://docs.docker.com/docker-for-mac/install/)  
- [docker-compose]

# Local Development

Start the dev server for local development:
```bash
docker-compose up -d 
```

Run a command inside the docker container:

```bash
docker-compose run --rm web [command]
```


If docker not present:
create a virtualenv using python3:
install requirements from requirements.txt:
comment the docker database url and uncomment the sqlitelite database url:


