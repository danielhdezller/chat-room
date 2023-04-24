import { APP_DB_SPECS } from '@/config-provider/interfaces/app.interfaces';
import { DtoProperty } from '@/shared/dtos/dto-property';
import { AppBaseEntity } from '@/shared/entities/app-base.entity';
import { IsInt, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Message extends AppBaseEntity {
  @Column({
    length: APP_DB_SPECS.LONG_TEXT,
  })
  @DtoProperty({
    example: 'Welcome to pop room.',
    maxLength: APP_DB_SPECS.LONG_TEXT,
  })
  @MaxLength(APP_DB_SPECS.LONG_TEXT)
  message: string;

  @Column()
  @IsInt()
  public roomId: number;

  @Column()
  @IsInt()
  public userId: number;

  @ManyToOne(() => Room, (room) => room.roomToMessages)
  public room: Room;

  @ManyToOne(() => User, (user) => user.userToMessages)
  public user: User;
}
