import { Test, TestingModule } from '@nestjs/testing'
import { AuthsController } from '../../../../src/infrastructure/controllers/auths.controller'
import { AuthsService } from '../../../../src/infrastructure/services/auths.service'

describe('AuthsController', () => {
  let controller: AuthsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthsController],
      providers: [AuthsService],
    }).compile()

    controller = module.get<AuthsController>(AuthsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
