europrapor client
==========

Tech overview
-------------

Backbone

tbc..


Installing and building
-------------

On Debian-based Linuxes:

1. install nodejs and npm (http://howtonode.org/how-to-install-nodejs)
```
git clone git://github.com/ry/node.git
cd node
./configure
make
sudo make install
```

2. verify installation by doing: 
```
node --version
```

3. Install grunt and bower globally:
```
npm install -g grunt
npm install -g bower
```

4. checkout the project, navigate to _client_ dir and run:
```
npm install
bower install
```

5. build project using:
```
grunt
```

(this was written from memory and not tested, please get in touch if these instructions didn't work out for you)