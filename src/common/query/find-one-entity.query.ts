import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { FindEntitiesOptions } from "./find-entity.query";
import { IBaseEntity } from "@/entities/interface/base.entity.interface";

export function FindOneEntity<T extends IBaseEntity>(
  repo: Repository<T>,
  options: FindEntitiesOptions<T>,
): Promise<T | null> {
  const { where, select, relations } = options;
  const conditions = { ...where, isDeleted: false };
  return repo.findOne({
    where: conditions,
    select,
    relations,
  });
}

export function FindOneDeleted<T extends IBaseEntity>(
  repo: Repository<T>,
  options: FindOneOptions<T>,
): Promise<T | null> {
  const { where, select, relations } = options;

  let conditions: FindOptionsWhere<T> | FindOptionsWhere<T>[] | undefined;
  if (Array.isArray(where)) {
    // Add isDeleted: true to each condition in the array
    conditions = where.map((w) => ({
      ...w,
      isDeleted: true,
    })) as FindOptionsWhere<T>[];
  } else if (where) {
    // Add isDeleted: true to the object
    conditions = { ...where, isDeleted: true } as FindOptionsWhere<T>;
  } else {
    // Only isDeleted: true if where is undefined
    conditions = { isDeleted: true } as FindOptionsWhere<T>;
  }

  return repo.findOne({
    where: conditions,
    select,
    relations,
  });
}
