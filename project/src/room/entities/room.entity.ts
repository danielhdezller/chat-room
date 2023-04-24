import { APP_DB_SPECS } from '@/config-provider/interfaces/app.interfaces';
import { DtoProperty } from '@/shared/dtos/dto-property';
import { AppBaseEntity } from '@/shared/entities/app-base.entity';
import { MaxLength } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Room extends AppBaseEntity {
  @Column({
    length: APP_DB_SPECS.MEDIUM_TEXT,
  })
  @DtoProperty({ example: 'Pop', maxLength: APP_DB_SPECS.MEDIUM_TEXT })
  @MaxLength(APP_DB_SPECS.MEDIUM_TEXT)
  name: string;

  @OneToMany(() => Message, (message) => message.room)
  public roomToMessages: Message[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
