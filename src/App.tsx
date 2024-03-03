import { RouterProvider } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import zhTW from 'antd/locale/zh_TW'
import { shallow } from 'zustand/shallow'
import { Fragment } from 'react'
import { App as AntdApp, theme } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import { useSysConfigStore } from './stores/config'
import router from './router'
import AntdGlobal from './utils/AntdGlobal'

function App() {
  console.log('App tsx')

  const { i18n } = useTranslation()

  const [locale, setLocale] = useState(zhCN)
  const [loading, setLoading] = useState(true)

  const { colorScheme } = useSysConfigStore(useShallow(state => ({
    colorScheme: state.colorScheme,
  })))

  const isDark = colorScheme === 'dark'

  useEffect(() => {
    const cancelSub = useSysConfigStore.subscribe(
      state => state.defaultLanguage,
      (language) => {
        console.log('App tsx language', language)
        setLocale(language === 'zhCn' ? zhCN : language === 'zhTw' ? zhTW : enUS)
        i18n.changeLanguage(language)
        setLoading(false)
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      },
    )

    return () => cancelSub()
  }, [i18n])

  if (loading)
    return <div>loading...</div>

  return (
    <ConfigProvider locale={locale} theme={{ cssVar: true, hashed: false, algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <AntdApp component={false}>
        <AntdGlobal />
        {/* fallbackElement 防止闪屏 */}
        <RouterProvider router={router} fallbackElement={<Fragment />} />
      </AntdApp>
    </ConfigProvider>

  )
}

export default App
