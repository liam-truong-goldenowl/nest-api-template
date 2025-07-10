import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the response',
    example: 1,
    type: Number,
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    description: 'Timestamp when the response was created',
    example: '2023-10-01T00:00:00Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the response was last updated',
    example: '2023-10-01T00:00:00Z',
    type: Date,
  })
  updatedAt: Date;
}
