import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { env } from 'env.config';

export class PageFiltersDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 1, required: false })
  currPage?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 10, required: false })
  perPage?: number;
}

interface Options {
  items: any[];
  totalItems?: number;
  perPage?: number;
  currPage?: number;
}

export function getLimitAndOffset(options: Partial<PageFiltersDto>) {
  const currPage = options?.currPage || 1;
  const perPage = Math.min(
    options?.perPage || env.DEFAULT_PAGE_SIZE,
    env.DEFAULT_PAGE_SIZE,
  );
  const limit = perPage;
  const offset = perPage * (currPage - 1);
  return { limit, offset };
}

export function paginate(options: Options) {
  const currPage = options?.currPage || 1;
  const perPage = options?.perPage || env.DEFAULT_PAGE_SIZE;
  const totalItems = options.totalItems || options.items.length;
  return {
    items: options.items,
    currPage,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
  };
}
