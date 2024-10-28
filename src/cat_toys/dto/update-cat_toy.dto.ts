import { PartialType } from '@nestjs/mapped-types';
import { CreateCatToyDto } from './create-cat_toy.dto';

export class UpdateCatToyDto extends PartialType(CreateCatToyDto) {}
