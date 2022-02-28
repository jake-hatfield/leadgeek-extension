export default interface KeepaProduct {
	//   0: STANDARD
	//   1: DOWNLOADABLE
	//   2: EBOOK
	//   3: INACCESSIBLE - Keepa is unable to crawl the product
	//   4: INVALID - no current data available, might be temporary
	//   5: VARIATION_PARENT - product is a parent ASIN
	productType: 0 | 1 | 2 | 3 | 4 | 5;
	asin: string;
	//   1: .com
	//   2: .co.uk
	//   3: .de
	//   4: .fr
	//   5: .co.jp
	//   6: .ca
	//   7: Missing from Keepa docs https://keepa.com/#!discuss/t/product-object/116
	//   8: .it
	//   9: .es
	//   10: .in
	//   11: .com.mx
	domain: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11;
	title: string;
	trackingSince: number;
	listedSince: number | 0 | -1;
	lastUpdate: number;
	lastRatingChange: number;
	lastPriceChange: number;
	lastEbayUpdate: number | -1;
	imagesCSV: string | null;
	//   9223372036854775807 denotes a blank category with the name "?"
	rootCategory: number | 0 | 9223372036854775807;
	categories: number[];
	categoryTree: { catId: number; name: string }[];
	parentAsin: string | null;
	variationCSV: string | null;
	frequentlyBoughtTogether: [string, string | undefined] | null;
	eanList: string[] | null;
	//   YOU ARE HERE
	upcList: string[] | null;
	manufacturer: string | null;
	brand: string | null;
	productGroup: string | null;
	partNumber: string | null;
	author: string | null;
	binding: string | null;
	numberOfItems: number | -1;
	numberOfPages: number | -1;
	publicationDate: number | -1;
	releaseDate: number | -1;
	languages: string[][] | null;
	model: string | null;
	color: string | null;
	size: string | null;
	edition: string | null;
	format: string | null;
	features: string[] | null;
	description: string | null;
	packageHeight: number | 0 | -1;
	packageLength: number | 0 | -1;
	packageWidth: number | 0 | -1;
	packageWeight: number | 0 | -1;
	itemHeight: number | 0 | -1;
	itemLength: number | 0 | -1;
	itemWidth: number | 0 | -1;
	itemWeight: number | 0 | -1;
	//   -1: no Amazon offer exists
	//   0: Amazon offer is in stock and shippable
	//   1: Amazon offer is currently not in stock, is "pre-order"
	//   2: Amazon offer availability is "unknown"
	//   3: Amazon offer is currently not in stock, is "back-order"
	//   4: 'Amazon offer shipping is delayed
	availabilityAmazon: 0 | -1 | 1 | 2 | 3 | 4;
	availabilityAmazonDelay: number[] | null;
	ebayListingIds: number[] | 0 | null;
	isAdultProduct: boolean;
	launchpad: boolean;
	audienceRating: string;
	newPriceIsMap: boolean;
	isEligibleForTradeIn: boolean;
	isEligibleForSuperSaverShipping: boolean;
	//   integers of the Amazon locale's smallest currency unit (e.g. euro, cents, or yen)
	fbaFees: { pickAndPackFee: number } | null;
	variations: {
		asin: string;
		attributes: { dimension: string; value: string }[];
	};
	coupon: [number, number] | null;
	promotions: { type: number; amount: number; discountPercent: number }[];
	//   the stats object is only returned if the "stats" parameter was used in the request
	stats: {
		current: number[];
		avg: number[];
		avg30: number[];
		avg90: number[];
		avg180: number[];
		atIntervalStart: number[];
		min: StatsTuple;
		max: StatsTuple;
		minInInterval: StatsTuple;
		maxInInterval: StatsTuple;
		outOfStockPercentageInInterval: any;
		outOfStockPercentage30: number[];
		outOfStockPercentage90: number[];
		lastOffersUpdate: number;
		salesRankDrops30: number;
		salesRankDrops90: number;
		salesRankDrops180: number;
		totalOfferCount: number;
		lightningDealInfo: number[];
		// the following fields are only set if the offers parameter was used
		retrievedOfferCount: number | null;
		buyBoxSellerId: string | -2 | null;
		buyBoxPrice: number | null;
		buyBoxShipping: number | null;
		buyBoxIsUnqualified: boolean;
		buyBoxIsShippable: boolean;
		buyBoxIsPreorder: boolean;
		buyBoxIsBackorder: boolean;
		buyBoxIsFBA: boolean;
		buyBoxIsAmazon: boolean;
		buyBoxIsUsed: boolean;
		buyBoxIsMAP: boolean;
		buyBoxMinOrderQuantity: boolean;
		buyBoxMaxOrderQuantity: boolean;
		buyBoxAvailabilityMessage: string | null;
		buyBoxShippingCountry: string | null;
		buyBoxIsPrimeExclusive: boolean | null;
		buyBoxIsPrimeEligible: boolean | null;
		buyBoxIsPrimePantry: boolean | null;
		isAddonItem: boolean;
		sellerIdsLowestFBA: string[];
		sellerIdsLowestFBM: string[];
		offerCountFBA: number | -2;
		offerCountFBM: number | -2;
	} | null;
	//   -1: not available
	//   -2: listed in launchpad
	salesRankReference: number | -1 | -2;
	salesRanks: {
		[key: string]: string | number[];
	};
	//   the following three fields are only returned if the "offers" & "rental" parameters were used in the request
	rentalDetails: string | null;
	rentalSellerId: string | null;
	rentalPrices: {
		initialPrice: number | null;
		shortExtnPrice: number | null;
		longExtnPrice: number | null;
		fullPrice: number | null;
	};
	//   the following two fields are only returned if the "offers" parameter was used in the request
	offers: {
		offerId: number;
		lastSeen: number;
		sellerId: string;
		isPrime: boolean;
		isFBA: boolean;
		isMAP: boolean;
		isShippable: boolean;
		isAddonItem: boolean;
		isPreorder: boolean;
		isWarehouseDeal: boolean;
		isScam: boolean;
		shipsFromChina: boolean;
		isAmazon: boolean;
		isPrimeExcl: boolean;
		//   0 - Unknown: Keepa was unable to determine the condition.
		//   1 - New
		//   2 - Used - Like New
		//   3 - Used - Very Good
		//   4 - Used - Good
		//   5 - Used - Acceptable
		//   6 - Refurbished
		//   7 - Collectible - Like New
		//   8 - Collectible - Very Good
		//   9 - Collectible - Good
		//   10 - Collectible - Acceptable
		//   11 - Rental
		condition: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
		conditionComment: string;
		offerCSV: number[];
	};
	liveOffersOrder: number[];
	buyBoxSellerIdHistory: string[];
	isRedirectASIN: boolean;
	isSNS: boolean;
	offersSuccessful: boolean;
	csv: any;
}

type StatsTuple = [number, [number, number] | null];

// TODO<Jake>: Type rentalPrices
// TODO<Jake>: Type offers
