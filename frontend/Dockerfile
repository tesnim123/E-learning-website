# Étape 1 : Builder
FROM node:20 AS build

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install





# Copier tout le projet
COPY . .

# Définir la variable d'environnement React
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

# Builder l'application React
RUN npm run build

# Étape 2 : Serveur de production léger
FROM nginx:alpine

# Copier le build dans nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copier la config Nginx custom si besoin (facultatif)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
