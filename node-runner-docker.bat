@echo off
docker run -i --rm -v D:/weby/operam:/app -p 8000:8000 -p 5858:5858 operam/node node --debug=5858 %*
