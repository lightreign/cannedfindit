![App Logo][1]

### A personal food storage management webapp!

[![Build Status](https://app.travis-ci.com/lightreign/cannedfindit.svg?branch=master)](https://app.travis-ci.com/lightreign/cannedfindit)

<p align="center">
    <a href="https://github.com/lightreign/cannedfindit/actions">
        <img alt="Build" src="https://img.shields.io/github/actions/workflow/status/lightreign/cannedfindit/tests.yml?branch=master" />
    </a>
</p>

![Main Page][2]

Dependencies
---
- MongoDB 4.0+ (installed locally)
- Node 18+
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
npm test
```

4. Run server
```
npm run dev:server & (or prod:server)
```
You can now access app with your browser on port 4242

[1]: logo.png
[2]: main.png

Raspberry Pi
---
You can run this app on a Raspberry Pi (as I do) but due to limitations with MongoDB 4 you must be running 64-bit Arm
CPU in your Pi. This excludes Raspberry Pi 2 or below. In addition to a 64-bit CPU requirement you must also use 
a 64-bit OS such as Ubuntu.

NOTE: Raspberry Pi 3 does not support MongoDB 5 or above

Steps on how to do this are found in: https://www.mongodb.com/developer/how-to/mongodb-on-raspberry-pi/

Hosting / Cloud
---
At this stage Cannedfindit is not suitable to run on publicly available servers.
Please only run this application in your local network.

Explaining Data Model
---
This app stores your item inventory in a database

### Item
Each inventory item consists of a product, location and expiry.

* A product could be something like "Farmer's Spaghetti 380g".
* A location could be "In storage cupboard"
* Expiry is the date the item expires or when you feel like it should be used by.

An item has two states, consumed and not consumed. Once you consume an item via the Item's page the date the item is
consumed is noted on the item record, you do have the option to unconsume it on the Item page but bear in mind that once you 
navigate away from the page you will no longer be able to browse the item.

### Product
Inside each product contains a product type and brand name, and unit of mass, weight/volume.

Given the example item "Farmer's Spaghetti 380g" we can easily see that the type is "Spaghetti",
brand name is "Farmer's" and mass is weight of 380 grams.

Presetting these products makes life easier whenever you need to create items as you replenish your stock.

### Locations, Brands and Product Types
You can and must create these via their respective entry forms.

### Oops, my inventory is a mess, how do I start again?
Currently, there is no way to do this via the UI.
Simply drop the `items` collection in the database to start again.

Why the name?
---
My daughter came up with it, nuff said.
