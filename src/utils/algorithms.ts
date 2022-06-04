// types
import type { Category, Feature, Subfeature } from '$types/ScannerHelpers';

export const searchNestedArray = (categories: Category[], query: string) => {
	// ensure that items show without an input
	if (!query) return categories;

	// instantiate an empty array to store the matching items
	let result: Category[] = [];

	// validate string matches
	const isMatch = (str: string, query: string) => {
		if (str.toLowerCase().includes(query)) return true;
		else return false;
	};

	// iterate over each category
	for (const category of categories) {
		// instantiate empty arrays to store the matching items
		let features: Feature[] = [];
		let subfeatures: Subfeature[] = [];

		// if the category title matches, return the category title + all features + subfeatures of the category
		if (isMatch(category.title, query)) return (result = [...result, category]);
		else {
			// iterate over each feature
			for (const feature of category.children) {
				// if the feature title matches, return the category title, the feature title, and all subfeatures
				if (isMatch(feature.title, query)) {
					features = [...features, feature];
					return (result = [...result, { ...category, children: features }]);
				} else {
					// iterate over each subfeature
					for (const subfeature of feature.children) {
						// if the subfeature title matches, add it to the subfeatures array
						if (isMatch(subfeature.title, query)) {
							subfeatures = [...subfeatures, subfeature];
							features = [{ ...feature, children: subfeatures }];
						}
					}
				}
			}
			// if the category has matching features, add them to the result
			if (features.length > 0) {
				result = [
					...result,
					{
						...category,
						children: features,
					},
				];
			}
		}
	}

	return result;
};
