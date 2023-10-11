import { Global, Module } from '@nestjs/common';
import { MydbService } from './mydb/mydb.service';
import { Mydb2Service } from './mydb2/mydb2.service';

@Global()
@Module({
    imports: [],
    providers: [MydbService, Mydb2Service],
    exports: [MydbService, Mydb2Service],
})
export class PrismasModule {}
