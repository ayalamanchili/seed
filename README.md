# seed
### pre requistes
* maven 3.x
* java 8.x

### How to build locally
download the code
run "mvn clean spring-boot:run" to run your local server on 8080
hit this url to verify the server is running  "http://localhost:8080/portal/services/actuator/health"

### how to build deployable jar file
run "mvn clean install" this will generate portal-jar file in the targer folder.

### how to build docker image
* run mvn docker:build to create image

