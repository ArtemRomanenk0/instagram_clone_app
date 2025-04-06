FROM node:20-alpine 

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Собираем приложение Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
