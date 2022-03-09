FROM java:8

WORKDIR /app

COPY ./amnesia /app/src
COPY ./amnesia/libgconf-2.so.4 /usr/bin

CMD ["java", "-jar", "./src/amnesiaBackEnd-1.0-SNAPSHOT.jar"]