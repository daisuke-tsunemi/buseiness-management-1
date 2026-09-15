import Link from 'next/link';
import DataTable, { type Column } from '@/components/List/DataTable';
import { EMPTY_LABEL, formatDateTime } from '@/libs/format';
import type { Activity } from '@/libs/types';

type Props = {
  activities: Activity[];
};

const columns: Column<Activity>[] = [
  {
    header: '活動日時',
    cell: (activity) => (
      <p className='c-txt__sm'>
        {formatDateTime(activity.activatedAt) ?? EMPTY_LABEL}
      </p>
    ),
  },
  {
    header: '案件名',
    cell: (activity) =>
      activity.deals ? (
        <Link href={`/deals/${activity.deals.id}`} className="c-heading--sm">{activity.deals.title}</Link>
      ) : (
        <span>{EMPTY_LABEL}</span>
      ),
  },
  {
    header: '活動内容',
    cell: (activity) => <p>{activity['activity-content'] ?? EMPTY_LABEL}</p>,
  },
  {
    header: '次回予定',
    cell: (activity) => <p>{activity['activity-next'] ?? EMPTY_LABEL}</p>,
  },
];

export default function ActivitiesList({ activities }: Props) {
  return (
    <DataTable
      columns={columns}
      rows={activities}
      getKey={(activity) => activity.id}
      emptyMessage="該当する活動履歴がありません。"
    />
  );
}
