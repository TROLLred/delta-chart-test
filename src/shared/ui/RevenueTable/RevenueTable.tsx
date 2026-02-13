import { useEffect, useRef } from 'react';
import styles from './RevenueTable.module.css';
import { RevenueTableToggler } from './RevenueTableToggler';

interface RevenueTableProps {
	table: {
		head: string[];
		body: {
			label: string;
			revenues: number[];
		}[];
	};
}

export const RevenueTable: React.FC<RevenueTableProps> = ({ table }) => {
	const tableRef = useRef<HTMLTableElement | null>(null);

	useEffect(() => {
		let maxWidth = 0;
		tableRef.current
			?.querySelectorAll('td>span')
			.forEach(span => (maxWidth = Math.max(maxWidth, span.clientWidth)));
		tableRef.current?.style.setProperty(
			'--table-percent-max-width',
			`${maxWidth}px`,
		);

		return () => {
			tableRef.current?.removeAttribute('style');
			tableRef.current = null;
		};
	}, []);

	return (
		<table
			ref={tableRef}
			cellSpacing={4}
			className={styles['revenue-table']}
			align='center'
		>
			<thead>
				<tr>
					{table.head.map((item, i) => (
						<th key={i} className={styles['revenue-table__cell']}>
							{item}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{table.body.map((item, i) => (
					<RevenueTableToggler key={i} {...item} />
				))}
			</tbody>
		</table>
	);
};
