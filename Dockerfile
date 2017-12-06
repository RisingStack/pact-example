FROM ubuntu

RUN apt-get update && apt-get install -y \
  bundler \
  git \
  libsqlite3-dev \
  ruby \
  ruby-dev \
  zlib1g-dev
RUN mkdir code
WORKDIR code
RUN git clone https://github.com/bethesque/pact_broker.git
WORKDIR pact_broker/example
RUN bundle

CMD bundle exec rackup -o 0.0.0.0 -p 80
