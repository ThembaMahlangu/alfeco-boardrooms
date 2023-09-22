import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}>
      <AnimatePresence mode='wait'>
      <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
    </SessionProvider>
  )
}
