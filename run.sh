#!env sh

# if bun installed, use that
if [[ $(command -v bun) ]]; then
    cd ..
    bun run dev -- --open
else
    cd ..
    npx run dev -- --open
fi
