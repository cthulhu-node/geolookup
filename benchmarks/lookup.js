"use strict";

var Benchmark = require('benchmark'),
    geolookup = require('../build/index'),
    suite = new Benchmark.Suite();


async function bench() {

    const geodb = await geolookup.GeoLookupDb.getInstance(__dirname + '/../spec/db/GeoIP2-City-Test.mmdb');

    suite.add('lookUp existing', function () {
        const result = geodb.lookUp('175.16.199.1');

    });
    suite.add('lookUp empty string', function () {
        const result = geodb.lookUp('');

    });

    suite.on('cycle', function (event) { console.log(String(event.target)); })

    suite.run({ async: true })
}

bench();