#!/bin/sh

if [ "$APP_ENV" = "production" ]
	then
    	echo "Starting API in production mode"
    	npm start
else
    echo "Starting API in development mode"
    npm run dev
fi
