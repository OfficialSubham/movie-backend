import { PrismaClient } from "@prisma/client"
import * as data from "./movie.json" 

const prisma = new PrismaClient()
const moviesArray = (data as any).default || data

async function uploadData() {
    const res = await prisma.movie.createMany({
        data: moviesArray
    })
    console.log(res)
    console.log("done")
}

uploadData()

//delete data if needed
async function deleteData() {
    const res = await prisma.movie.deleteMany()
    console.log(res)
}
