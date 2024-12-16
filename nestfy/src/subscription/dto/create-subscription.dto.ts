import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @IsString()
  @ApiProperty({
    description: 'Modalidade da assinatura (gratuito/premium)',
    example: 'gratuito',
  })
  @IsIn(['gratuito', 'premium'], { message: 'Type must be either gratuito or premium' })
  type: string = 'gratuito';
}
