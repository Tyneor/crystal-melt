export const createDebounce = <T>(callback: (observed: T) => unknown, debounceTime = 750) => {
	let timer: NodeJS.Timeout;

	return (observed: T) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(observed), debounceTime);
	};
};
