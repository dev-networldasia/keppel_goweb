# RUN HTML Website

--|-public
------|-css
-----------|-default.css
-----------|-style.css
-----------|-reponsive.css
------|-js
-----------|-apps.js
------|-img
--|-views
------|-layouts
-----------|-layout.html
------|-partials
-----------|-header.html
-----------|-footer.html
------|-home
-----------|-components
-----------------|-section1.html
-----------|-index.html


*** 1- Copy .env,sample to .env ***
```bash
cp .env.sample .env
```
--> Thay đổi website port nếu cần trong .env

*** 2- run windown ***
```bash
./webhtml.exe
```

*** 3- run mac ***
```bash
./webhtml
```