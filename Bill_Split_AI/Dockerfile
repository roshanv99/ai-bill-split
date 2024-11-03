# Use an official Java runtime as a parent image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the application JAR file
COPY target/Bill_Split_AI-1.0-SNAPSHOT.jar /app/bill-split-ai.jar

# Copy Property file
COPY .properties /app/.properties


# Copy the service account JSON file into the container
COPY gcp_serviceAccount.json /app/service-account.json

# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/service-account.json"

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/bill-split-ai.jar"]