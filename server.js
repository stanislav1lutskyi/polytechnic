const fastify = require('fastify')({ logger: true });
const path = require('path');
const { Resend } = require('resend');
import { Resend } from 'resend';

// Ваш ключ Resend
const resend = new Resend('re_X94VYy6b_7PWTgRET4DBor3MquerAMb3e');

// Роздача HTML/CSS/JS файлів
fastify.register(require('@fastify/static'), {
    root: __dirname,
});

// Обробка даних з форми
fastify.register(require('@fastify/formbody'));

// Ендпоінт, на який script.js відправляє дані
fastify.post('/api/contact', async (request, reply) => {
    const { name, email, phone, message } = request.body;

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'stas.business77@gmail.com',
            subject: `Нове повідомлення від ${name}`,
            text: `Ім'я: ${name}\nEmail: ${email}\nТелефон: ${phone}\n\nПовідомлення:\n${message}`,
        });
        
        return { success: true };
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Помилка відправки листа' });
    }
});

// Запуск сервера
fastify.listen({ port: 3000 }, (err) => {
    if (err) throw err;
    console.log('Сервер успішно запущено! http://localhost:3000');
});