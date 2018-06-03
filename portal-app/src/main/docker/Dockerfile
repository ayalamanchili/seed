FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD portal-app.jar portal-app.jar
RUN sh -c 'touch /authoring-app.jar'
EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /portal-app.jar" ]