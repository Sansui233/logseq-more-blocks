#!/bin/bash
shopt -s extglob  
cd release || exit
rm -rf !(package.json|logo.png)
cd ..
cp -r dist/* release/ && cp logo.png release/