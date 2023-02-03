// React and stuff
import type {AppProps} from 'next/app';
import {ToastContainer} from 'react-toastify';

// Wagmi and Ethers
import {WagmiConfig, createClient, configureChains} from 'wagmi';

// Mui
import {createTheme, ThemeProvider} from '@mui/material';

// Styles
import '../styles/globals.css';
import '../styles/theme.css';

// Vendor Styles
import 'react-toastify/dist/ReactToastify.min.css';
import 'animate.css/animate.min.css';

// Wagmi helpers
import {getSupportedChains, getSupportedConnectors, getSupportedProviders} from '@/typescript/utils/wagmiHelpers';

// Components
import Layout from '@/components/layout';
import Seo from '@/components/utility/Seo';

// Contexts
import {SearchContextProvider} from '@/contexts/SearchContextProvider';
import {MenuContextProvider} from '@/contexts/MenuContextProvider';
import {PageContextProvider} from '@/contexts/PageContextProvider';

// TS
import {getConfigValue} from '@/typescript/types/DappdConfigT';

// Configure the chains for Wagmi
const {chains, provider, webSocketProvider} = configureChains([...getSupportedChains()], [...getSupportedProviders()]);

// Set up Wagmi client
const client = createClient({
  autoConnect: getConfigValue('wagmi.autoConnect', true),
  connectors: [...getSupportedConnectors(chains)],
  provider,
  webSocketProvider,
});

// Configure MUI theme, match Tailwind's breakpoints and colors
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2xl': true;
    '3xl': true;
    '4xl': true;
    '5xl': true;
    '6xl': true;
  }
}

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xxs: 340,
      xs: 400,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      '3xl': 1792,
      '4xl': 2048,
      '5xl': 2304,
      '6xl': 2560,
    },
  },
  palette: {
    primary: {
      main: '#171E3B',
    },
    secondary: {
      main: '#117FF5',
    },
    info: {
      main: '#000829',
    },
  },
  typography: {
    fontFamily: ['"Open Sans"', '"Segoe UI"', 'Tahoma', '"sans-serif"'].join(','),
  },
});

// Set the app
function App({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ThemeProvider theme={muiTheme}>
        <SearchContextProvider>
          <MenuContextProvider>
            <PageContextProvider>
              <Layout>
                <Seo />
                <Component {...pageProps} />
                <ToastContainer />
              </Layout>
            </PageContextProvider>
          </MenuContextProvider>
        </SearchContextProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default App;
