import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsIn(['gratuito', 'premium'], { message: 'Type must be either gratuito or premium' })
  type: string = 'gratuito';
}
