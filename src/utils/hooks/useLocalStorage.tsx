import { useState } from 'react';

const useLocalStorage = <T,>(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const value = window.localStorage.getItem(key);
			if (value) {
				return JSON.parse(value);
			}
			window.localStorage.setItem(key, JSON.stringify(defaultValue));
			return defaultValue;
		} catch (error) {
			return defaultValue;
		}
	});
	const setValue = (newValue: T) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(newValue));
			setStoredValue(newValue);
		} catch (error) {
			console.error(error);
		}
	};
	return [storedValue, setValue] as const;
};

export default useLocalStorage;
