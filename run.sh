#!env sh

cd backend
nodemon server.js &

cd ..
npm run dev -- --open
