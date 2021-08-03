#!/usr/bin/env bash

if [ -z "$1" ]
then
  echo "Please specify a version"
  exit 49
fi

version=$1

npm version $version
sed -Ei "s/version: \"[0-9.]+\"/version: \"${version}\"/" src/store/defaultState.js
