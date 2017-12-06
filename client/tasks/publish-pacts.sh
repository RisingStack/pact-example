#!/usr/bin/env bash
for f in pacts/*.json; do
  consumer=$(jq '.consumer.name' $f | sed s'/"//g')
  provider=$(jq '.provider.name' $f | sed s'/"//g')
  consumer_version=$(jq '.version' package.json | sed s'/"//g')
  curl -X PUT \-H "Content-Type: application/json" \
    -d @$f \
    http://localhost:8080/pacts/provider/$provider/consumer/$consumer/version/$consumer_version
done
