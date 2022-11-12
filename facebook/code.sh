#!/bin/bash

APP_ID='${app_id}'
APP_SECRET='${your_app_secret}'
URI='${your_uri}'
echo "content-type: application/json"
echo ""

CODE=$QUERY_STRING

#
# get token from OAuth provider
#
# NOTE:  in a real system, we would keep the tokens on the server, but in this
# example, we simply return all the tokens to the client

TOKEN=$(curl "https://graph.facebook.com/v15.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${URI}&client_secret=${APP_SECRET}&code=${CODE}")

# We can now use the token in our application
# Here we simply echo it
# Your job is to modify the following so we can retrieve the user info using the token.
echo "$TOKEN"