import camelcaseKeys from 'camelcase-keys';
import { DbObject } from '../@types/database';

class SqlGenerator {
  camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  camelcaseKeys(object: {}[] | {}): {}[] | {} {
    return camelcaseKeys(object);
  }

  quotesCheck(variable: any) {
    let result = variable;
    const type = typeof variable;

    if (type === 'string') {
      result = `'${variable}'`;
    }

    return result;
  }

  objectToString(object: DbObject, joinSubString: string): string {
    const keys = Object.keys(object);
    let list = [];
    for (let key of keys) {
      list.push(`${this.camelToSnakeCase(key)} = ${this.quotesCheck(object[key])}`);
    }
    const string = list.join(joinSubString);

    return string;
  }

  getConditionString(conditionObject: {} = {}): string {
    let conditionsString = '';
    if (Object.keys(conditionObject).length !== 0) {
      conditionsString = 'WHERE ' + this.objectToString(conditionObject, ' AND ');
    }

    return conditionsString;
  }

  getSetString(object: {}): string {
    return this.objectToString(object, ', ');
  }

  getInsertString(values: DbObject): string {
    const keys = Object.keys(values).map(key => this.camelToSnakeCase(key));
    const newValues = Object.values(values).map(value => this.quotesCheck(value));

    const result = `(${keys.join(', ')}) VALUES (${newValues.join(', ')})`;

    return result;
  }
}

const sqlGenerator = new SqlGenerator();

export default sqlGenerator;