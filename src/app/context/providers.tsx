

import { ThemeProvider } from "./theme-provider"

interface ProvidersProps {
	children: React.ReactNode
}

export  function Providers({ children }: ProvidersProps) {
	return <ThemeProvider enableSystem defaultTheme="system">{children}</ThemeProvider>
}