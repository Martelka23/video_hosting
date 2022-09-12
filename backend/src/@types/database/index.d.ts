type DbColumn = string | number | boolean | Date;
type DbObject = {[index: string]: DbColumn};

export { DbColumn, DbObject };