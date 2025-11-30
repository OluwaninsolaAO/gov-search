import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import {
  getLimitAndOffset,
  PageFiltersDto,
} from 'src/common/utils/paginated.utils';
import { SearchDto } from './dtos/filters.dto';

@Controller('search')
@ApiTags('people search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async getSearch(
    @Query() pageFilter: PageFiltersDto,
    @Query() { q }: SearchDto,
  ) {
    const { limit, offset } = getLimitAndOffset(pageFilter);
    const result = await this.searchService.searchPeople({
      query: q,
      limit,
      offset,
    });
    return {
      status: true,
      message: 'Lookup completed',
      data: result,
    };
  }

  @Get('ai')
  async getSearchAI(@Query() { q }: SearchDto) {
    const data = await this.searchService.searchAI(q);
    return {
      status: true,
      message: 'AI search completed',
      data,
    };
  }
}
