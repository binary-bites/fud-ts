#!env sh

# if bun installed, use that
if [[ $(command -v bun) ]]; then
    cd backend
    bunx tsx watch server.ts &

    cd ..
    bun run dev -- --open
else
    cd backend
    npx tsx watch server.ts &

    cd ..
    npx run dev -- --open
fi
