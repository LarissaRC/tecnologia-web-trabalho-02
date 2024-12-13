import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { FindActiveSubscriptionDto } from 'src/song/dto/find-active-subscription.dto';
import { FindAllByUserDto } from 'src/song/dto/find-all-by-user.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async create(userId: number, type: string): Promise<FindActiveSubscriptionDto> {
    try {
      // Verify if there's an active subscription and end it
      const activeSubscription = await this.subscriptionRepository.findOne({
        where: { user: { id: userId }, end_date: null },
      });

      if (activeSubscription) {
        activeSubscription.end_date = new Date();
        await this.subscriptionRepository.save(activeSubscription);
      }

      // Create a new subscription
      const newSubscription = this.subscriptionRepository.create({
        user: { id: userId },
        type,
        begin_date: new Date(),
      });

      const savedSubscription = await this.subscriptionRepository.save(newSubscription);

      return {
        id: savedSubscription.id,
        type: savedSubscription.type,
        begin_date: savedSubscription.begin_date,
        end_date: savedSubscription.end_date,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create subscription');
    }
  }

  async endSubscription(userId: number): Promise<FindActiveSubscriptionDto> {
    try {
      const activeSubscription = await this.subscriptionRepository.findOne({
        where: { user: { id: userId }, end_date: null },
      });

      if (!activeSubscription) {
        throw new NotFoundException('No active subscription found for this user');
      }

      activeSubscription.end_date = new Date();
      const updatedSubscription = await this.subscriptionRepository.save(activeSubscription);

      return {
        id: updatedSubscription.id,
        type: updatedSubscription.type,
        begin_date: updatedSubscription.begin_date,
        end_date: updatedSubscription.end_date,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to end subscription');
    }
  }

  async findAllByUser(userId: number): Promise<FindAllByUserDto[]> {
    try {
      const subscriptions = await this.subscriptionRepository.find({
        where: { user: { id: userId } },
        order: { begin_date: 'DESC' },
      });

      if (!subscriptions.length) {
        throw new NotFoundException('No subscriptions found for this user');
      }

      return subscriptions.map((sub) => ({
        id: sub.id,
        type: sub.type,
        begin_date: sub.begin_date,
        end_date: sub.end_date,
      }));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve subscriptions');
    }
  }

  async findActiveSubscription(userId: number): Promise<FindActiveSubscriptionDto> {
    try {
      const activeSubscription = await this.subscriptionRepository.findOne({
        where: { user: { id: userId }, end_date: null },
      });

      if (!activeSubscription) {
        throw new NotFoundException('No active subscription found for this user');
      }

      return {
        id: activeSubscription.id,
        type: activeSubscription.type,
        begin_date: activeSubscription.begin_date,
        end_date: activeSubscription.end_date,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve active subscription');
    }
  }
}
