#!/bin/sh
echo "Installing NPM dependecies defined in package.json..."
npm install

echo "Tidying up..."
rm -rf .git
rm README.md
rm init.bat

echo "Initializing new git project..."
git init
git add . -A
git commit -m "Initial Commit"

echo "Done. Now get coding!"
echo "https://github.com/argo49/NESS-Boilerplate"
rm -- "$0"