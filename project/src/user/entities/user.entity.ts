import { APP_DB_SPECS } from '@/config-provider/interfaces/app.interfaces';
import { DtoProperty } from '@/shared/dtos/dto-property';
import { AppBaseEntity } from '@/shared/entities/app-base.entity';
import { MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AppBaseEntity {
  @Column({
    length: APP_DB_SPECS.MEDIUM_TEXT,
  })
  @DtoProperty({ example: 'Daniel', maxLength: APP_DB_SPECS.MEDIUM_TEXT })
  @MaxLength(APP_DB_SPECS.MEDIUM_TEXT)
  name: string;
}
