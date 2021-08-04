#!/usr/bin/env bash
set -e

if [ -z "$1" ]
then
  echo "Please specify a version"
  exit 49
fi

version=$1

npm version --no-commit-hooks $version
cat src/store/defaultState.js | perl -pe 's/version: "[0-9.]+"/version: "'${version}'"/' | tee src/store/defaultState.js 1> /dev/null

