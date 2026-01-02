# Étape 1 : utiliser l'image officielle Node.js
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code backend dans le conteneur
COPY . .

# Exposer le port sur lequel ton backend écoute
EXPOSE 8080

# Définir la variable d'environnement pour le port si souhaité
ENV BACK_PORT=8080

# Commande pour démarrer ton backend
CMD ["node", "index.js"]
