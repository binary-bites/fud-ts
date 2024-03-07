#!env sh

# if bun installed, use that
if [[ $(command -v bun) ]]; then
    cd ../server
    bunx nodemon server.js &
    cd ../fud-ts
    bun run dev -- --open
else
    cd ../server
    npx nodemon server.js &
    cd ../fud-ts
    npm run dev -- --open
fi
