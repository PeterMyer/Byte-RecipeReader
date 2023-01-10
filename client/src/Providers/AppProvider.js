import { Auth0ProviderWithHistory } from "../Features/Auth/"
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const historyInstance = createBrowserHistory();   

export const AppProvider = ({ children }) => {
	return(
		<Router history = { historyInstance }>
			<Auth0ProviderWithHistory>
				{ children }
			</Auth0ProviderWithHistory>
		</Router>
	)
}

