import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import SEO from '@bradgarropy/next-seo'
import GoogleAnalytics from '@bradgarropy/next-google-analytics'
import ConnectionNotification from 'react-connection-notification'
import axiosConfig from '@/api-client/axios-config'
import { BlankLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import { Analytics } from '@vercel/analytics/react'
import '@uiw/react-markdown-preview/markdown.css'
import 'easymde/dist/easymde.min.css'
import 'react-medium-image-zoom/dist/styles.css'
import '@/styles/globals.css'
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? BlankLayout
  const sidebarRight: boolean = Component.sidebarRight ?? false
  const sidebarLeft: boolean = Component.SidebarLeft ?? false
  const requestAuth: boolean = Component.requestAuth ?? false

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosConfig.get(url),
        shouldRetryOnError: false,
      }}>
      <SEO
        title='Blackdit'
        keywords={[]}
      />
      <GoogleAnalytics measurementId='G-F2V2QR1BPJ' />
      <ThemeProvider attribute="class">
        <Analytics />
        <Layout
          sidebarRight={sidebarRight}
          sidebarLeft={sidebarLeft}
          requestAuth={requestAuth}>
          <ConnectionNotification
            onlineText='Bạn đã kết nỗi lại.'
            offlineText='Bạn đã mất kết nôi.'
            duration={3500}
          />
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  )
}

export default MyApp
