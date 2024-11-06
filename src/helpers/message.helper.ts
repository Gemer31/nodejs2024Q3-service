export class MessageHelper {
  static deleteSuccessfully = (entityName: string): string => {
    return `${entityName} deleted successfully`;
  };

  static entityNotFound = (entityName: string, id: string): string => {
    return `${entityName} with id=${id} is not found`;
  };
}
