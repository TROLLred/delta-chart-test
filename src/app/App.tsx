import mockTableData from '../shared/assets/data/mockTableData.json';
import { Hero, RevenueTable } from '../shared/ui';

function App() {
	return (
		<>
			<Hero />
			<RevenueTable table={mockTableData} />
		</>
	);
}

export default App;
