export const handleClickOutside = (
	node: HTMLElement,
	{
		enabled: initialEnabled,
		cb,
	}: {
		enabled: boolean;
		cb: any;
	}
) => {
	const handleClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	const update = ({ enabled }) => {
		if (enabled) {
			window.addEventListener('click', handleClick);
		} else {
			window.removeEventListener('click', handleClick);
		}
	};

	update({ enabled: initialEnabled });

	return {
		update,
		destroy() {
			window.removeEventListener('click', handleClick);
		},
	};
};
