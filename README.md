# React + Vite

## Локализация

Интерфейс поддерживает русский (`ru`, по умолчанию), английский (`en`) и казахский (`kk`) языки. Переключатель в шапке меняет язык без перезагрузки; выбор сохраняется в `localStorage` под ключом `app-language`. Если хранилище недоступно, переключение продолжает работать в текущей вкладке.

Настройка i18next находится в `src/i18n/index.js`, переводы — в `src/i18n/locales/{ru,en,kz}.json`. Файл `kz.json` подключён под стандартным кодом языка `kk`; ранее сохранённое значение `kz` также поддерживается. Для новых текстов добавляйте одинаковые ключи во все три словаря и используйте `useTranslation()` из `react-i18next`. В статических конфигурациях храните ключи и вызывайте `t(key)` при отображении. Локальные ошибки также хранятся как ключи, чтобы уже показанное сообщение меняло язык вместе с интерфейсом. Тексты и данные с сервера отображаются в исходном виде.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
