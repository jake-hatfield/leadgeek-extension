// types
import type { Category, Feature, Subfeature } from '$types/ScannerHelpers';

export const searchNestedArray = (categories: Category[], query: string) => {
	// ensure that items show without an input
	if (!query) return categories;

	// instantiate an empty array to store the matching items
	let result: Category[] = [];

	// validate string matches
	const isMatch = (str: string, query: string) => {
		if (str.toLowerCase().includes(query.toLowerCase())) return true;
		return false;
	};

	// iterate over each category
	categories.forEach((category) => {
		// if the category title matches, add the category title + all features + subfeatures of the category
		if (isMatch(category.title, query)) result.push(category);
		else {
			// instantiate empty arrays to store the matching items
			let features: Feature[] = [];
			// iterate over each feature
			category.children.forEach((feature) => {
				if (isMatch(feature.title, query)) {
					// if the feature title matches, add the category title + the feature title + all subfeatures
					features.push(feature);
				} else {
					let subfeatures: Subfeature[] = [];
					// iterate over each subfeature
					feature.children.forEach((subfeature) => {
						// if the subfeature title matches, add it to the subfeatures array
						if (isMatch(subfeature.title, query)) {
							subfeatures.push(subfeature);
						}
					});

					if (subfeatures.length > 0)
						return features.push({ ...feature, children: subfeatures });
				}
			});

			// if the category has matching features, add them to the result
			if (features.length > 0)
				return result.push({ ...category, children: features });
		}
	});

	return result;
};
