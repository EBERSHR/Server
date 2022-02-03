import axios from "axios";
import { getDatabase, ref, set } from "firebase/database";
import userProfile from '../firebase/functions/userProfile';
require('dotenv').config();


import {v1 as uuid} from 'uuid';
import app from "../firebase/firebase";

                       
const baseEnglishURL = process.env.DATA_BASE_URL;

const db = getDatabase();

const resolvers = {
    Query: {

        test: async () => {
            const testing = await axios.get(`${baseEnglishURL}/test.json`);
            return testing.data;
        },
        // Leer en la db
        users: async () => {
            const results = await axios.get(`${baseEnglishURL}/users.json`)
                const values = Object.values(results.data);
                const mappedValues = values.map(item => {
                  const graphqlUser = userProfile(item);
                  return graphqlUser;
                })
                return mappedValues;
          },
      
          findPersonId: async (root, args) => {
            const { id } = args
            const results = await axios.get(`${baseEnglishURL}/users.json`);
            const objectIds = Object.values(results.data);
            const y = objectIds.find(x => x.id === id)
            console.log(y);
            return y;
          }
    },

    // Escribir en la db
    Mutation: {
            addUser: async (root, args) => {
            const id = uuid();
            const user = { ...args, id: id }
            await set(ref(db, 'users/' + args.email.replace(".", "")), user );
          }
            
    }
}

export default resolvers;
