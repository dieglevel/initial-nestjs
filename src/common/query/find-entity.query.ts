import {
  Repository,
  FindOptionsWhere,
  FindOptionsSelect,
  FindOptionsOrder,
  ObjectLiteral,
} from "typeorm";

export interface FindEntitiesOptions<T> {
  where: FindOptionsWhere<T>;
  select?: FindOptionsSelect<T>;
  relations?: string[];
  order?: { [P in keyof T]?: "ASC" | "DESC" };
  take?: number;
  skip?: number;
}

export function findEntities<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: FindEntitiesOptions<T>,
): Promise<T[]> {
  const { where, select, relations, order, take, skip } = options;

  return repository.find({
    where: { ...where, isDeleted: false },
    select,
    relations,
    order: order as FindOptionsOrder<T>,
    take,
    skip,
    cache: true,
  });
}
