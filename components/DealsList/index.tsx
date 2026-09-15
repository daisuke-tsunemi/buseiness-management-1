import Link from 'next/link';
import DataTable, { type Column } from '@/components/List/DataTable';
import Thumbnail from '@/components/List/Thumbnail';
import { EMPTY_LABEL, formatDate, formatPrice, formatSelect } from '@/libs/format';
import type { Deal } from '@/libs/types';
import styles from '@/components/List/list.module.scss';

type Props = {
  deals: Deal[];
};

// first view に入る先頭2件だけ eager 読み込みにして LCP を改善する
const ABOVE_THE_FOLD_COUNT = 2;

const columns: Column<Deal>[] = [
  {
    header: '案件名／作成日',
    cell: (deal, index) => (
      <Link href={`/deals/${deal.id}`} className="u-align u-gap4 ">
        <Thumbnail image={deal.eyecatch} priority={index < ABOVE_THE_FOLD_COUNT} />
        <p className="u-align vertical start">
          {formatDate(deal.publishedAt) && (
            <time className='c-txt__sm'>{formatDate(deal.publishedAt)}</time>
          )}
          <span className="c-heading--md">{deal.title}</span>
        </p>
      </Link>
    ),
  },
  {
    header: '顧客名',
    cell: (deal) =>
      deal.customer ? (
        <Link href={`/customers/${deal.customer.id}`} className="c-heading--sm">{deal.customer.name}</Link>
      ) : (
        <span>{EMPTY_LABEL}</span>
      ),
  },
  {
    header: 'ステータス',
    cell: (deal) => {
      const status = formatSelect(deal.status);
      return status ? <strong>{status}</strong> : <span>{EMPTY_LABEL}</span>;
    },
  },
  {
    header: '自社担当者',
    cell: (deal) =>
      deal.employee && deal.employee.length > 0 ? (
        <div className="u-align wrap u-gap4">
          {deal.employee.map((employee) => (
            <Link
              key={employee.id}
              href={`/employees/${employee.id}`}
              className={`${styles.tag} c-txt__min weight__500`}
            >
              {employee.name}
            </Link>
          ))}
        </div>
      ) : (
        <span>{EMPTY_LABEL}</span>
      ),
  },
  {
    header: '見込み／売上金額',
    align: 'right',
    cell: (deal) => {
      const estimated = formatPrice(deal.estimated);
      const sales = formatPrice(deal.sales);
      return (
        <>
          <span>{estimated ? <strong>{estimated}</strong> : EMPTY_LABEL}<small> 円</small></span>
          <br />
          <span>{sales ? <strong>{sales}</strong> : EMPTY_LABEL}<small> 円</small></span>
        </>
      );
    },
  },
];

export default function DealsList({ deals }: Props) {
  return (
    <DataTable
      columns={columns}
      rows={deals}
      getKey={(deal) => deal.id}
      emptyMessage="該当する商談・案件がありません。"
    />
  );
}
