import Sidebar from '@/components/Sidebar';
import '@/styles/css/globals.css';
import styles from './layout.module.scss';
import { Suspense } from 'react';
import { Metadata } from 'next';
import SvgDefs from '@/components/SvgDefs';
import { montserrat, zenKaku } from '@/libs/fonts';

export const revalidate = 86400;
// キャッシュの再生成は1日間に1回（デフォは60秒に1回になっているので注意）

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  robots: 'noindex, nofollow',
  title: {
    template: '%s | 商談・案件管理ダッシュボード',
    default: '商談・案件管理ダッシュボード',
  },
  description:'商談・案件管理ダッシュボードです',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: {
      template: '%s | 商談・案件管理ダッシュボード',
      default: '商談・案件管理ダッシュボード',
    },
    description:'商談・案件管理ダッシュボードです',
    type: 'website',
    url: '/',
    locale: 'ja_JP',
    siteName: '商談・案件管理ダッシュボード',
  },
  twitter: {
    card: 'summary_large_image',
    title: '商談・案件管理ダッシュボード',
    description:'商談・案件管理ダッシュボードです',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="ja" className={`${montserrat.variable} ${zenKaku.variable}`} data-scroll-behavior="smooth">
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <body>
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <SvgDefs />
          <div className={styles.wrapper}>
            <Sidebar />
            <main className={styles.main}>
              <div className={styles.wrapperContent}>
                {children}
              </div>
            </main>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
