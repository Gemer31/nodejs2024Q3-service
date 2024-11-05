export class MessageHelper {
  static deleteSuccessfully = (entityName: string): string => {
    return `${entityName} deleted successfully`;
  };

  static notFound = (entityName: string, id: string): string => {
    return `${entityName} with id=${id} is not found`;
  };
}
