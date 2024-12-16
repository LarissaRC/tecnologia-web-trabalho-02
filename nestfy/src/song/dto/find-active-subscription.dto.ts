import { ApiProperty } from '@nestjs/swagger';

export class FindActiveSubscriptionDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ description: 'Subscription type (e.g., gratuito, premium)' })
  type: string;

  @ApiProperty({ description: 'Date when the subscription began' })
  begin_date: Date;

  @ApiProperty({ description: 'Date when the subscription ended, if applicable', nullable: true })
  end_date: Date;
}
