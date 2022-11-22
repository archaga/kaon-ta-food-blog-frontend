import { SnackbarProvider } from 'notistack';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeProvider from './theme';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
