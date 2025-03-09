FROM ruby:3.3


RUN apt-get update -qq && apt-get install -y \
    nodejs \
    yarn \
    mariadb-client \
    libmariadb-dev \
    iputils-ping 


RUN useradd -m -s /bin/bash app
WORKDIR /app


COPY Gemfile Gemfile.lock ./


RUN bundle install


RUN mkdir -p tmp && chmod -R 777 tmp


RUN chown -R app:app /app
USER app


COPY --chown=app:app . .

EXPOSE 3000

CMD ["sh", "-c", "rails server -b 0.0.0.0"]
