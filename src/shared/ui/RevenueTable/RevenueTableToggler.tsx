import clsx from 'clsx';
import { useMemo, useState } from 'react';
import styles from './RevenueTable.module.css';
import { RevenueTableChart } from './RevenueTableChart';

interface RevenueTableTogglerProps {
	label: string;
	revenues: number[];
}

const formatMoney = (money: number) => money.toLocaleString('ru-RU');

const percentDifference = (a: number, b: number) => {
	if (a === 0) return 0;
	return Math.floor(((b - a) / a) * 100);
};

const getClassByCompare = (a: number, b: number) => {
	if (a === b) return '';
	return a > b
		? styles['revenue-table__cell--positive']
		: styles['revenue-table__cell--negative'];
};

export const RevenueTableToggler: React.FC<RevenueTableTogglerProps> = ({
	label,
	revenues,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleRow = () => {
		setIsOpen(prev => !prev);
	};
	const chartData = useMemo(() => {
		const data = [];
		for (let i = revenues.length - 1; i >= 0; i--) {
			data.push({
				revenue: revenues[i],
			});
		}
		return data;
	}, [revenues]);

	return (
		<>
			<tr onClick={toggleRow}>
				<th align='left' className={styles['revenue-table__cell']}>
					{label}
				</th>
				<td align='right' className={styles['revenue-table__cell']}>
					{formatMoney(revenues[0])}
				</td>
				<td
					align='right'
					className={clsx(
						styles['revenue-table__cell'],
						getClassByCompare(revenues[0], revenues[1]),
					)}
				>
					{formatMoney(revenues[1])}{' '}
					<span>
						{Math.floor(percentDifference(revenues[1], revenues[0]))}%
					</span>
				</td>
				<td
					align='right'
					className={clsx(
						styles['revenue-table__cell'],
						getClassByCompare(revenues[0], revenues[2]),
					)}
				>
					{formatMoney(revenues[2])}
				</td>
			</tr>
			{isOpen && (
				<tr>
					<td colSpan={4}>
						<RevenueTableChart data={chartData} />
					</td>
				</tr>
			)}
		</>
	);
};
