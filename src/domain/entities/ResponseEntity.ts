/**
 * Interface representing metadata.
 * @property {string} code - Status code of the response
 * @property {string} message - Message associated with the response
 */
interface IMeta {
  code: string;
  message: string;
}

/**
 * Interface representing metadata with pagination details.
 * Extends the basic IMeta interface.
 * @property {Object} pagination - Pagination details
 * @property {number} pagination.page - Current page number
 * @property {number} pagination.total - Total number of items
 * @property {number} pagination.limit - Number of items per page
 */
interface IMetaPagination extends IMeta {
  pagination: {
    page: number;
    total: number;
    limit: number;
  };
}

/**
 * Interface representing a response entity.
 * @template T - Type of the data in the response
 * @property {IMeta} meta - Metadata of the response
 * @property {T} data - Data of the response
 */
export interface IResponseEntity<T> {
  meta: IMeta;
  data: T;
}

/**
 * Interface representing a paginated response entity.
 * @template T - Type of the data in the response
 * @property {IMetaPagination} meta - Metadata with pagination details
 * @property {T} data - Data of the response
 */
export interface IResponsePaginationEntity<T> {
  meta: IMetaPagination;
  data: T[];
}

export interface IGet {
  token: string;
}

export interface IPost {
  token: string;
  data: any;
}
