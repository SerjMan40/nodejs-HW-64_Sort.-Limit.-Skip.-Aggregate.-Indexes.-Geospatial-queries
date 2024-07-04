# ДЗ 64. Використання курсорів та агрегаційних запитів у MongoDB через сервер Express.

Це проект на базі Express.js, який демонструє інтеграцію мідлварів, маршрути користувачів та статей, а також базову аутентифікацію і валідацію.

## Запуск сервера

Сервер буде прослуховувати порт 3000.

Для запуску сервера виконайте:

yarn start

## Маршрути

### Головна

- `GET /` - Головна сторінка

### Користувачі

- `GET /users` - Отримати список користувачів (потрібна аутентифікація)
- `POST /users` - Створити нового користувача (потрібна аутентифікація та валідація)
- `GET /users/:userId` - Отримати користувача за ID (потрібна аутентифікація)
- `PUT /users/:userId` - Оновити користувача за ID (потрібна аутентифікація)
- `DELETE /users/:userId` - Видалити користувача за ID (потрібна аутентифікація)

### Статті

- `GET /articles` - Отримати список статей (потрібна аутентифікація)
- `POST /articles` - Створити нову статтю (потрібна аутентифікація)
- `GET /articles/:articleId` - Отримати статтю за ID (потрібна аутентифікація)
- `PUT /articles/:articleId` - Оновити статтю за ID (потрібна аутентифікація)
- `DELETE /articles/:articleId` - Видалити статтю за ID (потрібна аутентифікація)

## Опис мідлварів

### Логування запитів

Мідлвар `logRequests` записує інформацію про кожен запит до сервера, що допомагає в дебагінгу та моніторингу активності на сервері.

### Управління сесіями

Мідлвар `sessionMiddleware` забезпечує управління сесіями для додатка, використовуючи express-session.

### Аутентифікація

Мідлвар `authenticate` перевіряє наявність авторизаційного заголовка в запитах і забезпечує доступ тільки авторизованим користувачам. У випадку відсутності ключа, ча значення, користувач не отримує інформацію.

### Обробка помилок

Мідлвар `errorHandler` обробляє всі помилки, що виникають під час обробки запитів, і відправляє відповідні повідомлення клієнту.

## Використання шаблонізаторів:

### -pug, для Users.

### -ejs, для Articles.

## Додані : favicon, cookies та JWT.

## Використання Passport для авторизації, та доступу до захищеного маршруту.

## Підключення MongoDB Atlas.

## Реалізація розширеного функціоналу реалізована в Articles яку можна перевірити за допомогою Postman.


## Виконано рефакторинг функцій readArticlesFromDB і getAllArticlesHandler, додано курсори для перебору документів, реалізовано можливість виведення необхідної кількості статей на потрібні сторінки.

### Дефолтний GET запит виводить усі (30) статей. ***http://localhost:3000/articles***

### Вибірковий GET запит виводить вказану кількість статей. ***http://localhost:3000/articles?page=2&pageSize=10***
(у цьому випадку - з 11 по 20 статтю на 2-й сторінці).


## Додана getArticleStatistics, функція, яка виконує агрегаційний запит, за адресою: ***http://localhost:3000/articles/statistics***, також додано шаблон statistics.ejs  для відображення запиту в браузері.

