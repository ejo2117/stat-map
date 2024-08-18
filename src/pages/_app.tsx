import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from "@/components/common";
import "@/styles/global.scss";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</QueryClientProvider>
	);
}
