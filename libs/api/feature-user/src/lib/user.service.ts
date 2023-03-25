import { PrismaService } from '@ecommerce-nx-nest-next-graphql-progsql/api/data-access-db';
import {
  CreateOneUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  DeleteOneUserArgs,
} from '@ecommerce-nx-nest-next-graphql-progsql/api/generated-db-types';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOneUserArgs: CreateOneUserArgs) {
    const { data } = createOneUserArgs;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(findUniqueUserArgs: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(findUniqueUserArgs);
  }

  update(updateOneUserArgs: UpdateOneUserArgs) {
    return this.prisma.user.update(updateOneUserArgs);
  }

  remove(deleteOneUserArgs: DeleteOneUserArgs) {
    return this.prisma.user.delete(deleteOneUserArgs);
  }
}
