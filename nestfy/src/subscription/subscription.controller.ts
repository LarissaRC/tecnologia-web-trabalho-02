import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiResponse } from '@nestjs/swagger';
import { FindAllByUserDto } from 'src/song/dto/find-all-by-user.dto';
import { FindActiveSubscriptionDto } from 'src/song/dto/find-active-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':userId')
  @ApiResponse({ status: 201, description: 'Subscription created successfully' })
  createSubscription(
    @Param('userId') userId: string,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.create(+userId, createSubscriptionDto.type);
  }

  @Patch(':userId/end')
  @ApiResponse({ status: 200, description: 'Subscription ended successfully' })
  endSubscription(@Param('userId') userId: string) {
    return this.subscriptionService.endSubscription(+userId);
  }

  @Get(':userId')
  @ApiResponse({ status: 200, type: FindAllByUserDto, isArray: true })
  findAllByUser(@Param('userId') userId: string) {
    return this.subscriptionService.findAllByUser(+userId);
  }

  @Get(':userId/active')
  @ApiResponse({ status: 200, type: FindActiveSubscriptionDto })
  findActiveSubscription(@Param('userId') userId: string) {
    return this.subscriptionService.findActiveSubscription(+userId);
  }
}
