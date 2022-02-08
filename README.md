![App Logo][1]

### A personal food storage management webapp!

Dependencies
---
- MongoDB 4.0+ (installed locally)
- Node 14.3+ & npm 17.x+
- Raspberry Pi 3 or above (if running on a Pi, see [below](#raspberry-pi))

The rest of app dependencies including React are handled by npm.

Installation
---
1. Install app dependencies
```
npm install
```

2. Bundle our source files
```
npm run dev:bundler (or prod:bundler for production)
```

3. Test
```
npm run test
```

4. Run server
```
npm run dev:server & (or prod:server)
```
You can now access app on port 4242

[1]: logo.png

Raspberry Pi
---
You can run this app on a Raspberry Pi (as I do) but due to limitations with MongoDB 4 you must be running 64-bit Arm
CPU in your Pi. This excludes Raspberry Pi 2 or below. In addition to a 64-bit CPU requirement you must also use 
a 64-bit OS such as Ubuntu.

Steps on how to do this are found in: https://www.mongodb.com/developer/how-to/mongodb-on-raspberry-pi/

Hosting / Cloud
---
At this stage Cannedfindit is not suitable to run on publicly available servers.
Please only run this application in your local network.
