import React, {
	createContext,
	useState,
	useMemo,
	useContext
} from 'react';

import useMatchMedia from 'hooks/useMatchMedia';

type ToggleValueSetter = boolean | ((isOpen: boolean) => boolean);

interface SidebarI {
	isOpenForMobile: boolean,
	isMobile: boolean,
	toggle(setValue?: ToggleValueSetter) : void
}

const SidebarContext = createContext<SidebarI>({
	isOpenForMobile: false,
	isMobile: true,
	toggle(){}
});

export function SidebarProvider({ children }: React.HTMLProps<HTMLDivElement>) {
	const [isOpenForMobile, setIsOpenForMobile] = useState(false);
	const isMobile = useMatchMedia('(max-width: 500px)');

	const toggle = useMemo(
		() => ({
			isOpenForMobile,
			isMobile,
			toggle(setvalue = (isOpen: boolean) => !isOpen) {
				setIsOpenForMobile(setvalue);
			}
		}),
		[isOpenForMobile, isMobile]
	);

	return (
		<SidebarContext.Provider value={toggle}>{children}</SidebarContext.Provider>
	);
}

export function useSidebar() {
	return useContext(SidebarContext);
}

export default SidebarContext;
