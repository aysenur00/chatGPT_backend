FROM eclipse-temurin:17-jre-jammy
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} chatgpt-app.jar
ENTRYPOINT ["java", "-jar", "/chatgpt-app.jar"]
EXPOSE 8080