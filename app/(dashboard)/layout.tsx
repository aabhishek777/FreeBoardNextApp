import {Sidebar} from "./_components/Sidebar";

interface dashboardLayoutProps {
	children:React.ReactNode
}


const Layout=({
	children
}: dashboardLayoutProps
) => {
	return (
		<main className="h-full">
			<Sidebar/>
			{children}
		</main>
	)
}

export default Layout;