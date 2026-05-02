import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
     legacy: false,//使用 Composition API 模式，提供更灵活的国际化功能，组件中可以通过 useI18n() 来访问国际化功能。
  locale: 'zh',//默认语言是中文
  fallbackLocale: 'en',//如果当前语言的文案缺失，则使用英文作为备用语言显示文案，保证用户至少能看到英文文案，而不是空白。
  messages: { zh, en }//语言包，key是语言标识，value是对应的语言包对象，组件中通过 $t('key') 来获取对应语言的文案。
})

export default i18n//文案集合管理，提供国际化功能，组件中可以通过 $t('key') 来获取对应语言的文案。