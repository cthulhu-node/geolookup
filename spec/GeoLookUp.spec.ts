/* Node Modules */
import * as maxmind from "maxmind";
import * as sinon from "sinon";
import { expect } from "chai";

/* Custom Module */
import { GeoLookupDb } from "../src/";

describe("GeoLookupDB", async () => {
	it('singleton-test', async () => {
		const maxminOpen = sinon.spy(maxmind, "open");
		expect(maxminOpen.callCount).to.be.equal(0);

		const geodb = await GeoLookupDb.getInstance(__dirname + '/db/GeoIP2-City-Test.mmdb');
		expect(maxminOpen.callCount).to.be.equal(1);

		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');
		geodb.lookUp('4.4.4.4');

		expect(maxminOpen.callCount).to.be.equal(1);

		maxminOpen.restore();
	});

	it('test if simple geolookup gives atleast geo coordinates', async () => {
		const geodb = await GeoLookupDb.getInstance(__dirname + '/db/GeoIP2-City-Test.mmdb');
		const result = geodb.lookUp('175.16.199.1');

		expect(typeof result.location.latitude).to.be.equal("number");
		expect(typeof result.location.longitude).to.be.equal("number");
	});
});