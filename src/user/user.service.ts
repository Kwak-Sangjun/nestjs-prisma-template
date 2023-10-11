import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MydbService } from 'src/prismas/mydb/mydb.service';

@Injectable()
export class UserService {
    constructor(private readonly mydbService: MydbService) {}

    async findOne(id: string) {
        return await this.mydbService.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    async findAll() {
        return await this.mydbService.user.findMany();
    }

    //create user
    async create(data: CreateUserDto) {
        return await this.mydbService.user.create({
            data,
        });
    }

    async update(id: string, data: UpdateUserDto) {
        return this.mydbService.user.update({
            where: { id: id },
            data: data,
        });
    }

    async remove(id: string) {
        return this.mydbService.user.delete({
            where: { id: id },
        });
    }
}
