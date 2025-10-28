import { ConfigProvider } from "antd";
import RouteF from "./RouteF";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context";
import { AppLayout } from "./Layout";

function App() {
	return (
		<BrowserRouter>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#0ABAB5",
						colorError: "#BC302F",
					},
					components: {
						Timeline: {
							dotBg: "transparent",
						},
					},
				}}
			>
				<AuthProvider>
					<AppLayout>
						<RouteF />
					</AppLayout>
				</AuthProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
