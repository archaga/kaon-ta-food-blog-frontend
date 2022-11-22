// components
import Page from '../components/Page';
import { DashboardCard } from '../sections/@dashboard/dashboardapp';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Home">
      <DashboardCard />
    </Page>
  );
}
