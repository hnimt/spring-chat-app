FROM openjdk:16

ARG JAR_FILE=target/*.jar

WORKDIR /chat-server

COPY ${JAR_FILE} chatserver.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","chatserver.jar"]