export const handleClickOutside = (node: HTMLElement, { enabled, cb }) => {
	const handleClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	const update = (enabled) => {
		if (enabled) {
			window.addEventListener('click', handleClick);
		} else {
			window.removeEventListener('click', handleClick);
		}
	};

	update(enabled);

	return {
		update,
		destroy() {
			window.removeEventListener('click', handleClick);
		},
	};
};
