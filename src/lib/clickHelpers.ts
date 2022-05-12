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

export const keyboardShortcut = (node: HTMLElement, params) => {
	let handler;
	const removeHandler = () => window.removeEventListener('keydown', handler),
		setHandler = () => {
			removeHandler();
			if (!params) return;
			handler = (e) => {
				if (
					!!params.alt != e.altKey ||
					!!params.shift != e.shiftKey ||
					!!params.control != (e.ctrlKey || e.metaKey) ||
					params.code != e.code
				)
					return;
				e.preventDefault();
				params.callback ? params.callback() : node.click();
			};
			window.addEventListener('keydown', handler);
		};
	setHandler();
	return {
		update: setHandler,
		destroy: removeHandler,
	};
};
