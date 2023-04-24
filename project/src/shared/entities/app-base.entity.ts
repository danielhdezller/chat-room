import { validateOrReject } from 'class-validator';
import { cloneDeep } from 'lodash';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DtoProperty } from '../dtos/dto-property';
import { removeUndefinedProperties } from '../helpers/remove-undefined-properties';
import { OmitFunctions } from '../types/type-utils';

/**
 * A base entity with the id field to be shared
 * with all the entities.
 * @export
 * @class AppEntity
 * @extends {BaseEntity}
 */
export abstract class AppBaseEntity extends BaseEntity {
  @DtoProperty({
    description: 'The entity identifier',
    example: 3,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @DtoProperty()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @DtoProperty()
  updatedAt: Date;

  /**
   * This method updates a subset of the entities fields.
   *
   * @param {(Partial<this> & FilterBaseEntityFields<BaseEntity>)} updateFields The update values.
   * @return {*}  {this} The current entity.
   * @memberof AppEntity
   */
  updateFields(updateFields: Partial<OmitFunctions<this>>): this {
    // 1 - Create a copy of the updateFields object to avoid overwrite the argument object.
    let updateObject = cloneDeep(updateFields);

    // 2 - Remove the undefined fields of the update object.
    updateObject = removeUndefinedProperties(updateObject);

    Object.assign(this, updateObject);
    return this;
  }

  /**
   * Validates the integrity of the current entity.
   * This method will be executed before save or update the entity.
   *
   * @memberof AppEntity
   * @throws error If the entity is not valid.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
