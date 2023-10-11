import { Test, TestingModule } from '@nestjs/testing';
import { MydbService } from './mydb.service';

describe('MydbService', () => {
    let service: MydbService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MydbService],
        }).compile();

        service = module.get<MydbService>(MydbService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
