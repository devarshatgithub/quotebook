FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD curl -f http://localhost:8080/actuator/health || exit 1
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]