import { Line, LineChart, XAxis, YAxis } from 'recharts';

interface RevenueTableChartProps {
	data: {
		revenue: number;
	}[];
}

const emptyTickFormatter = () => '';

export const RevenueTableChart: React.FC<RevenueTableChartProps> = ({
	data,
}) => (
	<LineChart
		style={{
			width: '100%',
			height: '100%',
			aspectRatio: 2,
			pointerEvents: 'none',
		}}
		responsive
		data={data}
		margin={{
			top: 5,
			right: 5,
			left: 0,
			bottom: 5,
		}}
	>
		<XAxis tickFormatter={emptyTickFormatter} />
		<YAxis
			tickFormatter={emptyTickFormatter}
			width='auto'
			domain={['auto', 'auto']}
		/>
		<Line
			dataKey='revenue'
			stroke='#037d50'
			fill='#037d50'
			activeDot={false}
			isAnimationActive={false}
		/>
	</LineChart>
);
