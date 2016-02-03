#!/bin/sh
VER=`node -e 'console.log(require("./package.json").version)'`

git tag | grep $VER && echo "Tag $VER already exists; aborting" && exit 1;

if [ `git symbolic-ref HEAD` != 'refs/heads/master' ] ; then
  echo "Not on master branch; aborting"
  exit 1
fi

if [ "X`git status --porcelain`" != 'X' ] ; then
  echo "Working copy is dirty; aborting"
  exit 1
fi

git checkout -b release && \
npm run all && \
mkdir release && \
cp build/*.js release && \
git add release/* && \
git commit -m "release($VER)" && \
git tag $VER && \
echo "tag $VER created. Run the following commands:" && echo && echo && \
echo "git push origin $ver && npm publish" && \
echo "git checkout master; git branch -D release";
