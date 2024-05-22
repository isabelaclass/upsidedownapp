import mongoose from "mongoose";

export const connect = (databaseUrl: string) =>{
    mongoose.connect(databaseUrl)
    const database = mongoose.connection
    
    database.on('error', (error) => {
      console.log(error)
    })
    
    database.once('connected', () => {
      console.log('Database Connected');
    })    
}