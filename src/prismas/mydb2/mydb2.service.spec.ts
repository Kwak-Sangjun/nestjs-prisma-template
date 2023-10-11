import { Test, TestingModule } from '@nestjs/testing';
import { Mydb2Service } from './mydb2.service';

describe('Mydb2Service', () => {
  let service: Mydb2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mydb2Service],
    }).compile();

    service = module.get<Mydb2Service>(Mydb2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
