import mongoose from 'mongoose'

export async function connectDB() {
    console.log('URL:', process.env.MONGODB_URL)

   await mongoose.connect(process.env.MONGODB_URL!)

   console.log('Banco conectado:', mongoose.connection.name)
}