import express from 'express'
import path from 'path'
import { sql } from './db';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());


// Роут для страницы входа
app.post('/window/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Запрос к базе данных для проверки авторизации
    const result = await sql`SELECT * FROM Users WHERE Username = ${username}`;

    // Проверка существования пользователя в базе данных
    if (result.recordset.length > 0) {
      // Здесь можно добавить логику проверки пароля.
      // Обратите внимание, что в реальном проекте рекомендуется использовать хэширование паролей и безопасные методы аутентификации.
      // Для простоты примера, здесь проверяется только существование пользователя.

      // Перенаправление на index.html после успешной аутентификации
      res.redirect('/index.html');
    } else {
      res.send('Неверный логин или пароль');
    }
  } catch (err) {
    console.error('Error authenticating user', err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }
});

// Роут для страницы log.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'log.html'));
});

const start = async () => {
  sql`create table if not exists Test(
    id serial primary key
  )`
  app.listen(port, () => {
    console.log(`Сервер запущен  http://localhost:${port}/window/login.html`);
  });
}

start()