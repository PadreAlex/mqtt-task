# MQTT Dockerized Application
MQTT dockerized nest application. It uses nestJs as main framework, postgres as sql, typeorm as orm and customized version of nest-mqtt, along with swagger for better testing experience.

### How to run

In order to run this application you  need to do following steps:
- Decide if you want to use dockerized version or not

# Dockerized

Create mosquitto config

For unix:
```
mkdir ./mosquitto
touch ./mosquitto/mosquitto.conf 
touch ./mosquitto/passwd 
```
For windows:
```
mkdir ./mosquitto
ECHO text>./mosquitto/mosquitto.conf 
ECHO text>./mosquitto/passwd
```

Add this info:
```
allow_anonymous true
password_file /etc/mosquitto/passwd
persistence true
persistence_location /mosquitto/data/
listener 1883
```
Add to passwd file info:
```
username:password
```

Then use:
```
docker exec mosquitto mosquitto_passwd -U /etc/mosquitto/passwd
docker exec mosquitto mosquitto_passwd -b /etc/mosquitto/passwd user password // if you want to add a new user
```
Don`t forget to restart container once new user is added!!!

Then run:
```
docker build -t mqttms .
```
And finaly:
```
docker compose up -d
```

# Non docker version

Create mosquitto config

For unix:
```
mkdir ./mosquitto
touch ./mosquitto/mosquitto.conf 
touch ./mosquitto/passwd 
```
For windows:
```
mkdir ./mosquitto
ECHO text>./mosquitto/mosquitto.conf 
ECHO text>./mosquitto/passwd
```

Add this info:
```
allow_anonymous true
password_file /etc/mosquitto/passwd
persistence true
persistence_location /mosquitto/data/
listener 1883
```
Add to passwd file info:
```
username:password
```

Then use:
```
docker exec mosquitto mosquitto_passwd -U /etc/mosquitto/passwd
docker exec mosquitto mosquitto_passwd -b /etc/mosquitto/passwd user password // if you want to add a new user
```
Don`t forget to restart container once new user is added!!!

Then change ```default.yml``` to something like
```
database:
  type: 'postgres'
  host: 'localhost'
  port: 15432
  username: 'postgres'
  password: 'test'
  database: 'mqtt-task'

microservices:
  mqttSender:
    url: 'http://localhost:3001'
    port: '3001'

  mqttListener:
    url: 'http://localhost:3002'
    port: '3002'

mqttConfig:
  protocol: 'mqtt'
  host: 'localhost'
  port: 1883
  username: 'user'
  password: 'password'
  clean: true
  connectTimeout: 4000
  reconnectPeriod: 1000

topics:
  mainTopic: 'mainTopic'
```

Remove from ```docker-compose.yml``` following data - ```mqttsender``` and  ```mqttlistener```

Instal node_modules
```
yarn add //or npm|pnpm
```

Launch MS
```
yarn start:dev mqttListener
yarn start:dev mqttSender
```

# Last words
When you launched project. You cann reach out to http://localhost:3001/swagger# and http://localhost:3002/swagger# to use the application 
