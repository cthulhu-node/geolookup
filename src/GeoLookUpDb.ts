import * as maxmind from "maxmind";
import type { CityResponse } from "./IGeoLookUpResult";

/**
 * GeoLookupDb provides geodata for provided IP addresses, as far as it is possible.
 * Currently we use maxmind-database.
 *
 * Singleton-Pattern, as we initialize this module per service only once and the depending
 * maxmind-database is about 60 mb big and should only be loaded once.
 */
export class GeoLookupDb<T = CityResponse> {
	private static instance: GeoLookupDb;
	private maxmindReader: maxmind.Reader<T> | null = null;

	private constructor() {
	}

	private async initialize(path: string): Promise<void> {
		GeoLookupDb.instance.maxmindReader = await maxmind.open(path);
	}

	/**
	 * Instance-initialization
	 */
	static async getInstance<T = CityResponse>(path: string): Promise<GeoLookupDb<T>> {
		if (!GeoLookupDb.instance) {
			GeoLookupDb.instance = new GeoLookupDb();
			await GeoLookupDb.instance.initialize(path);
		}
		return GeoLookupDb.instance as GeoLookupDb<T>;
	}

	/**
	 * lookUp in to the maxmind-db
	 * @param ipAddress
	 */
	lookUp(ipAddress: string): CityResponse {
		if (this.maxmindReader === null) {
			return {};
		}
		return this.maxmindReader.get(ipAddress || '') || {};
	}
}

export default GeoLookupDb;