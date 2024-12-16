import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FindAllByUserDto } from 'src/song/dto/find-all-by-user.dto';
import { FindActiveSubscriptionDto } from 'src/song/dto/find-active-subscription.dto';

@ApiTags('Subscriptions')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post(':userId')
  @ApiOperation({ summary: 'Cria uma assinatura para um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiResponse({ status: 201, description: 'Assinatura criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  createSubscription(
    @Param('userId') userId: string,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.create(+userId, createSubscriptionDto.type);
  }

  @Patch(':userId/end')
  @ApiOperation({ summary: 'Encerra a assinatura de um usuário.' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiResponse({ status: 200, description: 'Assinatura encerrada com sucesso.' })
  endSubscription(@Param('userId') userId: string) {
    return this.subscriptionService.endSubscription(+userId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Retorna as assinaturas de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiResponse({ status: 200, type: FindAllByUserDto, isArray: true })
  findAllByUser(@Param('userId') userId: string) {
    return this.subscriptionService.findAllByUser(+userId);
  }

  @Get(':userId/active')
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: String })
  @ApiOperation({ summary: 'Retorna a assinatura ativa em andamento de um usuário.' })
  @ApiResponse({ status: 200, type: FindActiveSubscriptionDto })
  findActiveSubscription(@Param('userId') userId: string) {
    return this.subscriptionService.findActiveSubscription(+userId);
  }
}
