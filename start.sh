#!/bin/sh

if [ "$APP_ENV" = "development" ]; then
    echo "Starting API in development mode"
    npm run dev
elif [ "$APP_ENV" = "production" ]; then
    echo "Starting API in production mode"
    npm start
fi
