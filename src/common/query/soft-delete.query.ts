import { ObjectLiteral, Repository, UpdateResult } from "typeorm";
import { IKeyAndValue } from "../base/interfaces";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface SoftDeleteOptions<T> {
  keyAndValue: IKeyAndValue<T>;
  additionalConditions?: Partial<T>;
}

export async function executeSoftDelete<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: SoftDeleteOptions<T>,
): Promise<UpdateResult> {
  const { keyAndValue, additionalConditions = {} } = options;

  const whereStatement = `${keyAndValue.key as string} = :${keyAndValue.key as string}`;

  let query = repository
    .createQueryBuilder()
    .update()
    .set({ isDeleted: true } as unknown as QueryDeepPartialEntity<T>)
    .where(`${whereStatement}`, { [keyAndValue.key]: keyAndValue.value })
    .andWhere("isDeleted = :isDeleted", { isDeleted: 0 });
  Object.entries(additionalConditions).forEach(([key, value]) => {
    query = query.andWhere(`${key} = :${key}`, { [key]: value });
  });

  return query.execute();
}
