# Instalación

npm init --yes

Dependencias de Desarrollo
npm instal apollo-server apollo-server-express axios dotenv express firebase graphql cors uuid

Dependencias de Producción
npm install @babel/cli @babel/core @babel/node @babel/preset-env nodemon

Configuración del archivo .babelrc

{
    "presets": [
        [ "@babel/env" ]
    ]
}

Configuración para producción package.json
    "start": "node src/server.js"
Configuración para desarrollo package.json
    "dev": "nodemon src/server.js --exec babel-node --watch src"

    Repositorio Github
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/EBERSHR/Server.git

Deploy
sudo snap install --classic heroku
git init
heroku git:remote -a Server
git add .
git commit -am "firs commit"
git push heroku master

You can now change your main deploy branch from "master" to "main" for both manual and automatic deploys, please follow the instructions here https://help.heroku.com/O0EXQZTA/how-do-i-switch-branches-from-master-to-main

git checkout -b main
git branch -D master
git push heroku main


# Definición de Tipos 

1. - Importamos gql desde apollo-server

2.- Instanciamos una constante igual a gql`

    *.- Estos queries representan a las funciones que llamamos y lo que nos retorna
    
    type Query {
        users: [User]
    }

    *.- Las mutaciones representan los envíos de datos para ser almacenados en la db

    type Mutation {
        addUser {
            user: String
            email: String!
        }
    }
` 
    *.- Cada Query o llamado o requerimiento es un tipo y se debe agregar, llegan a representar los modelos para la db

    type User {
        user: String
        email: String!
    }


# Resolvers

Los resolver representan las rutas de llamadas en el servidor y donde escribimos nuestras funciones que nos retornarán los datos.

1.- Inicializamos una constante llamada resolvers con convención y dentro del objeto colocamos nuestras funciones de send y set 

const resolvers = {

    Query: {

        users: async () => {
                const results = await axios.get('url')
                // mapeamos, filtramos 
                // retornamos un valor
        },

        otro: función();

        etc: función();

    },

    Mutation: {

        addUser: async (root, args) => {
            await set datos en la base de datos
        } 
    }    
}

# Query desde el Frontend
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
{
  users {
    user
    email
  }
}
`;


  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return 'loading...';
  if (error) return <pre>{error.message}</pre>

  console.log(data);

  


# Mutations desdel Frontend

import { useMutation } from '@apollo/client';
import { PRUEBA_MUTACION } from '../redux/actions';

import { gql } from '@apollo/client';

    const [dashboard, setDashboard] = useState({
        user: "",
        email: ""
    });

    const [handleOnClick, { data, loading, error }] = useMutation(PRUEBA_MUTACION, {
        variables: {
            user: dashboard.user,
            email: dashboard.email
        }
    });

<Button onPress={handleOnClick}>Send</Button>

Este código en otro archivo o en el mismo, en este caso lo tenemos en el actions

export const PRUEBA_MUTACION = gql`

mutation AddUser($user: String, $email: String) {
    addUser(user: $user, email: $email) 
    {
        user
        email
    }
}`


# Inicializar ApolloClient

// ---------------- conectar Apolo Client y Graphql con la App --------------
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// ---------------- Inicializar Apollo Client ---------------
export const client = new ApolloClient(
  {
    uri: "http://localhost:4000/graphql/",
    cache: new InMemoryCache()
  }
);

    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
      AppRegistry.registerComponent('la app', () => App);