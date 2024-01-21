import '@styles/globals.css'
import type { AppProps } from 'next/app'


const Noop = ({children}:any) => <>{children}</>
export default function App({ Component, pageProps }:any) {
  const Layout = Component.Layout ?? Noop

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
