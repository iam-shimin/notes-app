import React, { createContext, useState, useMemo } from 'react';

import useMatchMedia from 'hooks/useMatchMedia';

const SidebarContext = createContext({isOpenForMobile: false});

export function SidebarProvider({children}) {

	const [isOpenForMobile, setIsOpenForMobile] = useState(false);
	const isMobile = useMatchMedia('(max-width: 500px)');

	const toggle = useMemo(() => ({
		isOpenForMobile,
		isMobile,
		toggle() {
			setIsOpenForMobile(isOpen => !isOpen);
		}
	}), [isOpenForMobile, isMobile]);

	return <SidebarContext.Provider value={toggle}>{children}</SidebarContext.Provider>
}

export default SidebarContext;