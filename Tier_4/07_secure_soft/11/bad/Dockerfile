FROM ubuntu:22.04

# Installing curl without checking the checksum
RUN apt-get update && apt-get install -y curl

# No user - container running as root
# No healthcheck
# Open port without explanation
EXPOSE 80

# No COPY — not obvious where files come from
ADD . /app

WORKDIR /app
CMD ["bash", "start.sh"]
