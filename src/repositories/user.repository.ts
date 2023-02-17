import { PrismaClient } from "@prisma/client";

export class userRepository extends PrismaClient{
    async create(
        firstName:string,
        lastName:string,
        email:string,
        hash:string
    ){
            const user = await this.user.create({
                data:{
                    firstName,
                    lastName,
                    email,
                    hash
                }
            });
            return user;
        
    }

    async findByEmail(email: string){
        const user = await this.user.findFirst({
            where: {
                email,
            }
        });
        return user;
    }
}