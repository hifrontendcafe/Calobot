# matebotJS

- Bienvenida a los usuarios (newMembers.py)
- Reminder(scheduler)
- FAQ's (faq.py)

# Para crear un nuevo comando hay que ejecutar lo siguiente
- `node ./src/lib/command/generate.js --class Example --cmd example`
- A `--class {arg}` le vamos a pasar el nombre de la clase que va a tener
- A `--cmd {arg}` le vamos a pasar el nombre del comando con el que vamos a ejecutar la accion
- En ambos casos reemplazamos `{arg}` por el valor que vayamos a usar, importante, que se escriba sin corchetes

# Levantar entorno
- Crear archivo con las variables de entorno con `cp .env.template .env`
- Instalamos las dependencias con `npm install`
- En caso de subir a un entorno productivo ejecutamos `npm run build` con la variable de entorno `APP_ENV=production`
- Para trabajar con nuestro proyecto ejecutamos `docker-compose up -d` con la variable de entorno `APP_ENV=development`
- Las variables de entorno las encontramos en el archivo `.env`, que creamos anteriormente
